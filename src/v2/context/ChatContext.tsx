import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import type { ChatMessage, ChatPerson, SupportRoom } from "../models";
import { connectChatSocket, errorMessage, fetchChatMessages, fetchSupportRoom, markChatRead, sendChatMessage } from "../services";

type ChatApi = {
  room: SupportRoom | null;
  items: ChatMessage[];
  hasMore: boolean;
  loading: boolean;
  loadingOlder: boolean;
  connected: boolean;
  unread: number;
  supportTyping: boolean;
  // Tell the provider whether the chat screen is on screen, so new messages count as read.
  setViewing: (viewing: boolean) => void;
  loadOlder: () => Promise<void>;
  send: (text: string) => void;
  retry: (tempId: string) => void;
  setTyping: (isTyping: boolean) => void;
};

const ChatContext = createContext<ChatApi | null>(null);
const idOf = (p: ChatPerson | string | undefined) => (typeof p === "string" ? p : p?.id || "");

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const { showError } = useToast();
  const [room, setRoom] = useState<SupportRoom | null>(null);
  const [items, setItems] = useState<ChatMessage[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [connected, setConnected] = useState(false);
  const [unread, setUnread] = useState(0);
  const [supportTyping, setSupportTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const roomRef = useRef<SupportRoom | null>(null);
  const itemsRef = useRef<ChatMessage[]>([]);
  const viewingRef = useRef(false);
  const typingTimer = useRef<number | null>(null);
  const meId = user?.id || "";
  roomRef.current = room;
  itemsRef.current = items;

  const markRead = useCallback(() => {
    const current = roomRef.current;
    if (!current) return;
    setUnread(0);
    const socket = socketRef.current;
    if (socket?.connected) socket.emit("message:read", { room: current.id });
    else void markChatRead(current.id).catch(() => undefined);
  }, []);

  const loadLatest = useCallback(async (roomId: string) => {
    try {
      const res = await fetchChatMessages(roomId);
      const page = res.data.payload || [];
      const total = res.data.metadata?.total ?? page.length;
      setItems(page);
      setHasMore(total > page.length);
    } catch (err) {
      showError(errorMessage(err, "We couldn't load your messages."));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOlder = useCallback(async () => {
    const current = roomRef.current;
    const first = itemsRef.current.find((m) => !m.pending);
    if (!current || !first || loadingOlder) return;
    setLoadingOlder(true);
    try {
      const res = await fetchChatMessages(current.id, first.id);
      const older = res.data.payload || [];
      const total = res.data.metadata?.total ?? older.length;
      setItems((existing) => {
        const known = new Set(existing.map((m) => m.id));
        return [...older.filter((m) => !known.has(m.id)), ...existing];
      });
      setHasMore(total > older.length);
    } catch (err) {
      showError(errorMessage(err, "We couldn't load earlier messages."));
    } finally {
      setLoadingOlder(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingOlder]);

  const sendNow = useCallback((text: string, tempId: string) => {
    const current = roomRef.current;
    if (!current) return;
    const settle = (saved: ChatMessage | null) =>
      setItems((list) => {
        if (!saved) return list.map((m) => (m.tempId === tempId ? { ...m, pending: false, failed: true } : m));
        return list.some((m) => m.id === saved.id)
          ? list.filter((m) => m.tempId !== tempId)
          : list.map((m) => (m.tempId === tempId ? { ...saved } : m));
      });
    const socket = socketRef.current;
    if (socket?.connected) {
      socket.timeout(10000).emit("message:send", { room: current.id, message: text }, (err: Error | null, ack?: { ok: boolean; message?: ChatMessage; error?: string }) => {
        if (err || !ack?.ok) {
          if (ack?.error) showError(ack.error);
          settle(null);
        } else settle(ack.message || null);
      });
    } else {
      sendChatMessage({ room: current.id, message: text })
        .then((res) => settle(res.data.payload))
        .catch((e) => {
          showError(errorMessage(e, "We couldn't send your message."));
          settle(null);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = useCallback((text: string) => {
    const body = text.trim();
    const current = roomRef.current;
    if (!body || !current || !user) return;
    const tempId = `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setItems((list) => [
      ...list,
      {
        id: tempId, tempId, pending: true, room: current.id, message: body, readBy: [user.id],
        sender: { id: user.id, firstName: user.firstName, lastName: user.lastName, userType: user.userType },
        createdAt: new Date().toISOString(),
      },
    ]);
    sendNow(body, tempId);
  }, [user, sendNow]);

  const retry = useCallback((tempId: string) => {
    const failed = itemsRef.current.find((m) => m.tempId === tempId);
    if (!failed) return;
    setItems((list) => list.map((m) => (m.tempId === tempId ? { ...m, failed: false, pending: true } : m)));
    sendNow(failed.message, tempId);
  }, [sendNow]);

  const setTyping = useCallback((isTyping: boolean) => {
    const current = roomRef.current;
    const socket = socketRef.current;
    if (current && socket?.connected) socket.emit("typing", { room: current.id, isTyping });
  }, []);

  const setViewing = useCallback((viewing: boolean) => {
    viewingRef.current = viewing;
    if (viewing && document.visibilityState === "visible") markRead();
  }, [markRead]);

  // Find (or create) the customer's support room, load its newest messages, then connect the socket.
  useEffect(() => {
    if (!meId) return;
    let active = true;
    fetchSupportRoom()
      .then((res) => {
        if (!active) return;
        const support = res.data.payload;
        setRoom(support);
        setUnread(support.unread || 0);
        roomRef.current = support;
        void loadLatest(support.id);
      })
      .catch((err) => {
        if (!active) return;
        setLoading(false);
        showError(errorMessage(err, "We couldn't open your support chat."));
      });

    const socket = connectChatSocket();
    socketRef.current = socket;
    socket.on("connect", () => {
      setConnected(true);
      if (roomRef.current) void loadLatest(roomRef.current.id); // catch up on anything missed while offline
    });
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", (err) => {
      setConnected(false);
      if (err.message === "AUTH_REJECTED" || err.message === "AUTH_REQUIRED") {
        showError("Your session has ended. Please sign in again.");
        signOut();
      }
    });
    socket.on("auth:expired", () => {
      showError("Your session has expired. Please sign in again.");
      signOut();
    });
    socket.on("message:new", (msg: ChatMessage) => {
      if (roomRef.current && msg.room !== roomRef.current.id) return;
      setItems((list) => (list.some((m) => m.id === msg.id) ? list : [...list, msg]));
      if (idOf(msg.sender) === meId) return;
      setSupportTyping(false);
      if (viewingRef.current && document.visibilityState === "visible") markRead();
      else setUnread((n) => n + 1);
    });
    socket.on("message:read", ({ room: roomId, reader }: { room: string; reader: string }) => {
      if (roomRef.current && roomId !== roomRef.current.id) return;
      setItems((list) => list.map((m) => (m.readBy?.includes(reader) ? m : { ...m, readBy: [...(m.readBy || []), reader] })));
    });
    socket.on("typing", ({ room: roomId, isTyping }: { room: string; isTyping: boolean }) => {
      if (roomRef.current && roomId !== roomRef.current.id) return;
      setSupportTyping(isTyping);
      if (typingTimer.current) window.clearTimeout(typingTimer.current);
      if (isTyping) typingTimer.current = window.setTimeout(() => setSupportTyping(false), 4000);
    });

    const onVisible = () => {
      if (document.visibilityState === "visible" && viewingRef.current) markRead();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", onVisible);
      if (typingTimer.current) window.clearTimeout(typingTimer.current);
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meId]);

  const value = useMemo<ChatApi>(
    () => ({ room, items, hasMore, loading, loadingOlder, connected, unread, supportTyping, setViewing, loadOlder, send, retry, setTyping }),
    [room, items, hasMore, loading, loadingOlder, connected, unread, supportTyping, setViewing, loadOlder, send, retry, setTyping],
  );
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatApi {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}

import http, { url } from "./http";
import type { ApiResponse, ChatMessage, SupportRoom } from "../models";

export const CHAT_PAGE_SIZE = 30;

// The signed-in customer's own conversation with support (created on first use).
export const fetchSupportRoom = () => http.get<ApiResponse<SupportRoom>>(`${url}/chat-rooms/support`);

// Oldest-first page of the newest messages; pass `before` (a message id) for older history.
// metadata.total is the number of messages up to that point, so total > payload.length means more history exists.
export const fetchChatMessages = (roomId: string, before?: string) =>
  http.get<ApiResponse<ChatMessage[]>>(
    `${url}/chat-messages/?room=${encodeURIComponent(roomId)}&limit=${CHAT_PAGE_SIZE}${before ? `&before=${encodeURIComponent(before)}` : ""}`,
  );

// REST fallbacks, used only while the socket is disconnected.
export const sendChatMessage = (data: { room: string; message: string }) =>
  http.post<ApiResponse<ChatMessage>>(`${url}/send-message`, data);
export const markChatRead = (room: string) => http.post<ApiResponse>(`${url}/chat-messages/read`, { room });

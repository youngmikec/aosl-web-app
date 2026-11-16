import { FormEvent, KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useChat } from "../../context/ChatContext"
import { Icon, PageHeader } from "./ui"

const timeOf = (iso?: string) => (iso ? new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "")
const dayOf = (iso: string) => {
  const d = new Date(iso)
  if (d.toDateString() === new Date().toDateString()) return "Today"
  if (d.toDateString() === new Date(Date.now() - 86_400_000).toDateString()) return "Yesterday"
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}
const senderId = (s: unknown) => (typeof s === "string" ? s : (s as { id?: string })?.id || "")
const senderName = (s: unknown) => {
  const p = s && typeof s === "object" ? (s as { firstName?: string; lastName?: string }) : null
  return p ? `${p.firstName || ""} ${p.lastName || ""}`.trim() : ""
}

export default function SupportChat() {
  const { user } = useAuth()
  const chat = useChat()
  const meId = user?.id || ""
  const scroller = useRef<HTMLDivElement>(null)
  const anchor = useRef<{ height: number } | null>(null)
  const stickBottom = useRef(true)
  const typingTimer = useRef<number | null>(null)
  const [draft, setDraft] = useState("")

  // While this screen is open, incoming messages count as read.
  useEffect(() => {
    chat.setViewing(true)
    return () => chat.setViewing(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the viewport steady when older messages are added above; otherwise follow the newest message.
  useLayoutEffect(() => {
    const el = scroller.current
    if (!el) return
    if (anchor.current) {
      el.scrollTop += el.scrollHeight - anchor.current.height
      anchor.current = null
    } else if (stickBottom.current) {
      el.scrollTop = el.scrollHeight
    }
  }, [chat.items.length, chat.loading, chat.supportTyping])

  function loadOlder() {
    if (scroller.current) anchor.current = { height: scroller.current.scrollHeight }
    stickBottom.current = false
    void chat.loadOlder()
  }

  function onScroll() {
    const el = scroller.current
    if (!el) return
    stickBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80
    if (el.scrollTop < 60 && chat.hasMore && !chat.loadingOlder) loadOlder()
  }

  function submit(event?: FormEvent) {
    event?.preventDefault()
    if (!draft.trim()) return
    stickBottom.current = true
    chat.send(draft)
    setDraft("")
    chat.setTyping(false)
  }

  function onChange(value: string) {
    setDraft(value)
    chat.setTyping(true)
    if (typingTimer.current) window.clearTimeout(typingTimer.current)
    typingTimer.current = window.setTimeout(() => chat.setTyping(false), 2000)
  }

  function onKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  useEffect(() => () => { if (typingTimer.current) window.clearTimeout(typingTimer.current) }, [])

  return (
    <div className="dashboard-fade">
      <PageHeader
        eyebrow="Messages"
        title="Support chat"
        description="Message the AOSL team about your applications, orders or services."
      />
      <div className="flex h-[calc(100vh-290px)] min-h-[460px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/5">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0D0D5B] text-white">
              <Icon name="chat" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-slate-900">AOSL Support</p>
              <p className="text-xs text-slate-400">
                {chat.supportTyping ? "Typing…" : "Care, transport and training team"}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
              chat.connected ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${chat.connected ? "bg-emerald-500" : "bg-amber-500"}`} />
            {chat.connected ? "Connected" : "Reconnecting…"}
          </span>
        </div>

        <div ref={scroller} onScroll={onScroll} className="flex-1 space-y-3 overflow-y-auto bg-slate-50/60 px-5 py-5">
          {chat.hasMore && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={loadOlder}
                disabled={chat.loadingOlder}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-50 disabled:opacity-60"
              >
                {chat.loadingOlder ? "Loading…" : "Load earlier messages"}
              </button>
            </div>
          )}
          {chat.loading && <p className="text-center text-sm text-slate-400">Loading your messages…</p>}
          {!chat.loading && chat.items.length === 0 && (
            <div className="mx-auto mt-10 max-w-sm text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Icon name="chat" className="h-7 w-7" />
              </span>
              <p className="mt-4 font-bold text-slate-900">Start a conversation</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Send us a message and our team will reply here. You'll see their answer as soon as it arrives.
              </p>
            </div>
          )}
          {chat.items.map((m, i) => {
            const mine = senderId(m.sender) === meId
            const prev = chat.items[i - 1]
            const newDay = !prev || dayOf(prev.createdAt) !== dayOf(m.createdAt)
            const seen = (m.readBy || []).some((id) => id !== meId)
            return (
              <div key={m.id}>
                {newDay && <p className="my-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">{dayOf(m.createdAt)}</p>}
                <div className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                  {!mine && (!prev || senderId(prev.sender) !== senderId(m.sender) || newDay) && (
                    <span className="mb-1 text-[11px] font-semibold text-slate-400">{senderName(m.sender) || "AOSL Support"} · AOSL Support</span>
                  )}
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-md ${
                      mine ? "rounded-tr-sm bg-blue-600 text-white" : "rounded-tl-sm border border-slate-200 bg-white text-slate-700"
                    } ${m.pending ? "opacity-70" : ""} ${m.failed ? "ring-2 ring-red-300" : ""}`}
                  >
                    {m.message}
                  </div>
                  <span className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                    {timeOf(m.createdAt)}
                    {mine && !m.failed && !m.pending && <span className={seen ? "font-semibold text-blue-600" : ""}>{seen ? "Seen" : "Sent"}</span>}
                    {m.pending && "Sending…"}
                    {m.failed && (
                      <button type="button" onClick={() => m.tempId && chat.retry(m.tempId)} className="font-bold text-red-600 hover:text-red-800">
                        Failed · Retry
                      </button>
                    )}
                  </span>
                </div>
              </div>
            )
          })}
          {chat.supportTyping && <p className="text-xs italic text-slate-400">AOSL Support is typing…</p>}
        </div>

        <form onSubmit={submit} className="flex items-end gap-3 border-t border-slate-100 bg-white p-4">
          <textarea
            value={draft}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKey}
            rows={1}
            maxLength={2000}
            placeholder="Write a message…"
            className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
          >
            <Icon name="arrow" className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  )
}

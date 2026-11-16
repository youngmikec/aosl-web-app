import { FormEvent, useState } from "react";
import { CORAL, MUTED, NAVY, OFF_WHITE, TEXT } from "../../theme/tokens";
import { errorMessage, subscribeToNewsletter } from "../../services";

export default function Newsletter({
  heading = "Stay informed",
  blurb = "Updates on care news, new services, and training opportunities — direct to your inbox.",
}: {
  heading?: string;
  blurb?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "ok" | "error"; msg?: string }>({ kind: "idle" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus({ kind: "loading" });
    try {
      await subscribeToNewsletter({ subscriberEmail: email.trim() });
      setEmail("");
      setStatus({ kind: "ok", msg: "Thanks for subscribing!" });
    } catch (err) {
      setStatus({ kind: "error", msg: errorMessage(err) });
    }
  }

  return (
    <section style={{ background: OFF_WHITE, paddingTop: 72, paddingBottom: 72 }}>
      <div className="mx-auto px-6 text-center" style={{ maxWidth: 560 }}>
        <h2 className="font-bold mb-3" style={{ fontSize: 24, color: NAVY }}>{heading}</h2>
        <p className="text-sm mb-8" style={{ color: MUTED }}>{blurb}</p>
        <form className="flex gap-3" onSubmit={onSubmit}>
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white border outline-none text-sm px-4 py-3"
            style={{ borderRadius: 12, borderColor: "#E2E0DC", color: TEXT }}
          />
          <button
            type="submit"
            disabled={status.kind === "loading"}
            className="font-semibold text-sm text-white px-6 py-3 shrink-0 transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: CORAL, borderRadius: 12 }}
          >
            {status.kind === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {status.msg && (
          <p role="status" className="text-sm mt-4" style={{ color: status.kind === "ok" ? "#2BA5AE" : CORAL }}>
            {status.msg}
          </p>
        )}
      </div>
    </section>
  );
}

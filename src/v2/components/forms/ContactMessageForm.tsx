import { FormEvent, useState } from "react";
import { CORAL, NAVY, TEXT } from "../../theme/tokens";
import { errorMessage, sendContactMessage } from "../../services";

const EMPTY = { fullName: "", email: "", phone: "", subject: "", message: "" };
type Field = keyof typeof EMPTY;

const inputStyle = { borderRadius: 10, borderColor: "#E2E0DC", color: TEXT };
const inputClass = "w-full border outline-none text-sm px-4 py-3";

export default function ContactMessageForm() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "ok" | "error"; msg?: string }>({ kind: "idle" });

  const set = (field: Field) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: "loading" });
    try {
      await sendContactMessage(values);
      setValues(EMPTY);
      setStatus({ kind: "ok", msg: "Thank you — your message has been sent. We'll be in touch soon." });
    } catch (err) {
      setStatus({ kind: "error", msg: errorMessage(err) });
    }
  }

  const label = (text: string) => (
    <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>{text}</label>
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          {label("Full Name")}
          <input required type="text" placeholder="Full Name" value={values.fullName} onChange={set("fullName")} className={inputClass} style={inputStyle} />
        </div>
        <div>
          {label("Email Address")}
          <input required type="email" placeholder="Email Address" value={values.email} onChange={set("email")} className={inputClass} style={inputStyle} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          {label("Phone Number")}
          <input required type="tel" maxLength={11} placeholder="Phone Number" value={values.phone} onChange={set("phone")} className={inputClass} style={inputStyle} />
        </div>
        <div>
          {label("Subject")}
          <input required type="text" placeholder="Subject" value={values.subject} onChange={set("subject")} className={inputClass} style={inputStyle} />
        </div>
      </div>
      <div>
        {label("Message")}
        <textarea required maxLength={5000} placeholder="Tell us how we can help..." rows={5} value={values.message} onChange={set("message")} className={`${inputClass} resize-none`} style={inputStyle} />
      </div>
      <button
        type="submit"
        disabled={status.kind === "loading"}
        className="font-semibold text-white py-3.5 text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: CORAL, borderRadius: 12 }}
      >
        {status.kind === "loading" ? "Sending…" : "Send Message"}
      </button>
      {status.msg && (
        <p role="status" className="text-sm" style={{ color: status.kind === "ok" ? "#2BA5AE" : CORAL }}>
          {status.msg}
        </p>
      )}
    </form>
  );
}

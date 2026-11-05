import { FormEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { CORAL, MUTED, NAVY, OFF_WHITE, TEAL, TEXT } from "../../theme/tokens";
import Newsletter from "../../components/layout/Newsletter";
import SocialLinks from "../../components/layout/SocialLinks";
import { errorMessage, sendContactMessage } from "../../services";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "../../constants/contact";

const CHARCOAL = "#3A3A5A";

/* ─── PAGE HERO STRIP ─────────────────────────────────────────── */
function PageHero() {
  return (
    <section style={{ background: NAVY, paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="flex flex-col items-start gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            <span>Home</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: TEAL }}>Contact Us</span>
          </div>

          <h1 className="font-bold text-white" style={{ fontSize: 52, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 600 }}>
            Let's talk. We're here to help.
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", maxWidth: 520, lineHeight: 1.6 }}>
            Whether you need care, transportation, training, or simply have a question — our team is ready to listen and guide you to the right solution.
          </p>

          {/* Quick-stat row */}
          <div className="flex flex-wrap gap-8 mt-6">
            {[
              { value: "24/7", label: "Emergency line" },
              { value: "< 2 hrs", label: "Average response time" },
              { value: "4.9 ★", label: "Client satisfaction" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-bold text-white" style={{ fontSize: 22 }}>{s.value}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT CHANNELS ────────────────────────────────────────── */
function ContactChannels() {
  const channels = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 3h4l2 5-2.5 2C7.8 13.2 9.5 15 13 16.5l2-2.5 5 2V19a1 1 0 0 1-1 1C7 20 2 13 2 6a1 1 0 0 1 1-1z" stroke={TEAL} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      ),
      title: "Phone",
      primary: PHONE_DISPLAY,
      secondary: "Mon–Fri 8am–7pm · Sat 9am–4pm",
      cta: "Call now",
      href: PHONE_HREF,
      bg: "#E8F7F8",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="4" width="18" height="14" rx="2" stroke={CORAL} strokeWidth="1.7" />
          <path d="M2 7l9 6 9-6" stroke={CORAL} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ),
      title: "Email",
      primary: "info@aosl-online.com",
      secondary: "Our team is on hand to help",
      cta: "Send email",
      href: "mailto:info@aosl-online.com",
      bg: "#FFF0ED",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2C7.686 2 5 4.686 5 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" stroke={NAVY} strokeWidth="1.7" />
          <circle cx="11" cy="8" r="2.5" stroke={NAVY} strokeWidth="1.7" />
        </svg>
      ),
      title: "Visit Us",
      primary: "London · Birmingham · Manchester",
      secondary: "By appointment · Mon–Fri only",
      cta: "Get directions",
      href: "#offices",
      bg: "#EEEEF8",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2C6.029 2 2 6.029 2 11c0 1.59.4 3.086 1.105 4.391L2 20l4.732-1.078A8.952 8.952 0 0 0 11 20c4.971 0 9-4.029 9-9s-4.029-9-9-9z" stroke="#25D366" strokeWidth="1.7" />
          <path d="M8 10.5s.5 1 1.5 2 2 1.5 2 1.5l1.5-1 2 1-.5 1.5a8 8 0 0 1-7-7l1.5-.5 1 2-1 1.5z" fill="#25D366" />
        </svg>
      ),
      title: "WhatsApp",
      primary: PHONE_DISPLAY,
      secondary: "Quick replies · Evenings & weekends",
      cta: "Message us",
      href: WHATSAPP_HREF,
      bg: "#E8F7EE",
    },
  ];

  return (
    <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 0 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest block mb-4" style={{ color: TEAL }}>Get in Touch</span>
          <h2 className="font-bold" style={{ fontSize: 36, color: NAVY }}>Choose how you'd like to reach us</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-4 p-6 transition-shadow hover:shadow-md"
              style={{ borderRadius: 16, border: "1.5px solid #EBEBF5", background: "white" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.bg }}>
                {c.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: MUTED }}>{c.title}</p>
                <p className="font-semibold mb-1" style={{ fontSize: 15, color: NAVY }}>{c.primary}</p>
                <p className="text-xs" style={{ color: MUTED }}>{c.secondary}</p>
              </div>
              <a
                href={c.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: CORAL }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.75")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
              >
                {c.cta}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke={CORAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FORM + INFO ─────────────────────────────────────────────── */
const SUBJECTS = [
  "Personal Assistant Enquiry",
  "Transportation Booking",
  "Training & Courses",
  "Job / Career Enquiry",
  "Complaint or Feedback",
  "Partnership / Referral",
  "Other",
];

// The API accepts at most 11 characters for phone, so normalise "+44 7700 900123" to "07700900123".
function toApiPhone(raw: string): string {
  const compact = raw.replace(/[\s()-]/g, "");
  return compact.startsWith("+44") ? `0${compact.slice(3)}` : compact;
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function set(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await sendContactMessage({
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: toApiPhone(form.phone),
        subject: form.subject,
        message: form.message.trim(),
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setSent(true);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* ── LEFT: info card (2 cols) ── */}
          <div
            className="lg:col-span-2 flex flex-col gap-6"
            style={{ position: "sticky", top: 100 }}
          >
            {/* Navy card */}
            <div className="p-8 flex flex-col gap-6" style={{ background: NAVY, borderRadius: 20 }}>
              <div>
                <p className="font-bold text-white text-lg mb-1">AOSL Head Office</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  All Occupation Service Ltd
                </p>
              </div>

              {[
                {
                  label: "Phone",
                  value: PHONE_DISPLAY,
                  sub: "Emergency: 24/7",
                  color: TEAL,
                },
                {
                  label: "Email",
                  value: "info@aosl-online.com",
                  sub: "Our team is on hand to help",
                  color: TEAL,
                },
                {
                  label: "Address",
                  value: "12 Care Lane, London, EC1A 2BN",
                  sub: "By appointment only",
                  color: TEAL,
                },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-0.5">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{row.label}</p>
                  <p className="text-sm font-semibold text-white">{row.value}</p>
                  <p className="text-xs" style={{ color: row.color }}>{row.sub}</p>
                </div>
              ))}
            </div>

            {/* Hours card */}
            <div className="p-6" style={{ background: OFF_WHITE, borderRadius: 16 }}>
              <p className="font-bold mb-4" style={{ color: NAVY, fontSize: 15 }}>Office Hours</p>
              {[
                { day: "Monday – Friday", hours: "8:00 am – 7:00 pm" },
                { day: "Saturday", hours: "9:00 am – 4:00 pm" },
                { day: "Sunday", hours: "Closed" },
              ].map((r) => (
                <div key={r.day} className="flex justify-between items-center py-2.5" style={{ borderBottom: "1px solid #E8E6E2" }}>
                  <span className="text-sm" style={{ color: CHARCOAL }}>{r.day}</span>
                  <span className="text-sm font-semibold" style={{ color: r.hours === "Closed" ? MUTED : NAVY }}>{r.hours}</span>
                </div>
              ))}
              <div className="mt-4 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
                <p className="text-xs font-medium" style={{ color: CHARCOAL }}>24/7 emergency line always available</p>
              </div>
            </div>

            {/* Social row */}
            <SocialLinks variant="brand" />
          </div>

          {/* ── RIGHT: form (3 cols) ── */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: TEAL }}>Send a Message</span>
              <h2 className="font-bold" style={{ fontSize: 30, color: NAVY }}>We'd love to hear from you</h2>
            </div>

            {sent ? (
              <div
                className="flex flex-col items-center justify-center text-center py-20 px-10"
                style={{ background: "#F0FBF4", borderRadius: 16, border: "1.5px solid #BBF7D0" }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "#22C55E" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-bold mb-2" style={{ fontSize: 20, color: NAVY }}>Message sent!</p>
                <p className="text-sm" style={{ color: MUTED }}>Thanks for reaching out. A member of our team will be in touch shortly.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold underline"
                  style={{ color: CORAL }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" required>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      required
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3 transition-colors focus:border-teal-400"
                      style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }}
                    />
                  </Field>
                  <Field label="Email Address" required>
                    <input
                      type="email"
                      placeholder="jane@email.com"
                      required
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3"
                      style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }}
                    />
                  </Field>
                </div>

                {/* Phone + Subject */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone Number" required>
                    <input
                      type="tel"
                      required
                      placeholder="+44 7700 000 000"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3"
                      style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }}
                    />
                  </Field>
                  <Field label="Subject" required>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => set("subject", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3 appearance-none bg-white"
                      style={{ borderRadius: 10, borderColor: "#DDD9D4", color: form.subject ? TEXT : MUTED }}
                    >
                      <option value="" disabled>Select a subject…</option>
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Message */}
                <Field label="Your Message" required>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tell us how we can help — the more detail, the better we can support you."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="w-full border outline-none text-sm px-4 py-3 resize-none"
                    style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }}
                  />
                </Field>

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-navy shrink-0" />
                  <span className="text-xs leading-relaxed" style={{ color: MUTED }}>
                    I agree to AOSL's{" "}
                    <span className="underline" style={{ color: CORAL }}>Privacy Policy</span>
                    {" "}and consent to being contacted regarding my enquiry.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2.5 font-semibold text-sm text-white py-4 px-8 transition-opacity hover:opacity-90 disabled:opacity-60 self-start"
                  style={{ background: CORAL, borderRadius: 12 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2l12 6-12 6V9l8-1-8-1V2z" fill="white" />
                  </svg>
                  {sending ? "Sending…" : "Send Message"}
                </button>
                {error && (
                  <p role="alert" className="text-sm" style={{ color: CORAL }}>{error}</p>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: NAVY }}>
        {label}{required && <span style={{ color: CORAL }}> *</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── OFFICES ─────────────────────────────────────────────────── */
function Offices() {
  const offices = [
    {
      city: "London",
      address: "12 Care Lane, Clerkenwell, EC1A 2BN",
      phone: "020 7000 1234",
      img: "photo-1513635269975-59663e0ac1ad?w=480&h=280&fit=crop&auto=format",
      alt: "London city view",
      badge: "Head Office",
    },
    {
      city: "Birmingham",
      address: "44 Broad Street, B1 2HF",
      phone: "0121 000 5678",
      img: "photo-1520206183501-b80df61043c2?w=480&h=280&fit=crop&auto=format",
      alt: "Birmingham city view",
      badge: "Midlands Hub",
    },
    {
      city: "Manchester",
      address: "7 Deansgate, M3 2AN",
      phone: "0161 000 9012",
      img: "photo-1543872084-c7bd3822856f?w=480&h=280&fit=crop&auto=format",
      alt: "Manchester city view",
      badge: "Northern Hub",
    },
  ];

  return (
    <section id="offices" style={{ background: OFF_WHITE, paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest block mb-4" style={{ color: TEAL }}>Our Locations</span>
          <h2 className="font-bold" style={{ fontSize: 36, color: NAVY }}>Find your nearest AOSL office</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offices.map((o) => (
            <div key={o.city} className="bg-white overflow-hidden flex flex-col" style={{ borderRadius: 16, boxShadow: "0 2px 20px rgba(13,13,91,0.07)" }}>
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ borderRadius: "16px 16px 0 0" }}>
                <img src={`https://images.unsplash.com/${o.img}`} alt={o.alt} className="w-full object-cover" style={{ height: 180 }} />
                <span
                  className="absolute top-3 left-3 text-xs font-semibold text-white px-3 py-1 rounded-full"
                  style={{ background: CORAL }}
                >
                  {o.badge}
                </span>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="font-bold text-lg" style={{ color: NAVY }}>{o.city}</p>
                <div className="flex items-start gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                    <path d="M7 1C4.791 1 3 2.791 3 5c0 3 4 8 4 8s4-5 4-8c0-2.209-1.791-4-4-4z" stroke={TEAL} strokeWidth="1.4" />
                    <circle cx="7" cy="5" r="1.5" stroke={TEAL} strokeWidth="1.4" />
                  </svg>
                  <p className="text-sm" style={{ color: CHARCOAL }}>{o.address}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2h3l1 3-1.5 1.5C5.5 8.7 5.5 8.5 8.5 10l1.5-1.5 3 1V12a.5.5 0 0 1-.5.5C5 12.5 1.5 9 1.5 3A.5.5 0 0 1 2 2z" stroke={TEAL} strokeWidth="1.4" />
                  </svg>
                  <p className="text-sm font-medium" style={{ color: NAVY }}>{o.phone}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${o.address}, ${o.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: CORAL }}
                >
                  Get directions
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke={CORAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ TEASER ──────────────────────────────────────────────── */
function FAQTeaser() {
  return (
    <section style={{ background: OFF_WHITE, paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div
          className="flex flex-wrap items-center justify-between gap-6 px-10 py-9"
          style={{ background: "white", borderRadius: 20, boxShadow: "0 2px 20px rgba(13,13,91,0.06)" }}
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#E8F7F8" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="8" stroke={TEAL} strokeWidth="1.7" />
                <path d="M11 7.5c-1.5 0-2.5 1-2.5 2s1 1.5 2.5 1.5v1.5" stroke={TEAL} strokeWidth="1.7" strokeLinecap="round" />
                <circle cx="11" cy="15" r="0.8" fill={TEAL} />
              </svg>
            </div>
            <div>
              <p className="font-bold mb-0.5" style={{ color: NAVY, fontSize: 16 }}>Have more questions?</p>
              <p className="text-sm" style={{ color: MUTED }}>Browse our full FAQ centre — organised by topic with search.</p>
            </div>
          </div>
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 font-semibold text-sm text-white rounded-full px-6 py-3 transition-opacity hover:opacity-90 shrink-0"
            style={{ background: CORAL }}
          >
            View all FAQs
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}


export default function ContactPage() {
  return (
    <>
      <PageHero />
      <ContactChannels />
      <ContactForm />
      <Offices />
      <FAQTeaser />
      <Newsletter />
    </>
  );
}

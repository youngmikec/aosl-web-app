import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CORAL, MUTED, NAVY, OFF_WHITE, TEAL } from "../../theme/tokens";
import Newsletter from "../../components/layout/Newsletter";
import AboutSection from "../../components/sections/AboutSection";
import ContactMessageForm from "../../components/forms/ContactMessageForm";
import readingLogo from "../../assets/councils/reading.jpeg";
import westBerkshireLogo from "../../assets/councils/west-berkshire.jpeg";
import wokinghamLogo from "../../assets/councils/wokingham.jpeg";
import { PHONE_DISPLAY } from "../../constants/contact";

type ServiceKey = "personal-assistant" | "transportation" | "training";
type ServiceEntry = { key: ServiceKey; title: string; desc: string; icon: React.ReactNode };

/* ─── HERO ────────────────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-8"
              style={{ background: "#FFF0ED", color: CORAL }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: CORAL }} />
              UK-Regulated Care Services
            </span>
            <h1
              className="font-bold leading-tight mb-6"
              style={{ fontSize: 56, color: NAVY, lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Care and Support services and Transportation Services.
            </h1>
            <p className="mb-10 leading-relaxed" style={{ fontSize: 18, color: "#4A4A6A", maxWidth: 460 }}>
              AOSL provides compassionate, professional care, transportation, and training services across the UK — tailored to every individual's needs.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => navigate("/services/personal-assistant")}
                className="inline-flex items-center gap-2 font-semibold text-white rounded-full px-7 py-3.5 transition-opacity hover:opacity-90"
                style={{ background: CORAL, fontSize: 15 }}
              >
                Explore services
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3.5 border-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: NAVY, color: NAVY, fontSize: 15 }}
              >
                Contact Us
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[CORAL, TEAL, NAVY, "#F7B28A"].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ background: c }}>
                    {"AOSL"[i]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: MUTED }}>
                <strong style={{ color: NAVY }}>Trusted professional service</strong>
                <br />
                Reliable support when you need it
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden" style={{ borderRadius: 24 }}>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=620&h=680&fit=crop&auto=format"
                alt="Care worker supporting a client with warmth and professionalism"
                className="w-full object-cover"
                style={{ height: 520 }}
              />
            </div>
            <div
              className="absolute bottom-8 -left-8 bg-white rounded-2xl px-5 py-4 flex items-center gap-3"
              style={{ boxShadow: "0 12px 40px rgba(13,13,91,0.14)", minWidth: 200 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#E8F7F8" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke={TEAL} strokeWidth="2" />
                  <path d="M10 6v4l3 2" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: NAVY }}>24/7 Support</p>
                <p className="text-xs" style={{ color: MUTED }}>Always here for you</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full ml-auto" style={{ background: TEAL }} />
            </div>
            <div
              className="absolute -top-4 -right-4 opacity-30"
              style={{
                backgroundImage: `radial-gradient(${NAVY} 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
                width: 80,
                height: 80,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUSTED BY ─────────────────────────────────────────────── */
const COUNCILS = [
  { name: "Reading Borough Council", logo: readingLogo },
  { name: "West Berkshire Council", logo: westBerkshireLogo },
  { name: "Wokingham Borough Council", logo: wokinghamLogo },
];

function TrustedBy() {
  return (
    <section className="bg-white py-14 border-y border-gray-100">
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <p className="text-center text-xs font-semibold uppercase tracking-widest mb-10" style={{ color: "#B0B0C8" }}>
          Trusted by local authorities across the UK
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {COUNCILS.map((c) => (
            <img key={c.name} src={c.logo} alt={c.name} title={c.name} className="object-contain" style={{ height: 64, width: "auto", maxWidth: 200 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES (HOME) ─────────────────────────────────────────── */
export function Services() {
  const navigate = useNavigate();
  const services: ServiceEntry[] = [
    {
      key: "personal-assistant",
      title: "Personal Assistant Services",
      desc: "Flexible part-time, full time and self-employed personal assistant support tailored to individual requirements.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="10" r="5" stroke={NAVY} strokeWidth="1.8" />
          <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 16.5l2 2 4-4" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: "transportation",
      title: "Transportation Services",
      desc: "Safe, dependable and timely transportation services helping clients reach various destinations comfortably.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="3" y="10" width="26" height="14" rx="4" stroke={NAVY} strokeWidth="1.8" />
          <path d="M3 14h26M9 24v3M23 24v3" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3 10l3-5h20l3 5" stroke={NAVY} strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="9" cy="20" r="1.5" fill={TEAL} />
          <circle cx="23" cy="20" r="1.5" fill={TEAL} />
        </svg>
      ),
    },
    {
      key: "training",
      title: "Training Services",
      desc: "Specialised health and social-care training, focused on practical knowledge, confidence and skill development.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 5L4 11l12 6 12-6-12-6z" stroke={NAVY} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M4 11v8M8 13v6c0 2.5 3.6 4 8 4s8-1.5 8-4v-6" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M28 11v6" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="28" cy="18.5" r="1.5" fill={TEAL} />
        </svg>
      ),
    },
  ];

  return (
    <section style={{ background: OFF_WHITE, paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: TEAL }}>What We Do</span>
          <h2 className="font-bold" style={{ fontSize: 36, color: NAVY }}>We provide reliable services for individuals and organisations.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.key} className="bg-white p-8 flex flex-col group transition-shadow hover:shadow-lg" style={{ borderRadius: 16, boxShadow: "0 2px 16px rgba(13,13,91,0.06)" }}>
              <div className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: OFF_WHITE }}>
                {s.icon}
              </div>
              <h3 className="font-bold mb-3" style={{ fontSize: 20, color: NAVY }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: MUTED }}>{s.desc}</p>
              <button
                onClick={() => navigate(`/services/${s.key}`)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: CORAL }}
              >
                Read More
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke={CORAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BANNER ──────────────────────────────────────────────────── */
export function Banner() {
  return (
    <section style={{ background: NAVY, paddingTop: 36, paddingBottom: 36 }}>
      <div className="mx-auto px-6 flex flex-wrap items-center justify-between gap-6" style={{ maxWidth: 1200 }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(232,99,74,0.2)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3h3l1.5 4L6 8.5c1.5 3 4.5 6 7.5 7.5l1.5-1.5 4 1.5V18a1.5 1.5 0 0 1-1.5 1.5C6.5 19.5-1.5 11.5-1.5 3A1.5 1.5 0 0 1 0 1.5H3z" fill={CORAL} />
            </svg>
          </div>
          <p className="font-semibold text-white">Speak to our team: <span style={{ color: CORAL }}>{PHONE_DISPLAY}</span></p>
        </div>
        <Link to="/contact-us" className="font-semibold text-sm text-white rounded-full px-6 py-2.5 transition-opacity hover:opacity-90" style={{ background: CORAL }}>
          Get in touch
        </Link>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Discovery", desc: "We listen to understand your situation, goals, and the level of support you're looking for." },
    { num: "02", title: "Consultation", desc: "Our specialists design a personalised care plan and match you with the ideal professional." },
    { num: "03", title: "Payment", desc: "Simple, transparent pricing with no hidden fees. We accept direct payments and local authority funding." },
    { num: "04", title: "Service Delivery", desc: "Your dedicated support begins — with regular reviews to ensure everything stays right for you." },
  ];
  return (
    <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: TEAL }}>The Process</span>
          <h2 className="font-bold" style={{ fontSize: 36, color: NAVY }}>How it works</h2>
        </div>
        <div className="relative grid md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px" style={{ borderTop: "2px dashed #D8D8E8", zIndex: 0 }} />
          {steps.map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 font-bold text-lg bg-white border-2" style={{ borderColor: TEAL, color: TEAL, boxShadow: "0 0 0 6px #F7F5F2" }}>
                {s.num}
              </div>
              <h3 className="font-bold mb-2" style={{ fontSize: 17, color: NAVY }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ACHIEVEMENTS ────────────────────────────────────────────── */
function Achievements() {
  const stats = [
    { value: "6,500+", label: "Clients Supported" },
    { value: "600+", label: "Professionals Placed" },
    { value: "250+", label: "Training Courses Run" },
    { value: "24/7", label: "Round-the-Clock Support" },
  ];
  return (
    <section style={{ background: NAVY, paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: TEAL }}>Our Impact</span>
          <h2 className="font-bold text-white" style={{ fontSize: 36 }}>Numbers that speak for themselves</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center text-center py-14 px-6" style={{ background: NAVY }}>
              <p className="font-bold mb-2" style={{ fontSize: 48, color: CORAL, lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</p>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: TEAL }}>Get in Touch</span>
          <h2 className="font-bold" style={{ fontSize: 36, color: NAVY }}>We'd love to hear from you</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="p-10 flex flex-col justify-between" style={{ background: NAVY, borderRadius: 20 }}>
            <div>
              <h3 className="font-bold text-white text-xl mb-2">AOSL — All Occupation Service Ltd</h3>
              <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>Reach us by phone, email, or visit one of our UK offices.</p>
              {[
                { label: "Phone", value: PHONE_DISPLAY },
                { label: "Email", value: "info@aosl-online.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 mb-6">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(43,165,174,0.15)" }}>
                    <div className="w-4 h-4 rounded" style={{ background: TEAL, opacity: 0.8 }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.07)" }}>
              <p className="text-sm font-semibold text-white mb-1">Office Hours</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Mon–Fri: 8am – 7pm | Sat: 9am – 4pm</p>
              <p className="text-xs mt-1" style={{ color: TEAL }}>24/7 emergency line always available</p>
            </div>
          </div>
          <ContactMessageForm />
        </div>
      </div>
    </section>
  );
}

/* ─── TEAMS ───────────────────────────────────────────────────── */
function Teams() {
  const members = [
    { name: "Sarah Mitchell", role: "Head of Care", img: "photo-1494790108377-be9c29b29330" },
    { name: "James Okoye", role: "Transport Manager", img: "photo-1507003211169-0a1dd7228f2d" },
    { name: "Priya Sharma", role: "Training Lead", img: "photo-1438761681033-6461ffad8d80" },
    { name: "David Chen", role: "Operations Director", img: "photo-1472099645785-5658abf4ff4e" },
  ];
  return (
    <section style={{ background: OFF_WHITE, paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: TEAL }}>Our People</span>
          <h2 className="font-bold" style={{ fontSize: 36, color: NAVY }}>Meet the team behind AOSL</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-12">
          {members.map((m) => (
            <div key={m.name} className="flex flex-col items-center text-center" style={{ width: 180 }}>
              <div className="mb-4 rounded-full" style={{ background: `linear-gradient(135deg, ${TEAL}, ${NAVY})`, padding: 3 }}>
                <img src={`https://images.unsplash.com/${m.img}?w=160&h=160&fit=crop&auto=format`} alt={m.name} className="rounded-full object-cover" style={{ width: 120, height: 120 }} />
              </div>
              <p className="font-bold mb-0.5" style={{ fontSize: 15, color: NAVY }}>{m.name}</p>
              <p className="text-xs" style={{ color: TEAL }}>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TrustedBy />
      <Services />
      <Banner />
      <HowItWorks />
      <Achievements />
      <Newsletter />
      <Contact />
      <Teams />
    </>
  );
}

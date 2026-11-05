import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CORAL, MUTED, NAVY, TEAL } from "../../theme/tokens";
import Newsletter from "../../components/layout/Newsletter";

const SERVICE_BG = "#DCE6FB";
const CHARCOAL = "#3A3A5A";


/* ─── TYPES ──────────────────────────────────────────────────── */
export type ServiceKey = "personal-assistant" | "transportation" | "training";

type ChecklistItem = { title: string; desc: string };
type SubCard = { title: string; desc: string; img: string };
type ServiceData = {
  key: ServiceKey;
  label: string;
  heading: string;
  body: string;
  photo: string;
  photoAlt: string;
  ctaHeadline: string;
  ctaSubtext: string;
  variant: "checklist" | "subcards";
  checklist?: ChecklistItem[];
  subcards?: SubCard[];
};

/* ─── DATA ───────────────────────────────────────────────────── */
const SERVICES: Record<ServiceKey, ServiceData> = {
  "personal-assistant": {
    key: "personal-assistant",
    label: "OUR PERSONAL ASSISTANT SERVICES",
    heading: "Flexible Personal Assistant Support for Everyday Living",
    body: "At AOSL, we provide trusted and professional Personal Assistant (PA) support tailored to your unique needs. Choose from part-time, full-time, or self-employed arrangements that fit your lifestyle.",
    photo: "photo-1544027993-37dbfe43562a?w=640&h=520&fit=crop&auto=format",
    photoAlt: "Care worker providing warm, attentive support to an elderly client in their home",
    ctaHeadline: "Ready to get started?",
    ctaSubtext: "Let our dedicated team match you with the right Personal Assistant to support your everyday life.",
    variant: "checklist",
    checklist: [
      { title: "Companionship", desc: "Keeping you company, sharing stories, indoor games and ensuring safety at home." },
      { title: "General Administrative Support", desc: "Help with letters, forms, paperwork, and everyday administration." },
      { title: "Support with Appointments", desc: "Booking and attending appointments, including doctor's visits and all professional/personal appointments." },
      { title: "Family Contact Supervision", desc: "Supervised family contact to promote safe and positive interactions." },
      { title: "Domestic Support", desc: "Support with cleaners and preparing meals or serving." },
      { title: "Family Childcare Support", desc: "Reliable support with childcare and helping with daily routines." },
      { title: "Support with Shopping", desc: "Creating shopping lists, dropping, picking, and putting the shopping away." },
    ],
  },
  transportation: {
    key: "transportation",
    label: "OUR TRANSPORTATION SERVICES",
    heading: "Reliable Transportation Support Comfortable Everyday Travel",
    body: "At AOSL, we provide safe, dependable and affordable transportation services tailored to your needs. From local activity-centre trips to private events and airport transfers, our team helps you travel comfortably and on time.",
    photo: "photo-1558981359-219d6364c9c8?w=640&h=520&fit=crop&auto=format",
    photoAlt: "Passengers boarding a minibus with a driver helping with luggage",
    ctaHeadline: "Need reliable transport support?",
    ctaSubtext: "Let our team help you arrange the right transportation service for your journey.",
    variant: "subcards",
    subcards: [
      {
        title: "Transport to Activity Centres",
        desc: "Comfortable and reliable transport to activity centres and scheduled destinations.",
        img: "photo-1516841273335-e39b37888115?w=520&h=325&fit=crop&auto=format",
      },
      {
        title: "Private Chauffeuring",
        desc: "Professional private chauffeuring for personal appointments and private events.",
        img: "photo-1529156069898-49953e39b3ac?w=520&h=325&fit=crop&auto=format",
      },
      {
        title: "Airport Transportation Services",
        desc: "Convenient airport pick-up and drop-off services for smooth, stress-free travel.",
        img: "photo-1436491865332-7a61a109cc05?w=520&h=325&fit=crop&auto=format",
      },
    ],
  },
  training: {
    key: "training",
    label: "OUR TRAINING SERVICES",
    heading: "Practical Health & Care Training for Essential Workplace Skills",
    body: "At AOSL, we provide practical health and social care training designed to build confidence, compliance and everyday workplace competence. Select the training courses you need and our team will help you enrol quickly and easily.",
    photo: "photo-1524178232363-1fb2b075b655?w=640&h=520&fit=crop&auto=format",
    photoAlt: "Healthcare trainer and learner reviewing information together",
    ctaHeadline: "Need help choosing the right training?",
    ctaSubtext: "Let our team guide you to the most suitable course for your staff or personal development.",
    variant: "checklist",
    checklist: [
      { title: "Infection Prevention & Control", desc: "Levels 1 and 2 training focused on hygiene, safe practice and infection control awareness." },
      { title: "Information Governance & Data Security", desc: "Levels 1 and 2 training focused on hygiene, safe practice and infection control awareness." },
      { title: "Fire Safety", desc: "Essential fire prevention, emergency response and workplace safety procedures." },
      { title: "Health, Safety & Welfare", desc: "Promoting safe and day-to-day operational safety." },
      { title: "Equality, Diversity & Human Rights", desc: "Promoting safe and day-to-day operational safety." },
      { title: "Safeguarding Adults & Children", desc: "Essential safeguarding training focused on recognising signs of abuse." },
    ],
  },
};

/* ─── SERVICE TAB SWITCHER ───────────────────────────────────── */
function ServiceTabs({
  active,
  onChange,
}: {
  active: ServiceKey;
  onChange: (k: ServiceKey) => void;
}) {
  const tabs: { key: ServiceKey; label: string }[] = [
    { key: "personal-assistant", label: "Personal Assistant" },
    { key: "transportation", label: "Transportation" },
    { key: "training", label: "Training" },
  ];
  return (
    <div className="flex justify-center mb-14">
      <div
        className="inline-flex p-1.5 gap-1"
        style={{ background: "rgba(13,13,91,0.08)", borderRadius: 50 }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className="text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200"
            style={{
              background: active === t.key ? NAVY : "transparent",
              color: active === t.key ? "white" : MUTED,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── CHECKLIST GRID ─────────────────────────────────────────── */
function ChecklistGrid({ items }: { items: ChecklistItem[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7"
      style={{ maxWidth: 780 }}
    >
      {items.map((item) => (
        <div key={item.title} className="flex items-start gap-4">
          {/* 32px navy circle checkmark */}
          <div
            className="shrink-0 flex items-center justify-center rounded-full"
            style={{ width: 32, height: 32, minWidth: 32, background: NAVY }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path
                d="M1.5 5L5.5 9L12.5 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm mb-0.5" style={{ color: NAVY }}>
              {item.title}
            </p>
            <p className="text-sm leading-snug" style={{ color: CHARCOAL }}>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── TRANSPORT SUB-CARDS ─────────────────────────────────────── */
function SubCards({ cards }: { cards: SubCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c) => (
        <div
          key={c.title}
          className="bg-white overflow-hidden flex flex-col"
          style={{ borderRadius: 16, boxShadow: "0 4px 24px rgba(13,13,91,0.09)" }}
        >
          {/* 16:10 photo with rounded top corners */}
          <div style={{ borderRadius: "16px 16px 0 0", overflow: "hidden", aspectRatio: "16/10" }}>
            <img
              src={`https://images.unsplash.com/${c.img}`}
              alt={c.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <p className="font-bold mb-1.5" style={{ fontSize: 16, color: NAVY }}>
              {c.title}
            </p>
            <p className="text-sm" style={{ color: CHARCOAL }}>
              {c.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── CTA STRIP ──────────────────────────────────────────────── */
function CTAStrip({ headline, subtext }: { headline: string; subtext: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex flex-wrap items-center gap-6 px-8 py-7 mt-14"
      style={{ background: NAVY, borderRadius: 24 }}
    >
      {/* WhatsApp circle */}
      <div
        className="shrink-0 flex items-center justify-center rounded-full"
        style={{ width: 52, height: 52, background: "rgba(255,255,255,0.13)" }}
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="white">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.664 4.8 1.822 6.797L2 30l7.42-1.946A13.938 13.938 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.54 11.54 0 0 1-5.876-1.598l-.422-.25-4.4 1.152 1.172-4.278-.275-.438A11.556 11.556 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6z" />
          <path d="M22.865 19.394c-.328-.164-1.94-.956-2.24-1.066-.298-.11-.516-.164-.733.164-.217.328-.843 1.066-1.033 1.285-.19.22-.38.247-.708.082-1.862-.931-3.085-1.662-4.313-3.768-.326-.56.326-.52.933-1.73.103-.218.051-.41-.027-.574-.082-.164-.733-1.767-1.003-2.419-.264-.635-.533-.548-.733-.558l-.625-.01c-.217 0-.57.082-.869.41-.298.328-1.14 1.113-1.14 2.715s1.167 3.15 1.33 3.368c.164.217 2.295 3.505 5.561 4.915.777.337 1.384.538 1.857.688.78.249 1.49.214 2.05.13.626-.093 1.94-.793 2.213-1.558.274-.765.274-1.42.192-1.558-.082-.137-.298-.22-.626-.383z" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white mb-0.5" style={{ fontSize: 18 }}>
          {headline}
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          {subtext}
        </p>
      </div>

      {/* Outlined CTA */}
      <Link
        to="/contact-us"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="shrink-0 inline-flex items-center gap-2.5 font-semibold text-sm rounded-full px-6 py-3 border-2 transition-all duration-200"
        style={{
          borderColor: "white",
          color: hovered ? NAVY : "white",
          background: hovered ? "white" : "transparent",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 2h4l1.5 3.5-2 1.5c1 2 3 4 5 5l1.5-2 3.5 1.5V14a1 1 0 0 1-1 1C6 15 1 10 1 3a1 1 0 0 1 1-1z"
            fill="currentColor"
          />
        </svg>
        Contact Us
      </Link>
    </div>
  );
}

/* ─── DYNAMIC SERVICE SECTION ────────────────────────────────── */
function ServiceSection({ initialService }: { initialService: ServiceKey }) {
  const [active, setActive] = useState<ServiceKey>(initialService);
  const data = SERVICES[active];

  return (
    <section style={{ background: SERVICE_BG, paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <ServiceTabs active={active} onChange={setActive} />

        {/* Two-column header ─ Left: label + heading + body | Right: photo */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-14">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 32, height: 2, background: TEAL, borderRadius: 1 }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: TEAL }}
              >
                {data.label}
              </span>
            </div>

            <h2
              className="font-bold leading-tight mb-5"
              style={{ fontSize: 36, color: NAVY, lineHeight: 1.2, maxWidth: 480 }}
            >
              {data.heading}
            </h2>

            <p
              className="leading-relaxed"
              style={{ fontSize: 16, color: CHARCOAL, maxWidth: 480 }}
            >
              {data.body}
            </p>
          </div>

          {/* RIGHT: photo */}
          <div
            className="overflow-hidden w-full"
            style={{ borderRadius: 16, background: "#c8d4e8" }}
          >
            <img
              src={`https://images.unsplash.com/${data.photo}`}
              alt={data.photoAlt}
              className="w-full object-cover"
              style={{ height: 420, display: "block" }}
            />
          </div>
        </div>

        {/* Checklist or sub-cards */}
        {data.variant === "checklist" && data.checklist && (
          <ChecklistGrid items={data.checklist} />
        )}
        {data.variant === "subcards" && data.subcards && (
          <SubCards cards={data.subcards} />
        )}

        {/* CTA strip */}
        <CTAStrip headline={data.ctaHeadline} subtext={data.ctaSubtext} />
      </div>
    </section>
  );
}

/* ─── HERO ────────────────────────────────────────────────────── */
function Hero({ onExplore }: { onExplore: () => void }) {
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

            <p
              className="mb-10 leading-relaxed"
              style={{ fontSize: 18, color: "#4A4A6A", maxWidth: 460 }}
            >
              AOSL provides compassionate, professional care, transportation, and training services
              across the UK — tailored to every individual's needs.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 font-semibold text-white rounded-full px-7 py-3.5 transition-opacity hover:opacity-90"
                style={{ background: CORAL, fontSize: 15 }}
              >
                Explore services
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3.5 border-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: NAVY, color: NAVY, fontSize: 15 }}
              >
                Contact Us
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[CORAL, TEAL, NAVY, "#F7B28A"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="text-sm" style={{ color: MUTED }}>
                <strong style={{ color: NAVY }}>6,500+</strong> clients supported across the UK
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
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#E8F7F8" }}
              >
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


const SERVICE_KEYS: ServiceKey[] = ["personal-assistant", "transportation", "training"];

export default function ServiceDetailPage() {
  const { service } = useParams();
  const navigate = useNavigate();
  const initial: ServiceKey = SERVICE_KEYS.includes(service as ServiceKey) ? (service as ServiceKey) : "personal-assistant";

  useEffect(() => {
    if (service && !SERVICE_KEYS.includes(service as ServiceKey)) navigate("/services", { replace: true });
  }, [service, navigate]);

  function scrollToServices() {
    document.getElementById("service-detail-section")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Hero onExplore={scrollToServices} />
      <div id="service-detail-section">
        <ServiceSection key={initial} initialService={initial} />
      </div>
      <Newsletter />
    </>
  );
}

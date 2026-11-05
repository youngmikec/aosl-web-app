import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { CORAL, MUTED, NAVY, OFF_WHITE, TEAL, TEXT } from "../../theme/tokens";
import Newsletter from "../../components/layout/Newsletter";
import { PHONE_DISPLAY, PHONE_HREF } from "../../constants/contact";

const CHARCOAL = "#3A3A5A";

/* ─── DATA ───────────────────────────────────────────────────── */
type FaqItem = { q: string; a: string };

const FAQ_CATEGORIES: { label: string; icon: string; items: FaqItem[] }[] = [
  {
    label: "Care & Support",
    icon: "heart",
    items: [
      {
        q: "How quickly can care begin?",
        a: "In most cases we can arrange a care start within 24–48 hours of completing an assessment. For urgent situations, speak to our emergency line and we'll do our utmost to help same-day.",
      },
      {
        q: "Can I request a specific care worker?",
        a: "Absolutely. Continuity matters to us as much as it does to you. We prioritise consistent carer-client matching and will always aim to accommodate preferences — just let your coordinator know.",
      },
      {
        q: "What happens if my regular carer is unavailable?",
        a: "We always have a cover pool of vetted, trained staff. You'll be notified promptly and introduced to your cover carer before their first visit wherever possible.",
      },
      {
        q: "Do you provide live-in care?",
        a: "Yes. We offer fully managed live-in care packages where a dedicated carer stays in your home. Costs and care plans are tailored to your specific needs — contact us for a no-obligation consultation.",
      },
      {
        q: "How do I raise a concern about my care?",
        a: "Call your care coordinator directly, use the client portal, or email care@aosl.co.uk. For serious concerns, our head office line is answered 24/7.",
      },
    ],
  },
  {
    label: "Funding & Costs",
    icon: "coin",
    items: [
      {
        q: "Do you work with local authority funding?",
        a: "Yes. We accept direct payments, individual service funds, and local authority-managed budgets. Our team can help you navigate the funding process from assessment through to payment.",
      },
      {
        q: "Can I use NHS Continuing Healthcare funding?",
        a: "Yes — if you have been assessed as eligible for NHS Continuing Healthcare (CHC), AOSL is registered to accept CHC funding. We work directly with your Integrated Care Board.",
      },
      {
        q: "Is there a minimum contract length?",
        a: "No minimum term for most services. We understand circumstances change — you can pause or stop services with reasonable notice as agreed in your care plan.",
      },
      {
        q: "Are there any hidden fees?",
        a: "None. All costs are set out clearly in your service agreement before care begins. Travel, out-of-hours, and specialist support rates are itemised separately so you always know what you're paying.",
      },
    ],
  },
  {
    label: "Staff & Safety",
    icon: "shield",
    items: [
      {
        q: "Are your staff DBS checked?",
        a: "All AOSL staff hold an enhanced DBS certificate. References are verified, and every care worker completes our in-house induction programme before meeting any client.",
      },
      {
        q: "What training do your care workers receive?",
        a: "All staff complete mandatory training covering safeguarding, manual handling, medication, first aid, and infection control before deployment. Many hold NVQ Level 2 or 3 in Health and Social Care.",
      },
      {
        q: "Are your staff registered with the CQC?",
        a: "AOSL operates under CQC (Care Quality Commission) registration. Our last inspection rating is available on request and on the CQC website.",
      },
      {
        q: "How do you handle medication administration?",
        a: "Only staff who have completed our accredited medication administration training handle medicines. Detailed records are kept and reviewed by your care coordinator regularly.",
      },
    ],
  },
  {
    label: "Transportation",
    icon: "van",
    items: [
      {
        q: "What types of vehicles do you use?",
        a: "We operate a mixed fleet including WAV (Wheelchair Accessible Vehicles), standard saloons, and larger accessible minibuses — all maintained to DVSA standards.",
      },
      {
        q: "Can you escort a client to a medical appointment?",
        a: "Yes. Many clients book transport with an escort (a trained AOSL carer who accompanies them throughout the appointment). This service can be added to any transport booking.",
      },
      {
        q: "How far in advance must I book transport?",
        a: "We recommend at least 48 hours' notice for planned journeys. For regular routes (e.g. weekly hospital visits), a standing booking can be arranged. Emergency transport requests are handled case-by-case.",
      },
    ],
  },
  {
    label: "Training Courses",
    icon: "book",
    items: [
      {
        q: "Who are your training courses for?",
        a: "Our courses are designed for care workers, support staff, domiciliary care providers, NHS staff, and family carers. Courses range from introductory half-days to full accredited programmes.",
      },
      {
        q: "Are your training qualifications nationally recognised?",
        a: "Yes. Our accredited courses are aligned with Skills for Care standards and recognised across the UK health and social care sector. Certificates are issued upon completion.",
      },
      {
        q: "Can you deliver training at our premises?",
        a: "Absolutely. We offer both in-person training at our training centres and on-site delivery at your organisation. Bespoke group packages are available — contact us for a quote.",
      },
      {
        q: "How do I enrol on a course?",
        a: "Browse our current schedule on the Training page, then use the Contact form to register your interest. Our training coordinator will confirm availability and send joining instructions.",
      },
    ],
  },
  {
    label: "General",
    icon: "info",
    items: [
      {
        q: "What areas do you cover?",
        a: "We currently operate across Greater London, the West Midlands, and Greater Manchester, with regional offices in each area. Contact us to confirm coverage in your specific postcode.",
      },
      {
        q: "How do I make a complaint or give feedback?",
        a: "We welcome all feedback. Email complaints@aosl.co.uk, call our head office, or complete the Contact form and select 'Complaint or Feedback'. We aim to acknowledge all complaints within 1 working day.",
      },
      {
        q: "Do you work with social workers and care managers?",
        a: "Yes — we have dedicated referral pathways for professionals. Social workers and care managers can submit referrals directly via email or our professional enquiry line.",
      },
    ],
  },
];

const ICON_PATHS: Record<string, ReactNode> = {
  heart: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 15s-7-4.5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 16 6c0 4.5-7 9-7 9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  coin: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 5.5v1M9 11.5v1M6.5 9h1.5a1 1 0 1 0 0-2h-1a1 1 0 1 1 0-2H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L3 5v5c0 3.5 2.5 6 6 7 3.5-1 6-3.5 6-7V5L9 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6.5 9l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  van: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="5" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 8h16M5 14v2M13 14v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 8l3-3h10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  book: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 3h5a3 3 0 0 1 3 3v9a2 2 0 0 0-2-2H3V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 3h-5a3 3 0 0 0-3 3v9a2 2 0 0 1 2-2h6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8v5M9 6v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

/* ─── PAGE HERO ───────────────────────────────────────────────── */
function PageHero() {
  return (
    <section style={{ background: NAVY, paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="flex items-center gap-2 text-sm mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span>Home</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: TEAL }}>FAQs</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(232,99,74,0.2)", color: CORAL }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: CORAL }} />
              Help Centre
            </span>
            <h1 className="font-bold text-white mb-4" style={{ fontSize: 52, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 500, lineHeight: 1.65 }}>
              Answers to the questions we hear most — organised by topic so you can find what you need quickly. Can't find it? Our team is a phone call away.
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 lg:justify-end">
            {[
              { n: `${FAQ_CATEGORIES.reduce((s, c) => s + c.items.length, 0)}`, label: "Answers available" },
              { n: `${FAQ_CATEGORIES.length}`, label: "Topic categories" },
              { n: "24/7", label: "Support line" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-bold text-white" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>{s.n}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SEARCH BAR ──────────────────────────────────────────────── */
function SearchBar({ query, onChange }: { query: string; onChange: (v: string) => void }) {
  return (
    <div className="bg-white" style={{ paddingTop: 36, paddingBottom: 36, borderBottom: "1px solid #EBEBF5" }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="relative" style={{ maxWidth: 560 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="absolute left-4 top-1/2 -translate-y-1/2">
            <circle cx="8" cy="8" r="5.5" stroke={MUTED} strokeWidth="1.6" />
            <path d="M13 13l3 3" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search questions…"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border text-sm outline-none pl-11 pr-4 py-3.5"
            style={{ borderRadius: 12, borderColor: "#DDDAF5", color: TEXT, background: OFF_WHITE }}
          />
          {query && (
            <button
              onClick={() => onChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold"
              style={{ color: MUTED }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── CATEGORY SIDEBAR ────────────────────────────────────────── */
function CategorySidebar({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav className="flex flex-col gap-1.5">
      {FAQ_CATEGORIES.map((cat, i) => (
        <button
          key={cat.label}
          onClick={() => onSelect(i)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all"
          style={{
            background: active === i ? NAVY : "transparent",
            color: active === i ? "white" : CHARCOAL,
          }}
        >
          <span
            className="shrink-0"
            style={{ color: active === i ? "rgba(255,255,255,0.7)" : TEAL }}
          >
            {ICON_PATHS[cat.icon]}
          </span>
          {cat.label}
          <span
            className="ml-auto text-xs font-semibold rounded-full px-2 py-0.5"
            style={{
              background: active === i ? "rgba(255,255,255,0.15)" : "#EBEBF5",
              color: active === i ? "white" : MUTED,
            }}
          >
            {cat.items.length}
          </span>
        </button>
      ))}
    </nav>
  );
}

/* ─── ACCORDION ───────────────────────────────────────────────── */
function Accordion({ items, highlight }: { items: FaqItem[]; highlight: string }) {
  const [open, setOpen] = useState<number | null>(null);

  function mark(text: string) {
    if (!highlight) return text;
    const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: "#FFF0C8", borderRadius: 2 }}>{text.slice(idx, idx + highlight.length)}</mark>
        {text.slice(idx + highlight.length)}
      </>
    );
  }

  return (
    <div className="flex flex-col" style={{ borderTop: "1px solid #EBEBF5" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid #EBEBF5" }}>
          <button
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-sm pr-2" style={{ color: NAVY, lineHeight: 1.5 }}>
              {mark(item.q)}
            </span>
            <div
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: open === i ? NAVY : "#F0F0F8",
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.2s, background 0.2s",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6h8" stroke={open === i ? "white" : NAVY} strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>
          </button>
          {open === i && (
            <p className="text-sm leading-relaxed pb-5" style={{ color: CHARCOAL }}>
              {mark(item.a)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN FAQ BODY ───────────────────────────────────────────── */
function FAQBody() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [query, setQuery] = useState("");

  const searchResults: { category: string; item: FaqItem }[] = query.trim()
    ? FAQ_CATEGORIES.flatMap((cat) =>
        cat.items
          .filter(
            (item) =>
              item.q.toLowerCase().includes(query.toLowerCase()) ||
              item.a.toLowerCase().includes(query.toLowerCase())
          )
          .map((item) => ({ category: cat.label, item }))
      )
    : [];

  const isSearching = query.trim().length > 0;

  return (
    <>
      <SearchBar query={query} onChange={setQuery} />

      <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
          {isSearching ? (
            /* ── Search results ── */
            <div>
              <p className="text-sm mb-8" style={{ color: MUTED }}>
                {searchResults.length === 0
                  ? `No results for "${query}"`
                  : `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${query}"`}
              </p>

              {searchResults.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: OFF_WHITE }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="10" cy="10" r="7" stroke={MUTED} strokeWidth="1.6" />
                      <path d="M16 16l4 4" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M10 7v3M10 12.5v.5" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-semibold mb-2" style={{ color: NAVY }}>No matches found</p>
                  <p className="text-sm mb-6" style={{ color: MUTED }}>Try a different search term, or reach out to our team directly.</p>
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center gap-2 font-semibold text-sm text-white rounded-full px-6 py-3"
                    style={{ background: CORAL }}
                  >
                    Contact us
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {searchResults.map((r, i) => (
                    <div key={i} className="p-5" style={{ borderRadius: 12, border: "1.5px solid #EBEBF5" }}>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: TEAL }}>{r.category}</span>
                      <p className="font-semibold text-sm mt-1 mb-2" style={{ color: NAVY }}>{r.item.q}</p>
                      <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{r.item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ── Category view ── */
            <div className="grid lg:grid-cols-4 gap-10">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: MUTED }}>Topics</p>
                <CategorySidebar active={activeCategory} onSelect={setActiveCategory} />
              </div>

              {/* Accordion */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#E8F7F8", color: TEAL }}
                  >
                    {ICON_PATHS[FAQ_CATEGORIES[activeCategory].icon]}
                  </div>
                  <h2 className="font-bold" style={{ fontSize: 24, color: NAVY }}>
                    {FAQ_CATEGORIES[activeCategory].label}
                  </h2>
                  <span className="text-xs font-semibold rounded-full px-2.5 py-1 ml-1" style={{ background: "#EBEBF5", color: MUTED }}>
                    {FAQ_CATEGORIES[activeCategory].items.length} questions
                  </span>
                </div>

                <Accordion items={FAQ_CATEGORIES[activeCategory].items} highlight="" />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ─── STILL NEED HELP CTA ─────────────────────────────────────── */
function StillNeedHelp() {
  return (
    <section style={{ background: OFF_WHITE, paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div
          className="flex flex-wrap items-center justify-between gap-8 px-10 py-10"
          style={{ background: NAVY, borderRadius: 24 }}
        >
          <div>
            <p className="font-bold text-white text-xl mb-1">Still have a question?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Our team is available Mon–Sat and on a 24/7 emergency line.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 py-3 border-2 border-white text-white transition-all hover:bg-white"
              onMouseEnter={(e) => { (e.currentTarget).style.color = NAVY; }}
              onMouseLeave={(e) => { (e.currentTarget).style.color = "white"; }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 2h3l1.5 3.5-2 1.5C5.8 9.3 6 9.5 9 11.5l1.5-2 3.5 1.5V14a1 1 0 0 1-1 1C5 15 1 11 1 4a1 1 0 0 1 1-1z" fill="currentColor" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 py-3 text-white transition-opacity hover:opacity-90"
              style={{ background: CORAL }}
            >
              Send a message
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function FAQsPage() {
  return (
    <>
      <PageHero />
      <FAQBody />
      <StillNeedHelp />
      <Newsletter />
    </>
  );
}

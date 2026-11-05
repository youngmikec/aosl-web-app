import { ChangeEvent, FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CORAL, MUTED, NAVY, OFF_WHITE, TEAL, TEXT } from "../../theme/tokens";
import Newsletter from "../../components/layout/Newsletter";
import { useAuth } from "../../context/AuthContext";
import { errorMessage, fetchPublicJobs, submitApplication } from "../../services";
import { CERT_LEVELS, MAX_CV_BYTES, readAsDataUrl } from "../../constants/application";
import { jobToListing, Listing, ListingTab as Tab } from "../../models/listing";

const CHARCOAL = "#3A3A5A";
type View = "listing" | "detail" | "apply";

/* ─── HERO ────────────────────────────────────────────────────── */
function Hero({ tab, onTabChange, keyword, location, onKeyword, onLocation, onSearch }: {
  tab: Tab; onTabChange: (t: Tab) => void;
  keyword: string; location: string;
  onKeyword: (v: string) => void; onLocation: (v: string) => void;
  onSearch: () => void;
}) {
  return (
    <section style={{ background: NAVY, paddingTop: 60, paddingBottom: 0 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        {/* Tab toggle */}
        <div className="flex gap-1 mb-8" style={{ width: "fit-content" }}>
          {(["jobs", "training"] as Tab[]).map(t => (
            <button key={t}
              onClick={() => onTabChange(t)}
              className="px-6 py-2.5 text-sm font-semibold rounded-full transition-all"
              style={{
                background: tab === t ? "white" : "transparent",
                color: tab === t ? NAVY : "rgba(255,255,255,0.6)",
                border: tab === t ? "none" : "1.5px solid rgba(255,255,255,0.2)",
              }}
            >{t === "jobs" ? "Find Jobs" : "Training Courses"}</button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="font-bold text-white mb-3" style={{ fontSize: 48, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {tab === "jobs" ? "Find Your Next Care Role." : "Grow Your Care Career."}
              <span style={{ color: CORAL }}> ✦</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
              {tab === "jobs"
                ? "Browse vetted care, support, and transport roles across the UK — posted by AOSL and partner organisations."
                : "Accredited, practitioner-led training for care professionals. Book a place or enquire about group bookings."}
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            {(tab === "jobs"
              ? [{ n: "48", l: "Live roles" }, { n: "3", l: "Locations" }, { n: "24hrs", l: "Avg. response" }]
              : [{ n: "12", l: "Courses" }, { n: "6", l: "Topics" }, { n: "CPD", l: "Accredited" }]
            ).map(s => (
              <div key={s.l} className="text-center">
                <p className="font-bold text-white" style={{ fontSize: 24, letterSpacing: "-0.02em" }}>{s.n}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div
          className="flex flex-col sm:flex-row gap-0 bg-white overflow-hidden mb-0"
          style={{ borderRadius: "16px 16px 0 0", boxShadow: "0 -4px 24px rgba(13,13,91,0.15)" }}
        >
          <div className="flex items-center gap-3 flex-1 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-100">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke={MUTED} strokeWidth="1.6" />
              <path d="M13 13l3 3" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder={tab === "jobs" ? "Job title or keyword" : "Course title or topic"}
              value={keyword}
              onChange={e => onKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onSearch()}
              className="flex-1 outline-none text-sm bg-transparent"
              style={{ color: TEXT }}
            />
          </div>
          <div className="flex items-center gap-3 flex-1 px-5 py-4">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1C6.239 1 4 3.239 4 6c0 4 5 11 5 11s5-7 5-11c0-2.761-2.239-5-5-5z" stroke={MUTED} strokeWidth="1.5" />
              <circle cx="9" cy="6" r="1.8" stroke={MUTED} strokeWidth="1.5" />
            </svg>
            <input
              type="text"
              placeholder="Location or 'Remote'"
              value={location}
              onChange={e => onLocation(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onSearch()}
              className="flex-1 outline-none text-sm bg-transparent"
              style={{ color: TEXT }}
            />
          </div>
          <div className="px-4 py-3 flex items-center">
            <button
              onClick={onSearch}
              className="font-semibold text-sm text-white px-7 py-3 rounded-xl transition-opacity hover:opacity-90 w-full sm:w-auto"
              style={{ background: CORAL }}
            >Search</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FILTER SIDEBAR ──────────────────────────────────────────── */
function FilterSidebar({ tab, contracts, levels, locations, contract, setContract, level, setLevel, locationFilter, setLocationFilter }: {
  tab: Tab;
  contracts: string[];
  levels: { l: string; n: number }[];
  locations: string[];
  contract: string[]; setContract: (v: string[]) => void;
  level: string[]; setLevel: (v: string[]) => void;
  locationFilter: string[]; setLocationFilter: (v: string[]) => void;
}) {
  function toggle(arr: string[], val: string, set: (v: string[]) => void) {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  }

  return (
    <aside className="w-full lg:w-56 shrink-0 flex flex-col gap-7">
      {/* Contract / Duration */}
      {contracts.length > 0 && <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: NAVY }}>
            {tab === "jobs" ? "Job Type" : "Format"}
          </p>
          {(contract.length > 0 || level.length > 0 || locationFilter.length > 0) && (
            <button className="text-xs font-semibold" style={{ color: CORAL }}
              onClick={() => { setContract([]); setLevel([]); setLocationFilter([]); }}>Clear all</button>
          )}
        </div>
        <div className="flex flex-col gap-2.5">
          {contracts.map(c => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={contract.includes(c)} onChange={() => toggle(contract, c, setContract)}
                className="w-4 h-4 rounded" style={{ accentColor: NAVY }} />
              <span className="text-sm" style={{ color: CHARCOAL }}>{c}</span>
            </label>
          ))}
        </div>
      </div>}

      {/* Experience / Level (only when the data carries it) */}
      {levels.length > 0 && <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: NAVY }}>
          {tab === "jobs" ? "Experience Level" : "Level"}
        </p>
        <div className="flex flex-col gap-2.5">
          {levels.map(({ l, n }) => (
            <label key={l} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input type="checkbox" checked={level.includes(l)} onChange={() => toggle(level, l, setLevel)}
                  className="w-4 h-4 rounded" style={{ accentColor: NAVY }} />
                <span className="text-sm" style={{ color: CHARCOAL }}>{l}</span>
              </div>
              <span className="text-xs font-semibold rounded-full px-2 py-0.5" style={{ background: "#EBEBF5", color: MUTED }}>{n}</span>
            </label>
          ))}
        </div>
      </div>}

      {/* Location (only when listings span more than one) */}
      {tab === "jobs" && locations.length > 1 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: NAVY }}>Location</p>
          <div className="flex flex-col gap-2.5">
            {locations.map(loc => (
              <label key={loc} className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={locationFilter.includes(loc)}
                  onChange={() => toggle(locationFilter, loc, setLocationFilter)}
                  className="w-4 h-4 rounded" style={{ accentColor: NAVY }} />
                <span className="text-sm" style={{ color: CHARCOAL }}>{loc}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

/* ─── TAG PILL ────────────────────────────────────────────────── */
function Tag({ label }: { label: string }) {
  const colorMap: Record<string, { bg: string; color: string }> = {
    "Entry Level": { bg: "#E8F7F8", color: TEAL },
    "Entry": { bg: "#E8F7F8", color: TEAL },
    "Intermediate": { bg: "#EEF2FF", color: "#4F46E5" },
    "Senior": { bg: "#FFF0ED", color: CORAL },
    "Foundation": { bg: "#E8F7F8", color: TEAL },
    "Full-time": { bg: "#F0FBF4", color: "#16A34A" },
    "Part-time": { bg: "#FFFBEB", color: "#D97706" },
    "Live-in": { bg: "#FFF0ED", color: CORAL },
    "Remote": { bg: "#F5F5F5", color: CHARCOAL },
    "Accredited": { bg: "#FFF0ED", color: CORAL },
    "Mandatory": { bg: "#FEE2E2", color: "#DC2626" },
    "CPD": { bg: "#EEF2FF", color: "#4F46E5" },
    "Online Available": { bg: "#F0FBF4", color: "#16A34A" },
    "HSE Approved": { bg: "#F0FBF4", color: "#16A34A" },
  };
  const style = colorMap[label] ?? { bg: "#F0F0F8", color: MUTED };
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: style.bg, color: style.color }}>
      {label}
    </span>
  );
}

/* ─── LISTING CARD ────────────────────────────────────────────── */
function ListingCard({ item, selected, onSelect }: {
  item: Listing; selected: boolean; onSelect: () => void;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <div
      onClick={onSelect}
      className="bg-white p-5 cursor-pointer transition-all flex flex-col gap-3"
      style={{
        borderRadius: 16,
        border: selected ? `2px solid ${NAVY}` : "1.5px solid #EBEBF5",
        boxShadow: selected ? `0 0 0 3px rgba(13,13,91,0.08)` : "0 2px 12px rgba(13,13,91,0.05)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Org avatar */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm text-white"
            style={{ background: item.type === "jobs" ? NAVY : TEAL }}>
            {item.type === "jobs" ? "A" : "T"}
          </div>
          <div>
            <p className="font-bold text-sm leading-tight" style={{ color: NAVY }}>{item.title}</p>
            <p className="text-xs" style={{ color: MUTED }}>{item.org}</p>
          </div>
        </div>
        <button onClick={e => { e.stopPropagation(); setSaved(v => !v); }}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: saved ? "#FFF0ED" : "#F5F5F8" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill={saved ? CORAL : "none"}>
            <path d="M7 12S1 8 1 4.5a3.5 3.5 0 0 1 6-2.45A3.5 3.5 0 0 1 13 4.5C13 8 7 12 7 12z"
              stroke={saved ? CORAL : MUTED} strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {item.tags.slice(0, 3).map(t => <Tag key={t} label={t} />)}
        {item.accredited && <Tag label="Accredited" />}
      </div>

      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: CHARCOAL }}>{item.excerpt}</p>

      <div className="flex items-center justify-between pt-1">
        <p className="font-bold text-sm" style={{ color: NAVY }}>{item.rate}</p>
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke={MUTED} strokeWidth="1.2" />
            <path d="M6 3.5v2.5l2 1" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-xs" style={{ color: MUTED }}>{item.posted}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── DETAIL PANEL (centre) ───────────────────────────────────── */
function DetailPanel({ item, onApply }: { item: Listing; onApply: () => void }) {
  return (
    <div className="flex flex-col gap-7">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <h2 className="font-bold flex-1" style={{ fontSize: 28, color: NAVY, lineHeight: 1.2 }}>{item.title}</h2>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(t => <Tag key={t} label={t} />)}
          </div>
        </div>
        <p className="text-sm" style={{ color: MUTED }}>{item.org} · {item.location}</p>
        {item.duration && <p className="text-sm mt-1" style={{ color: MUTED }}>Duration: <strong style={{ color: NAVY }}>{item.duration}</strong></p>}
        {item.startDate && <p className="text-sm" style={{ color: MUTED }}>Next date: <strong style={{ color: NAVY }}>{item.startDate}</strong></p>}
      </div>

      {/* About */}
      <div>
        <h3 className="font-bold mb-3" style={{ fontSize: 16, color: NAVY }}>
          {item.type === "jobs" ? "About the role" : "About this course"}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{item.description}</p>
      </div>

      {/* Responsibilities */}
      <div>
        <h3 className="font-bold mb-3" style={{ fontSize: 16, color: NAVY }}>
          {item.type === "jobs" ? "Responsibilities" : "What you'll learn"}
        </h3>
        <ul className="flex flex-col gap-2.5">
          {item.responsibilities.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: CHARCOAL }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#E8F7F8" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-bold mb-3" style={{ fontSize: 16, color: NAVY }}>
          {item.type === "jobs" ? "Required skills" : "Skills you'll gain"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {item.skills.map(s => (
            <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-full border" style={{ borderColor: "#DDDAF5", color: CHARCOAL }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ORG SIDEBAR (right) ─────────────────────────────────────── */
function OrgPanel({ item, onApply }: { item: Listing; onApply: () => void }) {
  return (
    <div className="flex flex-col gap-4 lg:sticky" style={{ top: 88 }}>
      {/* Org card */}
      <div className="p-6 flex flex-col gap-4" style={{ background: "white", borderRadius: 16, border: "1.5px solid #EBEBF5" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white"
            style={{ background: item.type === "jobs" ? NAVY : TEAL }}>
            {item.type === "jobs" ? "A" : "T"}
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: NAVY }}>AOSL Ltd
              <span className="inline-block w-2 h-2 rounded-full ml-1.5" style={{ background: "#22C55E" }} />
            </p>
            <p className="text-xs" style={{ color: MUTED }}>All Occupation Service Ltd</p>
          </div>
        </div>

        {[
          { label: "Established", value: "2009" },
          { label: "Locations", value: "London · Birmingham · Manchester" },
          { label: "Regulated by", value: "CQC (Care Quality Commission)" },
        ].map(row => (
          <div key={row.label}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: MUTED }}>{row.label}</p>
            <p className="text-sm font-medium" style={{ color: NAVY }}>{row.value}</p>
          </div>
        ))}

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: MUTED }}>Specialisms</p>
          <div className="flex flex-wrap gap-1.5">
            {["Personal Care", "Transport", "Training", "Dementia", "Complex Care"].map(s => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-full" style={{ background: OFF_WHITE, color: CHARCOAL }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Rate / price box */}
      <div className="p-5 text-center" style={{ background: OFF_WHITE, borderRadius: 14 }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: MUTED }}>
          {item.type === "jobs" ? "Rate" : "Course Fee"}
        </p>
        <p className="font-bold mb-0.5" style={{ fontSize: 28, color: NAVY, letterSpacing: "-0.02em" }}>{item.rate}</p>
        {item.type === "training" && (
          <p className="text-xs" style={{ color: MUTED }}>per person · group rates available</p>
        )}
      </div>

      {/* Apply CTA */}
      <button
        onClick={onApply}
        className="w-full font-bold text-white py-4 rounded-xl transition-opacity hover:opacity-90"
        style={{ background: CORAL, fontSize: 15 }}
      >
        {item.type === "jobs" ? "Apply Now" : "Book a Place"}
      </button>

      <button className="w-full font-semibold text-sm py-3 rounded-xl border-2 transition-colors hover:bg-gray-50"
        style={{ borderColor: NAVY, color: NAVY }}>
        Save {item.type === "jobs" ? "Role" : "Course"}
      </button>
    </div>
  );
}

/* ─── AUTH MODAL ──────────────────────────────────────────────── */
function AuthModal({ item, onClose, onLogin, onSignUp }: {
  item: Listing; onClose: () => void; onLogin: () => void; onSignUp: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(13,13,91,0.55)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white w-full max-w-md flex flex-col" style={{ borderRadius: 24, overflow: "hidden" }}>
        {/* Top stripe */}
        <div className="px-8 py-7" style={{ background: NAVY }}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v10h5v-5h4v5h5V7L10 2z" fill="white" />
              </svg>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="font-bold text-white mb-1" style={{ fontSize: 20 }}>
            {item.type === "jobs" ? "Apply for this role" : "Book your place"}
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            You need an account to {item.type === "jobs" ? "apply for" : "book"}{" "}
            <strong className="text-white">{item.title}</strong>.
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-7 flex flex-col gap-4">
          <p className="text-sm text-center" style={{ color: MUTED }}>Already have an account?</p>

          <button onClick={onLogin}
            className="w-full font-bold text-white py-3.5 rounded-xl transition-opacity hover:opacity-90"
            style={{ background: NAVY }}>
            Sign In to Continue
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "#EBEBF5" }} />
            <span className="text-xs" style={{ color: MUTED }}>or</span>
            <div className="flex-1 h-px" style={{ background: "#EBEBF5" }} />
          </div>

          <button onClick={onSignUp}
            className="w-full font-bold py-3.5 rounded-xl border-2 transition-colors hover:bg-gray-50"
            style={{ borderColor: CORAL, color: CORAL }}>
            Create a Free Account
          </button>

          <p className="text-xs text-center" style={{ color: MUTED }}>
            By continuing you agree to AOSL's{" "}
            <span style={{ color: CORAL }} className="underline">Terms</span> and{" "}
            <span style={{ color: CORAL }} className="underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── APPLICATION FORM ────────────────────────────────────────── */
function ApplicationForm({ item, onBack, onSubmitted }: {
  item: Listing; onBack: () => void; onSubmitted: () => void;
}) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: user?.firstName || "", lastName: user?.lastName || "",
    email: user?.email || "", phone: user?.phone || "", address: "",
    state: "", nationality: "",
    certLevel: "", experienceYears: "",
    experience: "", statement: "", cvName: "",
  });
  const [cvData, setCvData] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function pickCv(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_CV_BYTES) {
      setError("Your CV must be 5MB or smaller.");
      return;
    }
    try {
      setCvData(await readAsDataUrl(file));
      set("cvName", file.name);
      setError("");
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  function next(e: { currentTarget: HTMLButtonElement }) {
    if (e.currentTarget.form?.reportValidity()) setStep(s => s + 1);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await submitApplication({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phone.trim(),
        address: form.address.trim() || "Not provided",
        state: form.state.trim(),
        nationality: form.nationality.trim(),
        certLevel: form.certLevel,
        experienceYears: Number(form.experienceYears),
        role: item.title,
        biography: form.statement.trim() || undefined,
        skills: form.experience.trim() || undefined,
        resume: cvData || undefined,
        job: item.id,
        createdBy: user?.id,
      });
      setSubmitted(true);
      setTimeout(onSubmitted, 2800);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: OFF_WHITE }}>
        <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full" style={{ boxShadow: "0 8px 48px rgba(13,13,91,0.12)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "#22C55E" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6 6L23 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-bold mb-2" style={{ fontSize: 24, color: NAVY }}>
            {item.type === "jobs" ? "Application Submitted!" : "Booking Confirmed!"}
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: MUTED }}>
            {item.type === "jobs"
              ? `Your application for ${item.title} has been received. Our team will review it and get back to you within 2 business days.`
              : `Your place on ${item.title} has been reserved. A confirmation email with joining instructions will follow shortly.`}
          </p>
          <p className="text-xs" style={{ color: MUTED }}>Taking you back to listings…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: OFF_WHITE, minHeight: "100vh", paddingTop: 60, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 760 }}>
        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
          style={{ color: MUTED }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = CORAL)}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = MUTED)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to listing
        </button>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: TEAL }}>
            {item.type === "jobs" ? "Job Application" : "Course Booking"}
          </span>
          <h1 className="font-bold mb-1" style={{ fontSize: 30, color: NAVY }}>{item.title}</h1>
          <p className="text-sm" style={{ color: MUTED }}>{item.org} · {item.rate}</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: s < step ? "#22C55E" : s === step ? NAVY : "#EBEBF5",
                  color: s <= step ? "white" : MUTED,
                }}>
                {s < step ? "✓" : s}
              </div>
              <span className="text-xs font-medium hidden sm:block" style={{ color: s === step ? NAVY : MUTED }}>
                {["Personal Details", "Experience", "Statement"][s - 1]}
              </span>
              {s < 3 && <div className="w-8 h-px" style={{ background: s < step ? "#22C55E" : "#EBEBF5" }} />}
            </div>
          ))}
        </div>

        <form onSubmit={submit}>
          <div className="bg-white p-8 flex flex-col gap-6" style={{ borderRadius: 20, boxShadow: "0 4px 24px rgba(13,13,91,0.07)" }}>

            {/* ── Step 1: Personal ── */}
            {step === 1 && (
              <>
                <h2 className="font-bold" style={{ fontSize: 18, color: NAVY }}>Personal Details</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <AppField label="First Name" required>
                    <input type="text" placeholder="Jane" required value={form.firstName}
                      onChange={e => set("firstName", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3" style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                  </AppField>
                  <AppField label="Last Name" required>
                    <input type="text" placeholder="Smith" required value={form.lastName}
                      onChange={e => set("lastName", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3" style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                  </AppField>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <AppField label="Email Address" required>
                    <input type="email" placeholder="jane@email.com" required value={form.email}
                      onChange={e => set("email", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3" style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                  </AppField>
                  <AppField label="Phone Number" required>
                    <input type="tel" placeholder="+44 7700 000 000" required value={form.phone}
                      onChange={e => set("phone", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3" style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                  </AppField>
                </div>
                <AppField label="Home Address">
                  <input type="text" placeholder="Street, City, Postcode" value={form.address}
                    onChange={e => set("address", e.target.value)}
                    className="w-full border outline-none text-sm px-4 py-3" style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                </AppField>
                <div className="grid sm:grid-cols-2 gap-5">
                  <AppField label="County / State" required>
                    <input type="text" placeholder="Greater London" required value={form.state}
                      onChange={e => set("state", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3" style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                  </AppField>
                  <AppField label="Nationality" required>
                    <input type="text" placeholder="British" required value={form.nationality}
                      onChange={e => set("nationality", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3" style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                  </AppField>
                </div>
              </>
            )}

            {/* ── Step 2: Experience ── */}
            {step === 2 && (
              <>
                <h2 className="font-bold" style={{ fontSize: 18, color: NAVY }}>
                  {item.type === "jobs" ? "Experience & CV" : "Background"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <AppField label="Highest Qualification" required>
                    <select required value={form.certLevel} onChange={e => set("certLevel", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3 appearance-none bg-white"
                      style={{ borderRadius: 10, borderColor: "#DDD9D4", color: form.certLevel ? TEXT : MUTED }}>
                      <option value="" disabled>Select…</option>
                      {CERT_LEVELS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </AppField>
                  <AppField label="Years of Experience" required>
                    <input type="number" min={0} max={60} placeholder="0" required value={form.experienceYears}
                      onChange={e => set("experienceYears", e.target.value)}
                      className="w-full border outline-none text-sm px-4 py-3" style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                  </AppField>
                </div>
                <AppField label={item.type === "jobs" ? "Relevant Experience" : "Reason for Attending"} required>
                  <textarea required rows={5} placeholder={item.type === "jobs"
                    ? "Describe your care experience, qualifications, and any relevant roles…"
                    : "Tell us about your role and why this course is relevant to your work…"}
                    value={form.experience} onChange={e => set("experience", e.target.value)}
                    className="w-full border outline-none text-sm px-4 py-3 resize-none"
                    style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                </AppField>
                {item.type === "jobs" && (
                  <AppField label="Upload CV (PDF)">
                    <label className="flex items-center gap-4 border-2 border-dashed rounded-xl px-5 py-4 cursor-pointer transition-colors hover:border-teal-400"
                      style={{ borderColor: "#DDDAF5" }}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M11 14V4M7 8l4-4 4 4" stroke={TEAL} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 16v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2" stroke={TEAL} strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: NAVY }}>
                          {form.cvName || "Click to upload your CV"}
                        </p>
                        <p className="text-xs" style={{ color: MUTED }}>PDF — max 5MB</p>
                      </div>
                      <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={pickCv} />
                    </label>
                  </AppField>
                )}
              </>
            )}

            {/* ── Step 3: Statement ── */}
            {step === 3 && (
              <>
                <h2 className="font-bold" style={{ fontSize: 18, color: NAVY }}>
                  {item.type === "jobs" ? "Supporting Statement" : "Additional Information"}
                </h2>
                <p className="text-sm" style={{ color: MUTED }}>
                  {item.type === "jobs"
                    ? "Tell us why you want this role and what you'd bring to the AOSL team. Aim for 200–400 words."
                    : "Any additional context that may help us support your learning — accessibility needs, prior training, etc."}
                </p>
                <AppField label={item.type === "jobs" ? "Statement" : "Notes"} required={item.type === "jobs"}>
                  <textarea rows={8} required={item.type === "jobs"}
                    placeholder={item.type === "jobs"
                      ? "I am applying for this role because…"
                      : "Optional — any accessibility requirements or additional context…"}
                    value={form.statement} onChange={e => set("statement", e.target.value)}
                    className="w-full border outline-none text-sm px-4 py-3 resize-none"
                    style={{ borderRadius: 10, borderColor: "#DDD9D4", color: TEXT }} />
                </AppField>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 w-4 h-4 shrink-0" style={{ accentColor: NAVY }} />
                  <span className="text-xs leading-relaxed" style={{ color: MUTED }}>
                    I confirm that the information provided is accurate and I consent to AOSL processing my data in line with their{" "}
                    <span style={{ color: CORAL }} className="underline">Privacy Policy</span>.
                  </span>
                </label>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(s => s - 1)}
                className="font-semibold text-sm py-3 px-6 rounded-xl border-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: NAVY, color: NAVY }}>← Back</button>
            ) : <div />}

            {step < 3 ? (
              <button type="button" onClick={next}
                className="font-bold text-sm text-white py-3 px-8 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: NAVY }}>Continue →</button>
            ) : (
              <button type="submit" disabled={sending}
                className="font-bold text-sm text-white py-3 px-8 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: CORAL }}>
                {sending ? "Submitting…" : item.type === "jobs" ? "Submit Application" : "Confirm Booking"}
              </button>
            )}
          </div>
          {error && <p role="alert" className="text-sm mt-4" style={{ color: CORAL }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

function AppField({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: NAVY }}>
        {label}{required && <span style={{ color: CORAL }}> *</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */
function extractRate(rate: string): number {
  const match = rate.match(/[\d,]+(\.\d+)?/);
  return match ? parseFloat(match[0].replace(/,/g, "")) : 0;
}

function countBy(values: string[]): { l: string; n: number }[] {
  const counts = new Map<string, number>();
  values.filter(Boolean).forEach(v => counts.set(v, (counts.get(v) || 0) + 1));
  return Array.from(counts, ([l, n]) => ({ l, n }));
}

export default function JobsTrainingPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { isAuthenticated } = useAuth();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [tab, setTab] = useState<Tab>("jobs");
  const [view, setView] = useState<View>("listing");
  const [selected, setSelected] = useState<Listing | null>(null);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [contract, setContract] = useState<string[]>([]);
  const [level, setLevel] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [sort, setSort] = useState("Most recent");

  useEffect(() => {
    let active = true;
    fetchPublicJobs()
      .then(res => {
        if (!active) return;
        setListings((res.data.payload || []).map(jobToListing));
      })
      .catch(err => active && setLoadError(errorMessage(err, "We couldn't load listings right now.")))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  // Deep link: /jobs-trainings/:jobId opens that listing's detail view.
  useEffect(() => {
    if (!jobId || listings.length === 0) return;
    const match = listings.find(l => l.id === jobId);
    if (match) {
      setTab(match.type);
      setSelected(match);
      setView("detail");
    }
  }, [jobId, listings]);

  const tabListings = useMemo(() => listings.filter(l => l.type === tab), [listings, tab]);
  const contracts = useMemo(() => Array.from(new Set(tabListings.map(l => l.contract).filter(Boolean))), [tabListings]);
  const levels = useMemo(() => countBy(tabListings.map(l => l.level)), [tabListings]);
  const locations = useMemo(() => Array.from(new Set(tabListings.map(l => l.location).filter(Boolean))), [tabListings]);

  const filtered = useMemo(() => tabListings
    .filter(l => {
      const kw = keyword.toLowerCase();
      const loc = location.toLowerCase();
      const matchKw = !kw || l.title.toLowerCase().includes(kw) || l.excerpt.toLowerCase().includes(kw) || l.tags.some(t => t.toLowerCase().includes(kw));
      const matchLoc = !loc || l.location.toLowerCase().includes(loc) || l.tags.some(t => t.toLowerCase().includes(loc));
      const matchContract = contract.length === 0 || contract.includes(l.contract);
      const matchLevel = level.length === 0 || level.includes(l.level);
      const matchLocFilter = locationFilter.length === 0 || locationFilter.some(lf => l.location.toLowerCase().includes(lf.toLowerCase()));
      return matchKw && matchLoc && matchContract && matchLevel && matchLocFilter;
    })
    .sort((a, b) => {
      if (sort === "Salary: High to low") return extractRate(b.rate) - extractRate(a.rate);
      if (sort === "Salary: Low to high") return extractRate(a.rate) - extractRate(b.rate);
      return 0; // "Most recent" — API already returns newest first
    }), [tabListings, keyword, location, contract, level, locationFilter, sort]);

  function resetFilters() {
    setContract([]);
    setLevel([]);
    setLocationFilter([]);
  }

  function handleTabChange(t: Tab) {
    setTab(t);
    setSelected(null);
    setView("listing");
    resetFilters();
    if (jobId) navigate("/jobs-trainings", { replace: true });
  }

  function handleSelect(item: Listing) {
    setSelected(item);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleApply() {
    if (isAuthenticated) {
      setView("apply");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowAuth(true);
    }
  }

  function goToAuth(path: "/sign-in" | "/sign-up") {
    navigate(path, { state: { from: routerLocation.pathname } });
  }

  // ── Apply page ──────────────────────────────────────────────
  if (view === "apply" && selected) {
    return (
      <ApplicationForm item={selected} onBack={() => setView("detail")}
        onSubmitted={() => { setView("listing"); setSelected(null); }} />
    );
  }

  return (
    <>
      <Hero tab={tab} onTabChange={handleTabChange}
        keyword={keyword} location={location}
        onKeyword={setKeyword} onLocation={setLocation}
        onSearch={() => { setView("listing"); setSelected(null); }} />

      {showAuth && selected && (
        <AuthModal item={selected} onClose={() => setShowAuth(false)}
          onLogin={() => goToAuth("/sign-in")} onSignUp={() => goToAuth("/sign-up")} />
      )}

      {/* ── MAIN BODY ── */}
      <div className="bg-white" style={{ paddingTop: 40, paddingBottom: 100 }}>
        <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <p className="text-sm" style={{ color: MUTED }}>
              <strong style={{ color: NAVY }}>{filtered.length}</strong>{" "}
              {tab === "jobs" ? "roles" : "courses"} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: MUTED }}>Sort:</span>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="text-sm border outline-none px-3 py-1.5 rounded-lg bg-white appearance-none"
                style={{ borderColor: "#DDD9D4", color: TEXT }}>
                {["Most recent", "Salary: High to low", "Salary: Low to high"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-20 text-sm" style={{ color: MUTED }}>Loading listings…</p>
          ) : loadError ? (
            <p role="alert" className="text-center py-20 text-sm" style={{ color: CORAL }}>{loadError}</p>
          ) : view === "detail" && selected ? (
            <div className="grid lg:grid-cols-[280px_1fr_260px] gap-6 items-start">
              {/* Left: compact list */}
              <div className="hidden lg:flex flex-col gap-3">
                {filtered.map(item => (
                  <div key={item.id} onClick={() => handleSelect(item)}
                    className="bg-white p-4 rounded-2xl cursor-pointer transition-all"
                    style={{
                      border: selected.id === item.id ? `2px solid ${NAVY}` : "1.5px solid #EBEBF5",
                      boxShadow: selected.id === item.id ? `0 0 0 3px rgba(13,13,91,0.07)` : "none",
                    }}>
                    <div className="flex items-start gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0"
                        style={{ background: item.type === "jobs" ? NAVY : TEAL }}>
                        {item.type === "jobs" ? "A" : "T"}
                      </div>
                      <div>
                        <p className="font-semibold text-xs leading-tight" style={{ color: NAVY }}>{item.title}</p>
                        <p className="text-xs" style={{ color: MUTED }}>{item.org}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.slice(0, 2).map(t => <Tag key={t} label={t} />)}
                    </div>
                    <p className="text-xs line-clamp-2 mb-2" style={{ color: CHARCOAL }}>{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs" style={{ color: NAVY }}>{item.rate}</p>
                      <span className="text-xs" style={{ color: MUTED }}>{item.posted}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Centre: detail */}
              <div className="bg-white p-8 rounded-2xl" style={{ border: "1.5px solid #EBEBF5" }}>
                {/* Back on mobile */}
                <button className="lg:hidden flex items-center gap-2 text-sm font-medium mb-6" style={{ color: MUTED }}
                  onClick={() => { setView("listing"); setSelected(null); }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  All {tab === "jobs" ? "jobs" : "courses"}
                </button>
                <DetailPanel item={selected} onApply={handleApply} />
              </div>

              {/* Right: org + apply */}
              <div>
                <OrgPanel item={selected} onApply={handleApply} />
              </div>
            </div>
          ) : (
            /* Listing grid */
            <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-start">
              <FilterSidebar tab={tab} contracts={contracts} levels={levels} locations={locations} contract={contract} setContract={setContract} level={level} setLevel={setLevel} locationFilter={locationFilter} setLocationFilter={setLocationFilter} />
              <div>
                {filtered.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="font-semibold mb-2" style={{ color: NAVY }}>No results found</p>
                    <p className="text-sm mb-4" style={{ color: MUTED }}>Try adjusting your filters or search term.</p>
                    <button className="text-sm font-semibold underline" style={{ color: CORAL }}
                      onClick={() => { setKeyword(""); setLocation(""); resetFilters(); }}>
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {filtered.map(item => (
                      <ListingCard key={item.id} item={item} selected={selected?.id === item.id}
                        onSelect={() => handleSelect(item)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      <Newsletter />
    </>
  );
}

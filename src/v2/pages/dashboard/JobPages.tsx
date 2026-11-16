import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"
import { CERT_LEVELS, MAX_CV_BYTES, readAsDataUrl } from "../../constants/application"
import { errorMessage, submitApplication } from "../../services"
import type { DashboardJob as Job } from "../../models/dashboard"
import { DataCard, EmptyState, Icon, PageHeader, SettingsField, SkeletonRows } from "./ui"

export type JobLayout = "grid" | "table"
type JobTypeFilter = "All" | "Work" | "Training"

const twoLines = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
}

const fieldClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"

function TypePill({ type }: { type: Job["type"] }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
        type === "Work" ? "bg-blue-50 text-blue-700" : "bg-violet-50 text-violet-700"
      }`}
    >
      {type}
    </span>
  )
}

/* ─── THREE-DOT ROW MENU ─────────────────────────────────────── */
type MenuItem = { label: string; icon: string; onSelect: () => void; disabled?: boolean }

const MENU_WIDTH = 188

// The menu is portalled and fixed-positioned so the table's horizontal scroll container cannot clip it.
function RowMenu({ label, items }: { label: string; items: MenuItem[] }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  function toggle(event: { stopPropagation: () => void }) {
    event.stopPropagation()
    if (open) {
      setOpen(false)
      return
    }
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const left = Math.min(Math.max(8, rect.right - MENU_WIDTH), window.innerWidth - MENU_WIDTH - 8)
    const flipUp = rect.bottom + 8 + items.length * 44 > window.innerHeight
    setPos({ top: flipUp ? rect.top - 8 - items.length * 44 : rect.bottom + 6, left })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("scroll", close, true)
    window.addEventListener("resize", close)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("scroll", close, true)
      window.removeEventListener("resize", close)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`grid h-9 w-9 place-items-center rounded-lg transition hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 ${
          open ? "bg-slate-100 text-blue-700" : "text-slate-500"
        }`}
      >
        <Icon name="dots" />
      </button>
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[90]"
            onClick={(event) => {
              event.stopPropagation()
              setOpen(false)
            }}
          >
            <div
              role="menu"
              style={{ top: pos.top, left: pos.left, width: MENU_WIDTH }}
              className="dashboard-fade absolute rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
              onClick={(event) => event.stopPropagation()}
            >
              {items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    setOpen(false)
                    item.onSelect()
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-600"
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

/* ─── JOBS & TRAINING LIST ───────────────────────────────────── */
export function JobsList({
  jobs,
  loading,
  search,
  setSearch,
  type,
  setType,
  layout,
  setLayout,
  appliedTitles,
  onOpen,
  onApply,
}: {
  jobs: Job[]
  loading: boolean
  search: string
  setSearch: (value: string) => void
  type: JobTypeFilter
  setType: (value: JobTypeFilter) => void
  layout: JobLayout
  setLayout: (value: JobLayout) => void
  appliedTitles: Set<string>
  onOpen: (job: Job) => void
  onApply: (job: Job) => void
}) {
  const menuFor = (job: Job): MenuItem[] => [
    { label: "View details", icon: "eye", onSelect: () => onOpen(job) },
    {
      label: appliedTitles.has(job.title) ? "Already applied" : "Apply now",
      icon: "file",
      onSelect: () => onApply(job),
      disabled: appliedTitles.has(job.title),
    },
  ]

  return (
    <div className="dashboard-fade">
      <PageHeader
        eyebrow="Opportunities"
        title="Jobs & training"
        description="Discover roles and accredited learning opportunities selected for AOSL members."
      />
      <DataCard>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search opportunities"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="flex rounded-xl bg-slate-100 p-1">
            {(["All", "Work", "Training"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                className={`flex-1 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  type === option
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl bg-slate-100 p-1" role="group" aria-label="Layout">
            {(
              [
                { id: "grid", icon: "gridView", label: "Grid view" },
                { id: "table", icon: "tableView", label: "Table view" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setLayout(option.id)}
                aria-pressed={layout === option.id}
                aria-label={option.label}
                title={option.label}
                className={`grid h-9 w-10 place-items-center rounded-lg transition ${
                  layout === option.id
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon name={option.icon} className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {layout === "grid" ? (
          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {loading
              ? [0, 1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="dashboard-skeleton h-56 rounded-2xl" />
                ))
              : jobs.map((job) => (
                  <div
                    key={job.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onOpen(job)}
                    onKeyDown={(event: KeyboardEvent) => {
                      if (event.key === "Enter") onOpen(job)
                    }}
                    className="group flex cursor-pointer flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <TypePill type={job.type} />
                      <div className="-mr-2 -mt-1">
                        <RowMenu label={`Actions for ${job.title}`} items={menuFor(job)} />
                      </div>
                    </div>
                    <h3 className="mt-4 font-bold leading-snug text-slate-900">{job.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">{job.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-500" style={twoLines}>
                      {job.description || "More details are available on the opportunity page."}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-sm font-bold text-[#0D0D5B]">{job.salary}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                          <Icon name="pin" className="h-3 w-3" /> {job.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Open
                        </span>
                        <p className="mt-0.5 text-xs text-slate-400">{job.posted}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3">Opportunity</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Posted</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <SkeletonRows />
                ) : (
                  jobs.map((job) => (
                    <tr
                      key={job.id}
                      onClick={() => onOpen(job)}
                      className="group cursor-pointer border-t border-slate-100 transition hover:bg-blue-50/30"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">{job.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{job.company}</p>
                      </td>
                      <td className="px-5 py-4">
                        <TypePill type={job.type} />
                      </td>
                      <td className="px-5 py-4 text-slate-600">{job.location}</td>
                      <td className="px-5 py-4 text-slate-500">{job.posted}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Open
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <RowMenu label={`Actions for ${job.title}`} items={menuFor(job)} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <EmptyState
            title="No opportunities found"
            description="Try a different keyword or remove your current filter."
            action="Clear filters"
            onAction={() => {
              setSearch("")
              setType("All")
            }}
          />
        )}
      </DataCard>
    </div>
  )
}

/* ─── DETAILS PAGE ───────────────────────────────────────────── */
function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
    >
      <Icon name="back" className="h-4 w-4" />
      {label}
    </button>
  )
}

export function JobDetail({
  job,
  applied,
  onBack,
  onApply,
  onViewApplications,
}: {
  job: Job
  applied: boolean
  onBack: () => void
  onApply: () => void
  onViewApplications: () => void
}) {
  const isTraining = job.type === "Training"
  const facts: [string, string][] = [
    ["Type", job.type],
    ["Reference", job.id.slice(-8).toUpperCase()],
    ["Location", job.location],
    [isTraining ? "Course fee" : "Compensation", job.salary],
    ...(job.contract ? ([["Contract", job.contract]] as [string, string][]) : []),
    ...(job.duration ? ([["Duration", job.duration]] as [string, string][]) : []),
    ["Posted", job.posted],
  ]

  return (
    <div className="dashboard-fade">
      <BackLink label="Back to jobs & training" onClick={onBack} />
      <div className="mb-7">
        <div className="flex flex-wrap items-center gap-2">
          <TypePill type={job.type} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0D0D5B] sm:text-3xl">
          {job.title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{job.company}</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <DataCard>
          <div className="space-y-8 p-5 sm:p-7">
            <section>
              <h2 className="font-bold text-slate-900">
                {isTraining ? "About this course" : "About this role"}
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {job.description || "Full details will be shared with you during the application process."}
              </p>
            </section>
            {job.requirements.length > 0 && (
              <section>
                <h2 className="font-bold text-slate-900">
                  {isTraining ? "What you'll need" : "Requirements"}
                </h2>
                <ul className="mt-3 space-y-3">
                  {job.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </DataCard>

        <div className="lg:sticky lg:top-28">
          <DataCard>
            <div className="p-5 sm:p-6">
              <h2 className="font-bold text-slate-900">Summary</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {facts.map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-3">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</dt>
                    <dd className="mt-1 text-sm font-bold text-slate-700">{value}</dd>
                  </div>
                ))}
              </dl>
              {applied ? (
                <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-center">
                  <p className="text-sm font-bold text-emerald-800">You've applied for this opportunity</p>
                  <button
                    type="button"
                    onClick={onViewApplications}
                    className="mt-2 text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
                  >
                    Track your application
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onApply}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  {isTraining ? "Apply for this course" : "Apply now"}
                </button>
              )}
            </div>
          </DataCard>
        </div>
      </div>
    </div>
  )
}

/* ─── APPLICATION FORM (inside the dashboard) ────────────────── */
export function JobApply({
  job,
  onBack,
  onSubmitted,
}: {
  job: Job
  onBack: () => void
  onSubmitted: () => void
}) {
  const { user } = useAuth()
  const { showError } = useToast()
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    state: "",
    nationality: "",
    certLevel: "",
    experienceYears: "",
    experience: "",
    statement: "",
  })
  const [cvName, setCvName] = useState("")
  const [cvData, setCvData] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }))

  async function pickCv(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (file.type !== "application/pdf") {
      showError("Please upload your CV as a PDF.")
      return
    }
    if (file.size > MAX_CV_BYTES) {
      showError("Your CV must be 5 MB or smaller.")
      return
    }
    try {
      setCvData(await readAsDataUrl(file))
      setCvName(file.name)
    } catch (err) {
      showError(errorMessage(err))
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
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
        role: job.title,
        biography: form.statement.trim() || undefined,
        skills: form.experience.trim() || undefined,
        resume: cvData || undefined,
        job: job.id,
        createdBy: user?.id,
      })
      onSubmitted()
    } catch (err) {
      showError(errorMessage(err, "We couldn't submit your application."))
    } finally {
      setSubmitting(false)
    }
  }

  const isTraining = job.type === "Training"

  return (
    <div className="dashboard-fade">
      <BackLink label="Back to details" onClick={onBack} />
      <PageHeader
        eyebrow={isTraining ? "Course application" : "Job application"}
        title={`Apply for ${job.title}`}
        description={`${job.company} · ${job.salary}`}
      />
      <form onSubmit={submit} className="max-w-3xl">
        <DataCard>
          <div className="divide-y divide-slate-100">
            <section className="space-y-5 p-5 sm:p-7">
              <h2 className="font-bold text-slate-900">Personal details</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <SettingsField label="First name" value={form.firstName} onChange={set("firstName")} required />
                <SettingsField label="Last name" value={form.lastName} onChange={set("lastName")} required />
                <SettingsField label="Email address" type="email" value={form.email} onChange={set("email")} required />
                <SettingsField label="Phone number" type="tel" value={form.phone} onChange={set("phone")} required />
              </div>
              <SettingsField label="Home address" value={form.address} onChange={set("address")} placeholder="Street, city, postcode" />
              <div className="grid gap-5 sm:grid-cols-2">
                <SettingsField label="County / state" value={form.state} onChange={set("state")} placeholder="Greater London" required />
                <SettingsField label="Nationality" value={form.nationality} onChange={set("nationality")} placeholder="British" required />
              </div>
            </section>

            <section className="space-y-5 p-5 sm:p-7">
              <h2 className="font-bold text-slate-900">{isTraining ? "Background" : "Experience & CV"}</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Highest qualification<span className="text-red-500"> *</span>
                  </span>
                  <select
                    required
                    value={form.certLevel}
                    onChange={(event) => set("certLevel")(event.target.value)}
                    className={`${fieldClass} appearance-none ${form.certLevel ? "" : "text-slate-400"}`}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {CERT_LEVELS.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Years of experience<span className="text-red-500"> *</span>
                  </span>
                  <input
                    required
                    type="number"
                    min={0}
                    max={60}
                    placeholder="0"
                    value={form.experienceYears}
                    onChange={(event) => set("experienceYears")(event.target.value)}
                    className={fieldClass}
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  {isTraining ? "Reason for attending" : "Relevant experience"}
                  <span className="text-red-500"> *</span>
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.experience}
                  onChange={(event) => set("experience")(event.target.value)}
                  placeholder={
                    isTraining
                      ? "Tell us about your role and why this course is relevant to your work…"
                      : "Describe your care experience, qualifications and any relevant roles…"
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 transition hover:border-blue-400 hover:bg-blue-50">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500">
                  <Icon name="upload" />
                </span>
                <span>
                  <span className="block font-bold text-slate-700">{cvName || "Upload CV"}</span>
                  <span className="mt-1 block text-xs">PDF only, up to 5 MB</span>
                </span>
                <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={pickCv} />
              </label>
            </section>

            <section className="space-y-5 p-5 sm:p-7">
              <h2 className="font-bold text-slate-900">{isTraining ? "Additional information" : "Supporting statement"}</h2>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  {isTraining ? "Notes" : "Why are you a good fit?"}
                  {!isTraining && <span className="text-red-500"> *</span>}
                </span>
                <textarea
                  required={!isTraining}
                  rows={6}
                  value={form.statement}
                  onChange={(event) => set("statement")(event.target.value)}
                  placeholder={
                    isTraining
                      ? "Optional — any accessibility requirements or additional context…"
                      : "Tell us why you want this role and what you'd bring to the AOSL team…"
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600" />
                <span className="text-xs leading-5 text-slate-500">
                  I confirm that the information provided is accurate and I consent to AOSL processing my data
                  in line with its Privacy Policy.
                </span>
              </label>
            </section>
          </div>
        </DataCard>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex min-w-[200px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-70"
          >
            {submitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {submitting ? "Submitting…" : isTraining ? "Submit course application" : "Submit application"}
          </button>
        </div>
      </form>
    </div>
  )
}

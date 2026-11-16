import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { RefObject } from "react"
import { useNavigate } from "react-router-dom"
import { JobApply, JobDetail, JobsList, type JobLayout } from "./JobPages"
import SupportChat from "./SupportChat"
import { ChatProvider, useChat } from "../../context/ChatContext"
import { DataCard, Icon, PageHeader, SettingsField, SkeletonRows } from "./ui"
import Logo from "../../components/layout/Logo"
import { useAuth } from "../../context/AuthContext"
import { errorMessage, fetchMyApplications, fetchMyOrders, fetchPublicJobs, updateProfile } from "../../services"
import {
  toApplicationRow,
  toDashboardJob,
  toOrderRow,
  type ApplicationRow,
  type DashboardJob as Job,
  type OrderRow,
} from "../../models/dashboard"

type DashboardView = "overview" | "jobs" | "job-detail" | "job-apply" | "applications" | "orders" | "chat" | "settings"
type SettingsTab = "profile" | "security" | "activity"
type NotificationDrawer = {
  type: "notifications"
}
type DrawerState = NotificationDrawer | null

type NavigationItem = {
  id: DashboardView
  label: string
  icon: string
}

type SettingsTabItem = {
  id: SettingsTab
  label: string
  icon: string
}

type DashboardData = {
  applications: ApplicationRow[]
  orders: OrderRow[]
}

const DashboardDataContext = createContext<DashboardData>({ applications: [], orders: [] })
const useDashboardData = () => useContext(DashboardDataContext)

const PASSWORD_RULE = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

function DashboardLogo() {
  return <Logo height={34} />
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Accepted" || status === "Paid" || status === "Completed"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
      : status === "In review"
        ? "bg-amber-50 text-amber-700 ring-amber-600/10"
        : "bg-blue-50 text-blue-700 ring-blue-600/10"
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${styles}`}
    >
      {status}
    </span>
  )
}

// The chat connection lives above the dashboard so unread counts keep updating on every screen.
export default function DashboardPage() {
  return (
    <ChatProvider>
      <DashboardShell />
    </ChatProvider>
  )
}

function DashboardShell() {
  const { unread: chatUnread } = useChat()
  const { user, signOut, updateUser } = useAuth()
  const routerNavigate = useNavigate()
  const [view, setView] = useState<DashboardView>("overview")
  const [settingsTab, setSettingsTab] = useState<SettingsTab>("profile")
  const [drawer, setDrawer] = useState<DrawerState>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [jobType, setJobType] = useState<"All" | "Work" | "Training">("All")
  const [jobLayout, setJobLayout] = useState<JobLayout>("grid")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [toast, setToast] = useState("")
  const [profileImage, setProfileImage] = useState(user?.profileImage || "")
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName || "")
  const [lastName, setLastName] = useState(user?.lastName || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<ApplicationRow[]>([])
  const [orders, setOrders] = useState<OrderRow[]>([])
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Member"
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase() || "M"
  const fileInputRef = useRef<HTMLInputElement>(null)

  const appliedTitles = useMemo(() => new Set(applications.map((a) => a.role)), [applications])

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase()
    return jobs.filter(
      (job) =>
        (jobType === "All" || job.type === jobType) &&
        (!query ||
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)),
    )
  }, [jobs, jobType, search])

  useEffect(() => {
    if (!user?.id) return
    let active = true
    setLoading(true)
    Promise.allSettled([
      fetchPublicJobs(),
      fetchMyApplications(user.id),
      fetchMyOrders(user.id),
    ]).then(([jobsRes, appsRes, ordersRes]) => {
      if (!active) return
      if (jobsRes.status === "fulfilled") setJobs((jobsRes.value.data.payload || []).map(toDashboardJob))
      if (appsRes.status === "fulfilled") setApplications((appsRes.value.data.payload || []).map(toApplicationRow))
      if (ordersRes.status === "fulfilled") setOrders((ordersRes.value.data.payload || []).map(toOrderRow))
      if ([jobsRes, appsRes, ordersRes].some((r) => r.status === "rejected")) {
        setToast("Some of your information could not be loaded.")
      }
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [user?.id])

  async function refreshApplications() {
    if (!user?.id) return
    try {
      const res = await fetchMyApplications(user.id)
      setApplications((res.data.payload || []).map(toApplicationRow))
    } catch {
      // The list refreshes on the next visit; a failed refresh should not block the user.
    }
  }

  function openJob(job: Job, nextView: "job-detail" | "job-apply" = "job-detail") {
    setSelectedJob(job)
    navigate(nextView)
  }

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(""), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  function navigate(nextView: DashboardView) {
    setView(nextView)
    setMobileNavOpen(false)
    setProfileOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function handleProfileImage(file?: File) {
    if (!file) return
    if (!/^image\/(png|jpe?g)$/.test(file.type)) {
      setToast("Choose a JPG or PNG image.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast("Your photo must be 5 MB or smaller.")
      return
    }
    setUploadingPhoto(true)
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(new Error("Could not read the selected file."))
        reader.readAsDataURL(file)
      })
      // The API uploads the image and returns the hosted URL.
      const res = await updateProfile({ profileImage: dataUrl })
      const hosted = res.data.payload?.profileImage || ""
      setProfileImage(hosted)
      updateUser({ profileImage: hosted })
      setToast("Profile photo updated.")
    } catch (err) {
      setToast(errorMessage(err, "We couldn't upload your photo."))
    } finally {
      setUploadingPhoto(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const activeNav: DashboardView = view === "job-detail" || view === "job-apply" ? "jobs" : view

  const navItems: NavigationItem[] = [
    { id: "overview", label: "Overview", icon: "grid" },
    { id: "jobs", label: "Jobs & Training", icon: "briefcase" },
    { id: "applications", label: "Applications", icon: "file" },
    { id: "orders", label: "Orders & Payments", icon: "receipt" },
    { id: "chat", label: "Support chat", icon: "chat" },
    { id: "settings", label: "Account Settings", icon: "settings" },
  ]

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center justify-between px-6">
        <DashboardLogo />
        <button
          type="button"
          onClick={() => setMobileNavOpen(false)}
          className="grid w-9 h-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Close navigation"
        >
          <Icon name="close" />
        </button>
      </div>
      <nav
        className="flex-1 space-y-1.5 px-3 py-6"
        aria-label="Dashboard navigation"
      >
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
          Workspace
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(item.id)}
            className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition ${
              activeNav === item.id
                ? "bg-[#0D0D5B] text-white shadow-lg shadow-blue-950/15"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-800"
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.id === "chat" && chatUnread > 0 && (
              <span className="rounded-full bg-cyan-400 px-1.5 text-[10px] font-bold text-slate-950">{chatUnread > 99 ? "99+" : chatUnread}</span>
            )}
            {activeNav === item.id && !(item.id === "chat" && chatUnread > 0) && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
            )}
          </button>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          onClick={() => setLogoutOpen(true)}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-700"
        >
          <Icon name="logout" />
          Log out
        </button>
      </div>
    </div>
  )

  return (
    <DashboardDataContext.Provider value={{ applications, orders }}>
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200/80 bg-white lg:block">
        {sidebar}
      </aside>
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
            aria-label="Close navigation"
          />
          <aside className="dashboard-slide-left relative h-full w-[min(84vw,320px)] bg-white shadow-2xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="mr-3 grid w-10 h-10 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
            aria-label="Open navigation"
          >
            <Icon name="menu" />
          </button>
          <div className="relative hidden w-full max-w-md md:block">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 w-4 h-4 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") navigate("jobs")
              }}
              placeholder="Search jobs, training or applications"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setDrawer({ type: "notifications" })}
              className="relative grid w-10 h-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"
              aria-label="Open notifications"
            >
              <Icon name="bell" />
              {applications.length > 0 && (
                <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
              )}
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((current) => !current)}
                className="flex items-center gap-3 rounded-xl p-1.5 pr-2 text-left transition hover:bg-slate-100"
                aria-expanded={profileOpen}
              >
                <span className="grid w-9 h-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-bold text-slate-800">
                    {fullName}
                  </span>
                  <span className="block text-xs text-slate-400">Member</span>
                </span>
              </button>
              {profileOpen && (
                <div className="dashboard-fade absolute right-0 top-14 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
                  <button
                    type="button"
                    onClick={() => navigate("settings")}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <Icon name="user" className="w-4 h-4" /> Account settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false)
                      setLogoutOpen(true)
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Icon name="logout" className="w-4 h-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-9">
          {view === "overview" && (
            <Overview
              loading={loading}
              onNavigate={navigate}
              onOpenNotifications={() => setDrawer({ type: "notifications" })}
              firstName={user?.firstName || ""}
            />
          )}
          {view === "jobs" && (
            <JobsList
              jobs={filteredJobs}
              loading={loading}
              search={search}
              setSearch={setSearch}
              type={jobType}
              setType={setJobType}
              layout={jobLayout}
              setLayout={setJobLayout}
              appliedTitles={appliedTitles}
              onOpen={(job) => openJob(job)}
              onApply={(job) => openJob(job, "job-apply")}
            />
          )}
          {view === "job-detail" && selectedJob && (
            <JobDetail
              job={selectedJob}
              applied={appliedTitles.has(selectedJob.title)}
              onBack={() => navigate("jobs")}
              onApply={() => navigate("job-apply")}
              onViewApplications={() => navigate("applications")}
            />
          )}
          {view === "job-apply" && selectedJob && (
            <JobApply
              job={selectedJob}
              onBack={() => navigate("job-detail")}
              onSubmitted={() => {
                void refreshApplications()
                setToast("Application submitted successfully.")
                navigate("applications")
              }}
            />
          )}
          {view === "applications" && (
            <Applications loading={loading} onBrowse={() => navigate("jobs")} />
          )}
          {view === "orders" && <Orders loading={loading} />}
          {view === "chat" && <SupportChat />}
          {view === "settings" && (
            <Settings
              tab={settingsTab}
              setTab={setSettingsTab}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phone={phone}
              setPhone={setPhone}
              profileImage={profileImage}
              fileInputRef={fileInputRef}
              onFile={handleProfileImage}
              uploadingPhoto={uploadingPhoto}
              onToast={setToast}
            />
          )}
        </main>
      </div>

      {drawer && (
        <DashboardDrawer
          onClose={() => setDrawer(null)}
        />
      )}

      {logoutOpen && (
        <LogoutModal
          onClose={() => setLogoutOpen(false)}
          onConfirm={() => {
            signOut()
            routerNavigate("/sign-in")
          }}
        />
      )}

      {toast && (
        <div
          role="status"
          className="dashboard-toast fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl"
        >
          <span className="grid w-7 h-7 place-items-center rounded-full bg-emerald-500">
            <Icon name="check" className="w-4 h-4" />
          </span>
          {toast}
        </div>
      )}
    </div>
    </DashboardDataContext.Provider>
  )
}

function Overview({
  loading,
  onNavigate,
  onOpenNotifications,
  firstName,
}: {
  loading: boolean
  onNavigate: (view: DashboardView) => void
  onOpenNotifications: () => void
  firstName: string
}) {
  const { applications, orders } = useDashboardData()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
  const inReview = applications.filter((a) => a.status === "Submitted" || a.status === "In review").length
  const accepted = applications.filter((a) => a.status === "Accepted").length
  const totalSpend = orders.reduce((sum, o) => sum + o.amountValue, 0)
  const stats = [
    {
      label: "Active applications",
      value: String(inReview),
      detail: `${applications.length} in total`,
      icon: "file",
      color: "bg-blue-600",
    },
    {
      label: "Accepted",
      value: String(accepted),
      detail: accepted === 1 ? "1 offer or enrolment" : `${accepted} offers or enrolments`,
      icon: "check",
      color: "bg-emerald-500",
    },
    {
      label: "Total orders",
      value: String(orders.length),
      detail: `£${totalSpend.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total spend`,
      icon: "receipt",
      color: "bg-violet-500",
    },
  ]
  return (
    <div className="dashboard-fade">
      <PageHeader
        eyebrow="Member dashboard"
        title={`${greeting}${firstName ? `, ${firstName}` : ""}`}
        description="Here’s what’s happening with your applications and services."
        action={
          <button
            type="button"
            onClick={() => onNavigate("jobs")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Browse opportunities <Icon name="arrow" className="w-4 h-4" />
          </button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
          >
            <div className="flex items-start justify-between">
              <div
                className={`grid w-11 h-11 place-items-center rounded-xl text-white ${stat.color}`}
              >
                <Icon name={stat.icon} />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                <Icon name="trend" className="w-3 h-3" /> Current
              </span>
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500">
              {stat.label}
            </p>
            <div className="mt-1 flex items-end justify-between">
              <p className="text-3xl font-extrabold tracking-tight text-[#0D0D5B]">
                {stat.value}
              </p>
              <p className="text-xs text-slate-400">{stat.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.7fr)]">
        <DataCard>
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-slate-900">Recent orders</h2>
              <p className="mt-1 text-xs text-slate-400">
                Your latest service and training purchases
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("orders")}
              className="text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Item</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <SkeletonRows columns={4} />
                ) : (
                  orders.slice(0, 3).map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-slate-100 transition hover:bg-blue-50/30"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-800">{order.id}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {order.date}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{order.item}</td>
                      <td className="px-5 py-4 font-bold text-slate-800">
                        {order.amount}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </DataCard>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D0D5B] to-blue-700 p-6 text-white shadow-xl shadow-blue-950/15">
            <span className="grid w-10 h-10 place-items-center rounded-xl bg-white/10">
              <Icon name="briefcase" />
            </span>
            <h2 className="mt-5 text-xl font-bold">New opportunities weekly</h2>
            <p className="mt-2 text-sm leading-6 text-blue-100/75">
              Find care roles and accredited training tailored to your goals.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("jobs")}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white"
            >
              Explore now <Icon name="arrow" className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onOpenNotifications}
            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <span className="grid w-10 h-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
              <Icon name="bell" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-slate-800">
                {applications.length === 1 ? "1 application" : `${applications.length} applications`}
              </span>
              <span className="mt-1 block text-xs text-slate-400">
                View application activity
              </span>
            </span>
            <Icon name="chevron" className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Applications({
  loading,
  onBrowse,
}: {
  loading: boolean
  onBrowse: () => void
}) {
  const { applications } = useDashboardData()
  return (
    <div className="dashboard-fade">
      <PageHeader
        eyebrow="Your progress"
        title="Applications"
        description="Track every application and see what happens next."
        action={
          <button
            type="button"
            onClick={onBrowse}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          >
            Find opportunities
          </button>
        }
      />
      <DataCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Application</th>
                <th className="px-5 py-3">Role / course</th>
                <th className="px-5 py-3">Submitted</th>
                <th className="px-5 py-3">Current stage</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows />
              ) : (
                applications.map((application) => (
                  <tr
                    key={application.code}
                    className="border-t border-slate-100 hover:bg-blue-50/30"
                  >
                    <td className="px-5 py-5 font-bold text-slate-800">
                      {application.code}
                    </td>
                    <td className="px-5 py-5 text-slate-700">
                      {application.role}
                    </td>
                    <td className="px-5 py-5 text-slate-500">
                      {application.submitted}
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-slate-600">
                          {application.stage}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <StatusBadge status={application.status} />
                    </td>
                    <td className="px-5 py-5 text-right">
                      <button
                        type="button"
                        className="grid w-9 h-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Icon name="more" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </DataCard>
    </div>
  )
}

function Orders({ loading }: { loading: boolean }) {
  const { orders } = useDashboardData()
  return (
    <div className="dashboard-fade">
      <PageHeader
        eyebrow="Billing history"
        title="Orders & payments"
        description="Review transactions, payment status and download receipts."
      />
      <DataCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Item</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows columns={7} />
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-slate-100 hover:bg-blue-50/30"
                  >
                    <td className="px-5 py-5 font-bold text-slate-800">
                      {order.id}
                    </td>
                    <td className="px-5 py-5 text-slate-700">{order.item}</td>
                    <td className="px-5 py-5 text-slate-500">{order.type}</td>
                    <td className="px-5 py-5 text-slate-500">{order.date}</td>
                    <td className="px-5 py-5 font-bold text-slate-800">
                      {order.amount}
                    </td>
                    <td className="px-5 py-5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-5 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50"
                      >
                        <Icon name="download" className="w-4 h-4" /> PDF
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </DataCard>
    </div>
  )
}

function Settings({
  tab,
  setTab,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  profileImage,
  fileInputRef,
  onFile,
  uploadingPhoto,
  onToast,
}: {
  tab: SettingsTab
  setTab: (tab: SettingsTab) => void
  firstName: string
  setFirstName: (value: string) => void
  lastName: string
  setLastName: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  profileImage: string
  fileInputRef: RefObject<HTMLInputElement>
  onFile: (file?: File) => void
  uploadingPhoto: boolean
  onToast: (message: string) => void
}) {
  const { user, updateUser } = useAuth()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saving, setSaving] = useState(false)

  async function saveProfile() {
    setSaving(true)
    try {
      const changes: Parameters<typeof updateProfile>[0] = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
      }
      const res = await updateProfile(changes)
      const saved = res.data.payload
      updateUser({ ...changes, ...(saved?.profileImage ? { profileImage: saved.profileImage } : {}) })
      onToast("Profile changes saved.")
    } catch (err) {
      onToast(errorMessage(err, "We couldn't save your changes."))
    } finally {
      setSaving(false)
    }
  }

  async function savePassword() {
    if (!PASSWORD_RULE.test(newPassword)) {
      onToast("Use at least 8 characters with an uppercase letter, number and symbol.")
      return
    }
    if (newPassword !== confirmPassword) {
      onToast("Enter two matching passwords.")
      return
    }
    setSaving(true)
    try {
      await updateProfile({ password: newPassword })
      onToast("Password updated securely.")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      onToast(errorMessage(err, "We couldn't update your password."))
    } finally {
      setSaving(false)
    }
  }

  const tabs: SettingsTabItem[] = [
    { id: "profile", label: "Profile", icon: "user" },
    { id: "security", label: "Security", icon: "shield" },
    { id: "activity", label: "Activity log", icon: "clock" },
  ]
  return (
    <div className="dashboard-fade">
      <PageHeader
        eyebrow="Your account"
        title="Account settings"
        description="Manage your profile, password and account activity."
      />
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              tab === item.id
                ? "bg-[#0D0D5B] text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Icon name={item.icon} className="w-4 h-4" /> {item.label}
          </button>
        ))}
      </div>
      {tab === "profile" && (
        <DataCard>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              void saveProfile()
            }}
            className="p-5 sm:p-7"
          >
            <div className="flex flex-col gap-5 border-b border-slate-100 pb-7 sm:flex-row sm:items-center">
              <span className="grid w-20 h-20 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-blue-600/15">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "M"
                )}
              </span>
              <div>
                <p className="font-bold text-slate-900">Profile photo</p>
                <p className="mt-1 text-xs text-slate-500">
                  JPG or PNG. Maximum size 5 MB.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={(event) => onFile(event.target.files?.[0])}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-60"
                >
                  <Icon name="upload" className="w-4 h-4" /> {uploadingPhoto ? "Uploading…" : "Upload new photo"}
                </button>
              </div>
            </div>
            <div className="grid gap-5 pt-7 sm:grid-cols-2">
              <SettingsField
                label="First name"
                value={firstName}
                onChange={setFirstName}
              />
              <SettingsField
                label="Last name"
                value={lastName}
                onChange={setLastName}
              />
              <SettingsField
                label="Email address"
                value={user?.email || ""}
                type="email"
                disabled
              />
              <SettingsField
                label="Phone number"
                value={phone}
                onChange={setPhone}
              />
            </div>
            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        </DataCard>
      )}
      {tab === "security" && (
        <DataCard>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              void savePassword()
            }}
            className="p-5 sm:p-7"
          >
            <div className="flex items-start gap-4 rounded-2xl bg-blue-50 p-4">
              <span className="grid w-10 h-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white">
                <Icon name="shield" />
              </span>
              <div>
                <p className="text-sm font-bold text-blue-950">
                  Keep your account secure
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-700/70">
                  Use a unique password with at least eight characters, an
                  uppercase letter, number and symbol.
                </p>
              </div>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <SettingsField
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                type="password"
                placeholder="Enter a new password"
              />
              <SettingsField
                label="Confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                type="password"
                placeholder="Repeat the new password"
              />
            </div>
            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Updating…" : "Update password"}
              </button>
            </div>
          </form>
        </DataCard>
      )}
      {tab === "activity" && (
        <DataCard>
          <div className="px-6 py-16 text-center">
            <p className="text-base font-bold text-slate-900">No activity to show yet</p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Your sign-in and account activity history will appear here.
            </p>
          </div>
        </DataCard>
      )}
    </div>
  )
}

function DashboardDrawer({ onClose }: { onClose: () => void }) {
  const { applications } = useDashboardData()
  const notifications = applications.map((a) => [
    `Application ${a.status.toLowerCase()}`,
    `${a.role} — ${a.stage}.`,
    a.submitted,
  ])
  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        aria-label="Close drawer"
      />
      <aside className="dashboard-slide-right absolute inset-y-0 right-0 w-full max-w-lg overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-100 bg-white/95 px-5 backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Updates</p>
            <h2 className="mt-1 font-bold text-slate-900">Notifications</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {notifications.length === 0 && (
            <p className="p-5 text-sm text-slate-500">No updates yet.</p>
          )}
          {notifications.map(([title, body, time], index) => (
            <button
              key={`${title}-${index}`}
              type="button"
              className="flex w-full gap-4 p-5 text-left transition hover:bg-blue-50/50"
            >
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  index < 2 ? "bg-blue-600" : "bg-slate-300"
                }`}
              />
              <span>
                <span className="block text-sm font-bold text-slate-800">{title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-500">{body}</span>
                <span className="mt-2 block text-xs font-medium text-slate-400">{time}</span>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  )
}

function LogoutModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        className="dashboard-modal w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
      >
        <div className="grid w-12 h-12 place-items-center rounded-2xl bg-red-50 text-red-600">
          <Icon name="logout" className="w-6 h-6" />
        </div>
        <h2
          id="logout-title"
          className="mt-5 text-xl font-extrabold text-slate-900"
        >
          Log out of AOSL?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          You’ll need to enter your email and password to access your dashboard
          again.
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Stay signed in
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  )
}

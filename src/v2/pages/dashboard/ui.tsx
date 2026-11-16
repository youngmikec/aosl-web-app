import type { ReactNode } from "react"

export function Icon({
  name,
  className = "w-5 h-5",
}: {
  name: string
  className?: string
}) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  const paths: Record<string, ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" {...common} />
        <rect x="14" y="3" width="7" height="7" rx="2" {...common} />
        <rect x="3" y="14" width="7" height="7" rx="2" {...common} />
        <rect x="14" y="14" width="7" height="7" rx="2" {...common} />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="3" {...common} />
        <path
          d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"
          {...common}
        />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6V3Z" {...common} />
        <path d="M14 3v5h5M9 13h6M9 17h4" {...common} />
      </>
    ),
    receipt: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" {...common} />
        <path d="M9 8h6M9 12h6M9 16h3" {...common} />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" {...common} />
        <path
          d="M19 13.5v-3l-2-.7a7 7 0 0 0-.8-1.8l.9-2-2.1-2-2 1a7 7 0 0 0-2-.1L10 3H7l-.7 2a7 7 0 0 0-1.8.8l-2-.9-2 2.1 1 2a7 7 0 0 0-.1 2l-1.9 1v3l2 .7a7 7 0 0 0 .8 1.8l-.9 2 2.1 2 2-1a7 7 0 0 0 2 .1l1 1.9h3l.7-2a7 7 0 0 0 1.8-.8l2 .9 2-2.1-1-2a7 7 0 0 0 .1-2l1.9-1Z"
          {...common}
        />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" {...common} />
        <path d="m16.5 16.5 4 4" {...common} />
      </>
    ),
    bell: (
      <>
        <path
          d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
          {...common}
        />
        <path d="M10 21h4" {...common} />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" {...common} />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" {...common} />,
    close: <path d="m6 6 12 12M18 6 6 18" {...common} />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" {...common} />,
    logout: (
      <>
        <path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10" {...common} />
      </>
    ),
    trend: (
      <>
        <path d="m4 16 5-5 4 4 7-8" {...common} />
        <path d="M15 7h5v5" {...common} />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" {...common} />
        <path d="M12 7v5l3 2" {...common} />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" {...common} />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    filter: <path d="M4 6h16M7 12h10M10 18h4" {...common} />,
    upload: (
      <>
        <path d="M12 16V4m-4 4 4-4 4 4M5 15v5h14v-5" {...common} />
      </>
    ),
    shield: (
      <>
        <path
          d="M12 3 4 7v5c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V7l-8-4Z"
          {...common}
        />
        <path d="m9 12 2 2 4-4" {...common} />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" {...common} />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" {...common} />
      </>
    ),
    chat: (
      <>
        <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" {...common} />
        <path d="M8 10h8M8 13h5" {...common} />
      </>
    ),
    dots: (
      <>
        <circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none" />
      </>
    ),
    gridView: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" {...common} />
        <rect x="14" y="3" width="7" height="7" rx="1.5" {...common} />
        <rect x="3" y="14" width="7" height="7" rx="1.5" {...common} />
        <rect x="14" y="14" width="7" height="7" rx="1.5" {...common} />
      </>
    ),
    tableView: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2.5" {...common} />
        <path d="M3 10h18M3 15h18M9 10v10" {...common} />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" {...common} />
        <circle cx="12" cy="12" r="3" {...common} />
      </>
    ),
    back: <path d="M19 12H5m5-5-5 5 5 5" {...common} />,
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" {...common} />
        <circle cx="12" cy="9.5" r="2.5" {...common} />
      </>
    ),
    download: (
      <>
        <path d="M12 4v12m-4-4 4 4 4-4M5 20h14" {...common} />
      </>
    ),
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}


export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#0D0D5B] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  )
}


export function DataCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/5">
      {children}
    </div>
  )
}


export function SettingsField({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder,
  required = false,
}: {
  label: string
  value: string
  onChange?: (value: string) => void
  type?: string
  disabled?: boolean
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-400"
      />
    </label>
  )
}


export function SkeletonRows({ columns = 6 }: { columns?: number }) {
  return (
    <>
      {[1, 2, 3, 4].map((row) => (
        <tr key={row} className="border-t border-slate-100">
          {Array.from({ length: columns }, (_, column) => (
            <td key={column} className="px-5 py-5">
              <div
                className={`dashboard-skeleton h-3 rounded-full ${
                  column === 0
                    ? "w-16"
                    : column === columns - 1
                      ? "w-8"
                      : "w-24"
                }`}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}


export function EmptyState({
  title,
  description,
  action,
  onAction,
}: {
  title: string
  description: string
  action: string
  onAction: () => void
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-5 grid w-14 h-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon name="file" className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
      >
        {action}
      </button>
    </div>
  )
}


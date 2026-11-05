import { useEffect, useMemo, useRef, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Logo from "../../components/layout/Logo"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"
import { API_COUNTRY_NAMES } from "../../data/apiCountries"
import {
  errorMessage,
  loginUser,
  registerUser,
  resetPassword,
  sendResetCode,
  verifyEmail,
  verifyResetCode,
} from "../../services"
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  type CountryCode,
} from "libphonenumber-js"

type AuthStep = "sign-in" | "personal" | "credentials" | "verify-email" | "forgot-email" | "forgot-otp" | "forgot-password" | "forgot-success"
type Errors = Record<string, string>

type CountryOption = {
  code: CountryCode
  name: string
  callingCode: string
  flag: string
}

const regionNames = new (Intl as typeof Intl & {
  DisplayNames: new (
    locales: string[],
    options: { type: "region" },
  ) => { of: (code: string) => string | undefined }
}).DisplayNames(["en"], { type: "region" })

const COUNTRIES: CountryOption[] = getCountries()
  .map((code) => ({
    code,
    name: regionNames.of(code) ?? code,
    callingCode: `+${getCountryCallingCode(code)}`,
    flag: code
      .split("")
      .map((character) =>
        String.fromCodePoint(127397 + character.charCodeAt(0)),
      )
      .join(""),
  }))
  .filter((country) => API_COUNTRY_NAMES.has(country.name))
  .sort((a, b) => a.name.localeCompare(b.name))

const DEFAULT_COUNTRY =
  COUNTRIES.find((country) => country.code === "GB") ?? COUNTRIES[0]

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"

function AoslLogo({ light = false }: { light?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => window.location.assign("/")}
      className="inline-flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
      aria-label="AOSL home"
    >
      <Logo light={light} height={44} />
    </button>
  )
}

function Icon({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`w-5 h-5 ${className}`}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  error,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
  autoComplete?: string
  error?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} ${
          error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""
        }`}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
        >
          <span
            className="grid w-4 h-4 place-items-center rounded-full bg-red-100"
            aria-hidden="true"
          >
            !
          </span>
          {error}
        </p>
      )}
    </div>
  )
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  autoComplete: string
  error?: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputClass} pr-12 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : ""
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-3 top-1/2 grid w-8 h-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? (
            <Icon>
              <path
                d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9 5 9 5a16 16 0 0 1-2.2 2.7M6.3 6.3C4.2 7.7 3 9 3 9s3.5 5 9 5c1 0 1.9-.2 2.7-.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
          ) : (
            <Icon>
              <path
                d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle
                cx="12"
                cy="12"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </Icon>
          )}
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
        >
          <span
            className="grid w-4 h-4 place-items-center rounded-full bg-red-100"
            aria-hidden="true"
          >
            !
          </span>
          {error}
        </p>
      )}
    </div>
  )
}

function CountryPicker({
  value,
  onChange,
  id,
  label,
  error,
  phoneMode = false,
}: {
  value: CountryCode
  onChange: (country: CountryOption) => void
  id: string
  label: string
  error?: string
  phoneMode?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const wrapperRef = useRef<HTMLDivElement>(null)
  const selected =
    COUNTRIES.find((country) => country.code === value) ?? DEFAULT_COUNTRY
  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase().replace("+", "")
    if (!query) return COUNTRIES
    return COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.callingCode.replace("+", "").includes(query),
    )
  }, [search])

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", closeOnOutsideClick)
    return () => document.removeEventListener("mousedown", closeOnOutsideClick)
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      {!phoneMode && (
        <label
          id={`${id}-label`}
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={phoneMode ? undefined : `${id}-label`}
        aria-label={
          phoneMode
            ? `Country code, ${selected.name} ${selected.callingCode}`
            : undefined
        }
        className={`${
          phoneMode
            ? "flex h-12 min-w-32 items-center gap-2 border-r border-slate-200 px-3"
            : `${inputClass} flex items-center gap-3 text-left`
        } ${error ? "border-red-400" : ""}`}
      >
        <span className="text-xl leading-none" aria-hidden="true">
          {selected.flag}
        </span>
        <span
          className={
            phoneMode
              ? "text-sm font-semibold text-slate-700"
              : "flex-1 truncate text-[15px] text-slate-900"
          }
        >
          {phoneMode ? selected.callingCode : selected.name}
        </span>
        <Icon
          className={`w-4 h-4 text-slate-400 transition ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="m7 10 5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      </button>

      {open && (
        <div
          className={`absolute z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 ${
            phoneMode ? "left-0 w-80" : "inset-x-0"
          }`}
        >
          <div className="border-b border-slate-100 p-3">
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-slate-400">
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="m16 16 4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Icon>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, ISO or code"
                autoFocus
                className="h-10 w-full rounded-lg bg-slate-100 pl-9 pr-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div
            role="listbox"
            aria-label="Countries"
            className="max-h-60 overflow-y-auto p-1.5"
          >
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                role="option"
                aria-selected={country.code === value}
                onClick={() => {
                  onChange(country)
                  setOpen(false)
                  setSearch("")
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-blue-50 ${
                  country.code === value
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-700"
                }`}
              >
                <span className="text-lg" aria-hidden="true">
                  {country.flag}
                </span>
                <span className="flex-1 truncate">{country.name}</span>
                <span className="text-xs text-slate-400">{country.code}</span>
                <span className="w-12 text-right text-xs font-medium text-slate-500">
                  {country.callingCode}
                </span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-slate-500">
                No countries found.
              </p>
            )}
          </div>
        </div>
      )}
      {error && !phoneMode && (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  )
}

function PrimaryButton({
  children,
  loading,
}: {
  children: ReactNode
  loading?: boolean
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-wait disabled:opacity-70"
    >
      {loading && (
        <span
          className="w-4 h-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      )}
      {loading ? "Please wait..." : children}
    </button>
  )
}

function AuthHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-[#0D0D5B]">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  )
}

function PasswordStrength({ password }: { password: string }) {
  const tests = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = tests.filter(Boolean).length
  const label = ["Too weak", "Weak", "Fair", "Good", "Strong"][score]
  const color = [
    "bg-slate-200",
    "bg-red-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-emerald-500",
  ][score]

  return (
    <div className="mt-3" aria-live="polite">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">
          Password strength
        </span>
        <span
          className={`text-xs font-bold ${
            score === 4 ? "text-emerald-600" : "text-slate-500"
          }`}
        >
          {label}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            className={`h-1.5 rounded-full ${
              segment <= score ? color : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500">
        Use 8+ characters with an uppercase letter, a number, and a special
        character.
      </p>
    </div>
  )
}

function OtpInput({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length: 5 }, (_, index) => value[index] ?? "")

  function updateDigit(index: number, nextValue: string) {
    const digit = nextValue.replace(/\D/g, "").slice(-1)
    const nextDigits = [...digits]
    nextDigits[index] = digit
    onChange(nextDigits.join(""))
    if (digit && index < 4) inputRefs.current[index + 1]?.focus()
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5)
    if (!pastedCode) return
    event.preventDefault()
    onChange(pastedCode)
    inputRefs.current[Math.min(pastedCode.length, 4)]?.focus()
  }

  return (
    <div>
      <div
        className="grid grid-cols-5 gap-2.5 sm:gap-3"
        onPaste={handlePaste}
        role="group"
        aria-label="Five digit verification code"
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element
            }}
            value={digit}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digit && index > 0) {
                inputRefs.current[index - 1]?.focus()
              }
              if (event.key === "ArrowLeft" && index > 0) {
                inputRefs.current[index - 1]?.focus()
              }
              if (event.key === "ArrowRight" && index < 4) {
                inputRefs.current[index + 1]?.focus()
              }
            }}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            aria-label={`Verification code digit ${index + 1}`}
            aria-invalid={Boolean(error)}
            className={`aspect-square min-w-0 rounded-xl border bg-white text-center text-xl font-bold text-[#0D0D5B] outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 ${
              error ? "border-red-400" : "border-slate-200"
            }`}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-center text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

function PasswordRecoveryIllustration() {
  return (
    <svg
      viewBox="0 0 320 220"
      className="mx-auto w-full max-w-72"
      role="img"
      aria-labelledby="recovery-illustration-title"
    >
      <title id="recovery-illustration-title">
        Password recovery email sent successfully
      </title>
      <path
        d="M57 174c15-30 45-45 77-33 21 8 30 4 47-13 23-23 60-21 80 6 10 14 15 30 16 45H57v-5Z"
        fill="#EFF6FF"
      />
      <circle cx="248" cy="53" r="27" fill="#DBEAFE" />
      <circle cx="248" cy="53" r="18" fill="#2563EB" />
      <path
        d="m239 53 6 6 12-13"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M68 64h150c8 0 14 6 14 14v93c0 8-6 14-14 14H68c-8 0-14-6-14-14V78c0-8 6-14 14-14Z"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="4"
      />
      <path
        d="m60 74 76 58c5 4 11 4 16 0l74-58"
        fill="#EFF6FF"
        stroke="#2563EB"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m59 177 57-54M226 177l-56-54"
        fill="none"
        stroke="#93C5FD"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M87 49c-7-15 0-27 14-31 7 12 3 25-14 31Z" fill="#22D3EE" />
      <path d="M80 48c-14 0-23-8-24-21 15-1 24 7 24 21Z" fill="#60A5FA" />
      <circle cx="65" cy="191" r="5" fill="#60A5FA" />
      <circle cx="253" cy="186" r="4" fill="#22D3EE" />
    </svg>
  )
}

const ADMIN_URL = process.env.REACT_APP_ADMIN_URL

function stepForPath(pathname: string): AuthStep {
  if (pathname.startsWith("/sign-up")) return "personal"
  if (pathname.startsWith("/forgot-password")) return "forgot-email"
  if (pathname.startsWith("/verify")) return "verify-email"
  return "sign-in"
}

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { code: codeFromLink } = useParams()
  const { isAuthenticated, signIn } = useAuth()
  const { showError } = useToast()
  const redirectTo = (location.state as { from?: string } | null)?.from || "/users-dashboard"
  const onHome = () => navigate("/")

  const [step, setStep] = useState<AuthStep>(() => stepForPath(location.pathname))
  const [recoveryUserId, setRecoveryUserId] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [notice, setNotice] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY.code)
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [recoveryEmail, setRecoveryEmail] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [recoveryPassword, setRecoveryPassword] = useState("")
  const [recoveryConfirmPassword, setRecoveryConfirmPassword] = useState("")
  const selectedCountry =
    COUNTRIES.find((item) => item.code === country) ?? DEFAULT_COUNTRY

  function clearFieldError(field: string) {
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function switchStep(nextStep: AuthStep) {
    setErrors({})
    setNotice("")
    setLoading(false)
    setStep(nextStep)
  }

  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true })
  }, [isAuthenticated, navigate, redirectTo])

  // Verification emails link to /verify/:code, so verify straight away.
  useEffect(() => {
    if (!codeFromLink) return
    setOtpCode(codeFromLink)
    void submitEmailVerification(codeFromLink)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeFromLink])

  function fullPhoneNumber() {
    return `${selectedCountry.callingCode}${phone.replace(/^0+/, "").replace(/[^\d]/g, "")}`
  }

  async function submitEmailVerification(code: string) {
    setLoading(true)
    setNotice("")
    try {
      await verifyEmail({ code })
      setOtpCode("")
      setStep("sign-in")
      setNotice("Your email is verified. You can now sign in.")
    } catch (err) {
      setStep("verify-email")
      showError(errorMessage(err, "That code is not valid."))
    } finally {
      setLoading(false)
    }
  }

  function handleEmailVerification(event: FormEvent) {
    event.preventDefault()
    if (!/^\w{5}$/.test(otpCode)) {
      setErrors({ otpCode: "Enter the complete 5-character code." })
      return
    }
    void submitEmailVerification(otpCode)
  }

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email address."
    if (!password) nextErrors.password = "Enter your password."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    setNotice("")
    try {
      const res = await loginUser({ email: email.trim(), password })
      const { token, user } = res.data.payload
      signIn(token, user)
    } catch (err) {
      const message = errorMessage(err, "We couldn't sign you in.")
      if (/not verif/i.test(message)) {
        setSignupEmail(email.trim())
        setStep("verify-email")
        setNotice("Your account isn't verified yet. Enter the 5-character code we emailed you.")
      } else {
        showError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  function handlePersonal(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (!firstName.trim()) nextErrors.firstName = "Enter your first name."
    if (!lastName.trim()) nextErrors.lastName = "Enter your last name."
    const internationalNumber = fullPhoneNumber()
    if (!phone.trim() || !isValidPhoneNumber(internationalNumber, country)) {
      nextErrors.phone = "Enter a valid phone number for this country."
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) switchStep("credentials")
  }

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail))
      nextErrors.signupEmail = "Enter a valid email address."
    if (
      signupPassword.length < 8 ||
      !/[A-Z]/.test(signupPassword) ||
      !/\d/.test(signupPassword) ||
      !/[^A-Za-z0-9]/.test(signupPassword)
    ) {
      nextErrors.signupPassword =
        "Your password does not meet all requirements."
    }
    if (confirmPassword !== signupPassword)
      nextErrors.confirmPassword = "Passwords do not match."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    setNotice("")
    try {
      await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: fullPhoneNumber(),
        email: signupEmail.trim(),
        password: signupPassword,
        country: selectedCountry.name,
      })
      setOtpCode("")
      setStep("verify-email")
      setNotice(`Your account has been created. We sent a 5-character code to ${signupEmail.trim()}.`)
    } catch (err) {
      showError(errorMessage(err, "We couldn't create your account."))
    } finally {
      setLoading(false)
    }
  }

  async function requestRecoveryCode() {
    const res = await sendResetCode(recoveryEmail.trim())
    const record = res.data.payload as { id?: string }
    setRecoveryUserId(record.id || "")
  }

  async function handleRecoveryEmail(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail)) {
      nextErrors.recoveryEmail = "Enter a valid email address."
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      await requestRecoveryCode()
      switchStep("forgot-otp")
    } catch (err) {
      showError(errorMessage(err, "We couldn't send a reset code."))
    } finally {
      setLoading(false)
    }
  }

  async function handleOtpVerification(event: FormEvent) {
    event.preventDefault()
    if (!/^\d{5}$/.test(otpCode)) {
      setErrors({ otpCode: "Enter the complete 5-digit code." })
      return
    }

    setLoading(true)
    try {
      await verifyResetCode({ id: recoveryUserId, resetCode: otpCode, email: recoveryEmail.trim() })
      switchStep("forgot-password")
    } catch (err) {
      showError(errorMessage(err, "That code is not valid."))
    } finally {
      setLoading(false)
    }
  }

  async function resendRecoveryCode() {
    setNotice("")
    try {
      await requestRecoveryCode()
      setNotice(`A new 5-digit code was sent to ${recoveryEmail}.`)
    } catch (err) {
      showError(errorMessage(err, "We couldn't resend the code."))
    }
  }

  async function handleNewPassword(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (
      recoveryPassword.length < 8 ||
      !/[A-Z]/.test(recoveryPassword) ||
      !/\d/.test(recoveryPassword) ||
      !/[^A-Za-z0-9]/.test(recoveryPassword)
    ) {
      nextErrors.recoveryPassword =
        "Your password does not meet all requirements."
    }
    if (recoveryConfirmPassword !== recoveryPassword) {
      nextErrors.recoveryConfirmPassword = "Passwords do not match."
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      await resetPassword({ email: recoveryEmail.trim(), password: recoveryPassword })
      switchStep("forgot-success")
    } catch (err) {
      showError(errorMessage(err, "We couldn't reset your password."))
    } finally {
      setLoading(false)
    }
  }

  const recoveryStepNumber =
    step === "forgot-email"
      ? 1
      : step === "forgot-otp"
        ? 2
        : step === "forgot-password"
          ? 3
          : 0

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(500px,0.78fr)]">
      <section className="relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        <img
          src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D5B]/95 via-blue-950/80 to-slate-950/60" />
        <div className="absolute -left-20 top-1/3 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative z-10">
          <AoslLogo light />
        </div>
        <div className="relative z-10 max-w-xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-blue-100 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
            Secure access to AOSL services
          </span>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Care, opportunity and support—all in one place.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/75">
            Manage your applications, training and care services through your
            personal AOSL account.
          </p>
          <div className="mt-10 flex items-center gap-6 text-xs font-medium text-blue-100/70">
            <span className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-cyan-300">
                <path
                  d="m5 12 4 4L19 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
              Secure & private
            </span>
            <span className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-cyan-300">
                <path
                  d="M12 3 4 7v5c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V7l-8-4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </Icon>
              UK-based support
            </span>
          </div>
        </div>
        <p className="relative z-10 text-xs text-blue-100/50">
          © {new Date().getFullYear()} All Occupation Service Ltd
        </p>
      </section>

      <section className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-8 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-50 to-transparent lg:hidden" />
        <button
          type="button"
          onClick={onHome}
          className="absolute right-5 top-5 z-10 grid w-10 h-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-blue-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 sm:right-8 sm:top-8"
          aria-label="Close and return home"
        >
          <Icon>
            <path
              d="m7 7 10 10M17 7 7 17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </Icon>
        </button>

        <div className="relative w-full max-w-lg">
          <div className="mb-8 flex justify-center">
            <AoslLogo />
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-9">
            {(step === "personal" || step === "credentials") && (
              <div
                className="mb-7 flex items-center gap-3"
                aria-label={`Sign up step ${step === "personal" ? 1 : 2} of 2`}
              >
                <span className="h-1.5 flex-1 rounded-full bg-blue-600" />
                <span
                  className={`h-1.5 flex-1 rounded-full ${
                    step === "credentials" ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
                <span className="ml-1 text-xs font-bold text-slate-400">
                  {step === "personal" ? "1" : "2"} / 2
                </span>
              </div>
            )}

            {(step === "forgot-email" ||
              step === "forgot-otp" ||
              step === "forgot-password") && (
              <div
                className="mb-7 flex items-center gap-2.5"
                aria-label={`Password recovery step ${recoveryStepNumber} of 3`}
              >
                {[1, 2, 3].map((progressStep) => (
                  <span
                    key={progressStep}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      progressStep <= recoveryStepNumber
                        ? "bg-blue-600"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs font-bold text-slate-400">
                  {recoveryStepNumber} / 3
                </span>
              </div>
            )}

            {step === "sign-in" && (
              <>
                <AuthHeader
                  eyebrow="Welcome back"
                  title="Sign in to AOSL"
                  description="Enter your details to access your account."
                />
                <form onSubmit={handleSignIn} noValidate className="space-y-5">
                  <TextField
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(value) => {
                      setEmail(value)
                      clearFieldError("email")
                    }}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    error={errors.email}
                  />
                  <PasswordField
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(value) => {
                      setPassword(value)
                      clearFieldError("password")
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    error={errors.password}
                  />
                  <div className="flex items-center justify-between gap-4">
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 accent-blue-600"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setRecoveryEmail(email)
                        switchStep("forgot-email")
                      }}
                      className="text-sm font-semibold text-blue-600 transition hover:text-blue-800 focus-visible:outline-none focus-visible:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <PrimaryButton loading={loading}>Sign In</PrimaryButton>
                </form>
                {notice && (
                  <p
                    role="status"
                    className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800"
                  >
                    {notice}
                  </p>
                )}
                <p className="mt-7 text-center text-sm text-slate-500">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchStep("personal")}
                    className="font-bold text-blue-600 hover:text-blue-800"
                  >
                    Sign Up
                  </button>
                </p>
              </>
            )}

            {step === "forgot-email" && (
              <>
                <button
                  type="button"
                  onClick={() => switchStep("sign-in")}
                  className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
                >
                  <Icon className="w-4 h-4">
                    <path
                      d="m14 6-6 6 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  Back to Sign In
                </button>
                <div className="mb-6 grid w-12 h-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="w-6 h-6">
                    <path
                      d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="m5 7 7 5 7-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                </div>
                <AuthHeader
                  eyebrow="Password recovery"
                  title="Forgot your password?"
                  description="Enter the email address linked to your account and we’ll send you a 5-digit verification code."
                />
                <form
                  onSubmit={handleRecoveryEmail}
                  noValidate
                  className="space-y-6"
                >
                  <TextField
                    id="recovery-email"
                    label="Email"
                    value={recoveryEmail}
                    onChange={(value) => {
                      setRecoveryEmail(value)
                      clearFieldError("recoveryEmail")
                    }}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    error={errors.recoveryEmail}
                  />
                  <PrimaryButton loading={loading}>
                    Send Recovery Code
                  </PrimaryButton>
                </form>
                <p className="mt-7 text-center text-sm text-slate-500">
                  Remembered your password?{" "}
                  <button
                    type="button"
                    onClick={() => switchStep("sign-in")}
                    className="font-bold text-blue-600 transition hover:text-blue-800"
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}

            {step === "forgot-otp" && (
              <>
                <button
                  type="button"
                  onClick={() => switchStep("forgot-email")}
                  className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
                >
                  <Icon className="w-4 h-4">
                    <path
                      d="m14 6-6 6 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  Change email
                </button>
                <div className="mb-6 grid w-12 h-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="w-6 h-6">
                    <rect
                      x="5"
                      y="3"
                      width="14"
                      height="18"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M9 8h6M9 12h2m2 0h2M9 16h6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </Icon>
                </div>
                <AuthHeader
                  eyebrow="Check your email"
                  title="Enter verification code"
                  description={`We sent a 5-digit code to ${recoveryEmail}. Enter it below to verify your identity.`}
                />
                <form
                  onSubmit={handleOtpVerification}
                  noValidate
                  className="space-y-6"
                >
                  <OtpInput
                    value={otpCode}
                    onChange={(value) => {
                      setOtpCode(value)
                      clearFieldError("otpCode")
                    }}
                    error={errors.otpCode}
                  />
                  <PrimaryButton loading={loading}>Verify Code</PrimaryButton>
                </form>
                <div className="mt-7 text-center text-sm text-slate-500">
                  Didn’t receive the code?{" "}
                  <button
                    type="button"
                    onClick={() => void resendRecoveryCode()}
                    className="font-bold text-blue-600 transition hover:text-blue-800"
                  >
                    Resend code
                  </button>
                </div>
                {notice && (
                  <p
                    role="status"
                    className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-medium text-blue-800"
                  >
                    {notice}
                  </p>
                )}
              </>
            )}

            {step === "verify-email" && (
              <>
                <AuthHeader
                  eyebrow="Check your email"
                  title="Verify your email"
                  description="Enter the 5-character code we emailed you to activate your account."
                />
                <form
                  onSubmit={handleEmailVerification}
                  noValidate
                  className="space-y-6"
                >
                  <OtpInput
                    value={otpCode}
                    onChange={(value) => {
                      setOtpCode(value)
                      clearFieldError("otpCode")
                    }}
                    error={errors.otpCode}
                  />
                  <PrimaryButton loading={loading}>Verify Email</PrimaryButton>
                </form>
                {notice && (
                  <p
                    role="status"
                    className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-medium text-blue-800"
                  >
                    {notice}
                  </p>
                )}
                <p className="mt-7 text-center text-sm text-slate-500">
                  Already verified?{" "}
                  <button
                    type="button"
                    onClick={() => switchStep("sign-in")}
                    className="font-bold text-blue-600 hover:text-blue-800"
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}

            {step === "forgot-password" && (
              <>
                <button
                  type="button"
                  onClick={() => switchStep("forgot-otp")}
                  className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
                >
                  <Icon className="w-4 h-4">
                    <path
                      d="m14 6-6 6 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  Back
                </button>
                <AuthHeader
                  eyebrow="Create a new password"
                  title="Reset your password"
                  description="Choose a strong password you haven’t used before."
                />
                <form
                  onSubmit={handleNewPassword}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <PasswordField
                      id="recovery-password"
                      label="New Password"
                      value={recoveryPassword}
                      onChange={(value) => {
                        setRecoveryPassword(value)
                        clearFieldError("recoveryPassword")
                      }}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      error={errors.recoveryPassword}
                    />
                    <PasswordStrength password={recoveryPassword} />
                  </div>
                  <PasswordField
                    id="recovery-confirm-password"
                    label="Confirm Password"
                    value={recoveryConfirmPassword}
                    onChange={(value) => {
                      setRecoveryConfirmPassword(value)
                      clearFieldError("recoveryConfirmPassword")
                    }}
                    placeholder="Enter your new password again"
                    autoComplete="new-password"
                    error={errors.recoveryConfirmPassword}
                  />
                  {recoveryConfirmPassword &&
                    !errors.recoveryConfirmPassword && (
                      <p
                        className={`-mt-2 text-xs font-semibold ${
                          recoveryConfirmPassword === recoveryPassword
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {recoveryConfirmPassword === recoveryPassword
                          ? "Passwords match."
                          : "Passwords don’t match yet."}
                      </p>
                    )}
                  <PrimaryButton loading={loading}>
                    Reset Password
                  </PrimaryButton>
                </form>
              </>
            )}

            {step === "forgot-success" && (
              <div className="py-2 text-center sm:py-4">
                <PasswordRecoveryIllustration />
                <div className="mx-auto mt-2 max-w-sm">
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    Recovery successful
                  </span>
                  <h1 className="text-3xl font-bold tracking-tight text-[#0D0D5B]">
                    Password Recovery Successful
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Your password recovery request was completed successfully.
                    Kindly return to the sign in screen.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => switchStep("sign-in")}
                  className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                >
                  Sign In
                  <Icon className="w-4 h-4">
                    <path
                      d="M5 12h14m-5-5 5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                </button>
                <p className="mt-6 text-sm text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchStep("sign-in")}
                    className="font-bold text-blue-600 transition hover:text-blue-800"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            )}

            {step === "personal" && (
              <>
                <AuthHeader
                  eyebrow="Create your account"
                  title="Personal information"
                  description="Tell us a little about yourself to get started."
                />
                <form
                  onSubmit={handlePersonal}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id="first-name"
                      label="First Name"
                      value={firstName}
                      onChange={(value) => {
                        setFirstName(value)
                        clearFieldError("firstName")
                      }}
                      placeholder="First name"
                      autoComplete="given-name"
                      error={errors.firstName}
                    />
                    <TextField
                      id="last-name"
                      label="Last Name"
                      value={lastName}
                      onChange={(value) => {
                        setLastName(value)
                        clearFieldError("lastName")
                      }}
                      placeholder="Last name"
                      autoComplete="family-name"
                      error={errors.lastName}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone-number"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>
                    <div
                      className={`flex rounded-xl border bg-white transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 ${
                        errors.phone ? "border-red-400" : "border-slate-200"
                      }`}
                    >
                      <CountryPicker
                        id="phone-country"
                        label="Phone country"
                        value={country}
                        onChange={(option) => {
                          setCountry(option.code)
                          clearFieldError("phone")
                        }}
                        phoneMode
                      />
                      <input
                        id="phone-number"
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(event) => {
                          setPhone(event.target.value)
                          clearFieldError("phone")
                        }}
                        placeholder="Phone number"
                        autoComplete="tel-national"
                        aria-invalid={Boolean(errors.phone)}
                        className="h-12 min-w-0 flex-1 rounded-r-xl px-3 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <CountryPicker
                    id="country"
                    label="Country"
                    value={country}
                    onChange={(option) => {
                      setCountry(option.code)
                      clearFieldError("phone")
                    }}
                  />
                  <PrimaryButton>Next</PrimaryButton>
                </form>
                <p className="mt-7 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchStep("sign-in")}
                    className="font-bold text-blue-600 hover:text-blue-800"
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}

            {step === "credentials" && (
              <>
                <button
                  type="button"
                  onClick={() => switchStep("personal")}
                  className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
                >
                  <Icon className="w-4 h-4">
                    <path
                      d="m14 6-6 6 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  Back
                </button>
                <AuthHeader
                  eyebrow="Almost there"
                  title="Account credentials"
                  description="Choose the details you’ll use to securely sign in."
                />
                <form onSubmit={handleSignUp} noValidate className="space-y-5">
                  <TextField
                    id="signup-email"
                    label="Email"
                    value={signupEmail}
                    onChange={(value) => {
                      setSignupEmail(value)
                      clearFieldError("signupEmail")
                    }}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    error={errors.signupEmail}
                  />
                  <div>
                    <PasswordField
                      id="signup-password"
                      label="Password"
                      value={signupPassword}
                      onChange={(value) => {
                        setSignupPassword(value)
                        clearFieldError("signupPassword")
                      }}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      error={errors.signupPassword}
                    />
                    <PasswordStrength password={signupPassword} />
                  </div>
                  <PasswordField
                    id="confirm-password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(value) => {
                      setConfirmPassword(value)
                      clearFieldError("confirmPassword")
                    }}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    error={errors.confirmPassword}
                  />
                  {confirmPassword && !errors.confirmPassword && (
                    <p
                      className={`-mt-2 text-xs font-semibold ${
                        confirmPassword === signupPassword
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {confirmPassword === signupPassword
                        ? "Passwords match."
                        : "Passwords don’t match yet."}
                    </p>
                  )}
                  <PrimaryButton loading={loading}>Sign Up</PrimaryButton>
                </form>
                {notice && (
                  <p
                    role="status"
                    className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                  >
                    {notice}
                  </p>
                )}
                <p className="mt-7 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchStep("sign-in")}
                    className="font-bold text-blue-600 hover:text-blue-800"
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}
          </div>
          <div className="mt-5 flex justify-center gap-5 text-xs text-slate-400">
            <button type="button" className="hover:text-slate-600">
              Privacy Policy
            </button>
            <button type="button" className="hover:text-slate-600">
              Terms of Service
            </button>
            {ADMIN_URL && (
              <a href={ADMIN_URL} className="hover:text-blue-600">
                Admin access
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

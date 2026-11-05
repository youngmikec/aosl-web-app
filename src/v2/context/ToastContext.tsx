import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ToastKind = "error" | "success" | "info";
type Toast = { id: number; kind: ToastKind; message: string };

type ToastApi = {
  showToast: (message: string, kind?: ToastKind) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

const DISMISS_MS = 5000;

const STYLES: Record<ToastKind, { bar: string; icon: string; path: string }> = {
  error: { bar: "#DC2626", icon: "#FEE2E2", path: "M12 8v5m0 3.5h.01" },
  success: { bar: "#16A34A", icon: "#DCFCE7", path: "M5 12.5l4.5 4.5L19 7.5" },
  info: { bar: "#2563EB", icon: "#DBEAFE", path: "M12 11v5m0-8.5h.01" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, kind: ToastKind = "info") => {
    const id = nextId.current++;
    // Collapse repeats of the same message so a double submit doesn't stack toasts.
    setToasts((current) => [...current.filter((t) => t.message !== message), { id, kind, message }].slice(-4));
  }, []);

  const value = useMemo<ToastApi>(
    () => ({
      showToast,
      showError: (message) => showToast(message, "error"),
      showSuccess: (message) => showToast(message, "success"),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="fixed top-4 right-4 left-4 sm:left-auto z-[100] flex flex-col gap-3 items-end pointer-events-none"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const style = STYLES[toast.kind];
  return (
    <div
      role={toast.kind === "error" ? "alert" : "status"}
      className="dashboard-modal pointer-events-auto flex w-full sm:w-auto sm:min-w-[300px] sm:max-w-sm items-start gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-2xl"
      style={{ borderLeft: `4px solid ${style.bar}`, boxShadow: "0 12px 40px rgba(15,23,42,0.18)" }}
    >
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: style.icon }}
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d={style.path} stroke={style.bar} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="flex-1 text-sm font-medium leading-5 text-slate-800">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-slate-400 hover:text-slate-600"
        aria-label="Dismiss notification"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  return children;
}

export function RedirectIfAuthed({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/users-dashboard" replace />;
  return children;
}

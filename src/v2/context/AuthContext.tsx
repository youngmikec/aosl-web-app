import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import type { V2User } from "../models";
import { clearSession, readStored, TOKEN_KEY, USER_KEY, writeStored } from "../services/http";

type AuthState = {
  user: V2User | null;
  isAuthenticated: boolean;
  signIn: (token: string, user: V2User) => void;
  signOut: () => void;
  updateUser: (changes: Partial<V2User>) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<V2User | null>(() =>
    readStored<string>(TOKEN_KEY) ? readStored<V2User>(USER_KEY) : null,
  );

  const signIn = useCallback((token: string, nextUser: V2User) => {
    writeStored(TOKEN_KEY, token);
    writeStored(USER_KEY, nextUser);
    setUser(nextUser);
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const updateUser = useCallback((changes: Partial<V2User>) => {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, ...changes };
      writeStored(USER_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, signIn, signOut, updateUser }),
    [user, signIn, signOut, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

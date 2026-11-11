"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authClient } from "./client";

export interface AuthFeatures {
  enabled: boolean;
  /** True when account emails are really sent. */
  email: boolean;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null | undefined;
}

export type AuthState =
  | { status: "loading" }
  | { status: "disabled" }
  | { status: "signed-out"; features: AuthFeatures }
  | { status: "signed-in"; features: AuthFeatures; user: SessionUser };

interface AuthContextValue {
  state: AuthState;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function resolveAuthState(): Promise<AuthState> {
  try {
    const response = await fetch("/api/auth-config", { cache: "no-store" });
    if (!response.ok) return { status: "disabled" };
    const features = (await response.json()) as AuthFeatures;
    if (!features.enabled) return { status: "disabled" };

    const { data } = await authClient.getSession();
    if (!data?.user) return { status: "signed-out", features };
    const { id, name, email, image } = data.user;
    return { status: "signed-in", features, user: { id, name, email, image } };
  } catch {
    // Network or server failure: fall back to guest behaviour rather than blocking the app.
    return { status: "disabled" };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  const refresh = useCallback(async () => {
    setState(await resolveAuthState());
  }, []);

  useEffect(() => {
    let cancelled = false;
    void resolveAuthState().then((next) => {
      if (!cancelled) setState(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const signOut = useCallback(async () => {
    await authClient.signOut();
    await refresh();
  }, [refresh]);

  const value = useMemo(() => ({ state, refresh, signOut }), [state, refresh, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>.");
  return value;
}

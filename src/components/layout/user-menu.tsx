"use client";

import { LogIn, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useAuth } from "@/lib/auth/auth-provider";

export function UserMenu({ compact = false }: { compact?: boolean | undefined }) {
  const { state, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (state.status === "loading") {
    return <div className={cn("h-9 animate-pulse rounded-xl bg-fg/5", compact ? "w-9" : "w-full")} aria-hidden />;
  }

  if (state.status === "disabled") {
    return compact ? null : (
      <p className="px-2 text-xs leading-relaxed text-fg-muted">Guest mode · no account needed.</p>
    );
  }

  if (state.status === "signed-out") {
    return (
      <Link
        href="/sign-in"
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-xl text-sm font-medium text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg",
          compact ? "px-2.5" : "w-full px-3",
        )}
      >
        <LogIn className="size-4" />
        {compact ? <span className="sr-only">Sign in</span> : "Sign in"}
      </Link>
    );
  }

  const { user } = state;
  const initial = (user.name || user.email).trim().charAt(0).toUpperCase();

  return (
    <div ref={rootRef} className={cn("relative", !compact && "w-full")}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex h-9 items-center gap-2.5 rounded-xl text-left transition-colors hover:bg-fg/5",
          compact ? "px-1" : "w-full px-2",
        )}
      >
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
          {initial || <UserRound className="size-3.5" />}
        </span>
        {compact ? (
          <span className="sr-only">Account menu</span>
        ) : (
          <span className="min-w-0 truncate text-sm font-medium text-fg">{user.name || user.email}</span>
        )}
      </button>
      {open ? (
        <div
          role="menu"
          className={cn(
            "glass absolute z-40 w-60 rounded-xl bg-surface/95 p-1.5",
            compact ? "right-0 top-full mt-2" : "bottom-full left-0 mb-2",
          )}
        >
          <div className="border-b border-hairline px-2.5 pb-2 pt-1.5">
            <p className="truncate text-sm font-medium text-fg">{user.name || "Student"}</p>
            <p className="truncate text-xs text-fg-muted">{user.email}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              void signOut();
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}

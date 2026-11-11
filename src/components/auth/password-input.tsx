"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";
import { inputClass } from "@/components/ui/input";
import { cn } from "@/lib/cn";

/** A password field with a show/hide toggle. */
export function PasswordInput({ className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={visible ? "text" : "password"} className={cn(inputClass, "h-11 pr-11", className)} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center rounded-r-xl text-fg-muted hover:text-fg"
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

export function RememberMe({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 rounded border-hairline-strong accent-[var(--accent)]"
      />
      Remember me
      <span className="text-xs text-fg-muted">(stay signed in on this device)</span>
    </label>
  );
}

/** Turns Better Auth errors into messages written for students. */
export function authErrorMessage(error: { code?: string | undefined; status?: number; message?: string | undefined }): string {
  if (error.status === 429) return "Too many attempts. Wait a minute, then try again.";
  switch (error.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return "That email and password don't match. Check them, or reset your password.";
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "An account with this email already exists. Sign in instead, or reset your password.";
    case "PASSWORD_TOO_SHORT":
      return "Use at least 8 characters.";
    case "PASSWORD_TOO_LONG":
      return "Use at most 128 characters.";
    case "PASSWORD_COMPROMISED":
      return "This password has appeared in a data breach elsewhere, so it isn't safe. Choose a different one.";
    case "INVALID_EMAIL":
      return "Enter a valid email address.";
    case "INVALID_TOKEN":
      return "This link is invalid or has expired. Ask for a new one.";
    default:
      return error.message ?? "Something went wrong. Try again in a moment.";
  }
}

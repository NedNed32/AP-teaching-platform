"use client";

import { CheckCircle2, KeyRound, LoaderCircle, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { inputClass } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/cn";
import { authErrorMessage, PasswordInput } from "./password-input";

/** Asks for a reset link. Always reports success, so it can't reveal which emails have accounts. */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "pending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setState("pending");
    const { error: failure } = await authClient.requestPasswordReset({ email, redirectTo: "/reset-password" });
    if (failure) {
      setState("idle");
      setError(authErrorMessage(failure));
      return;
    }
    setState("sent");
  };

  if (state === "sent") {
    return (
      <div className="space-y-3 text-sm leading-relaxed text-fg-muted">
        <p className="flex items-center gap-2 font-medium text-fg">
          <CheckCircle2 className="size-4 text-success" /> Check your email
        </p>
        <p>
          If an account exists for <span className="font-medium text-fg">{email}</span>, we&apos;ve sent it a link to
          choose a new password. The link works for 1 hour.
        </p>
        <p>Can&apos;t find it? Check your spam or promotions folder.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-fg">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={cn(inputClass, "h-11")}
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={state === "pending"}>
        {state === "pending" ? <LoaderCircle className="animate-spin" /> : <Mail />}
        Email me a reset link
      </Button>
      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-danger">
        {error}
      </p>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "pending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError(authErrorMessage({ code: "PASSWORD_TOO_SHORT" }));
      return;
    }
    setState("pending");
    const { error: failure } = await authClient.resetPassword({ newPassword: password, token });
    if (failure) {
      setState("idle");
      setError(authErrorMessage(failure));
      return;
    }
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-fg-muted">
        <p className="flex items-center gap-2 font-medium text-fg">
          <CheckCircle2 className="size-4 text-success" /> Password changed
        </p>
        <p>For safety, you&apos;ve been signed out everywhere. Sign in with your new password.</p>
        <ButtonLink href="/sign-in" className="w-full">
          Sign in
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="new-password" className="block text-sm font-medium text-fg">
          New password
        </label>
        <PasswordInput
          id="new-password"
          required
          minLength={8}
          maxLength={128}
          autoComplete="new-password"
          aria-describedby="new-password-hint"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p id="new-password-hint" className="text-xs leading-relaxed text-fg-muted">
          At least 8 characters, and not one you use anywhere else.
        </p>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={state === "pending"}>
        {state === "pending" ? <LoaderCircle className="animate-spin" /> : <KeyRound />}
        Save new password
      </Button>
      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-danger">
        {error}
        {error?.includes("expired") ? (
          <>
            {" "}
            <Link href="/forgot-password" className="font-medium text-accent hover:underline">
              Get a new link
            </Link>
          </>
        ) : null}
      </p>
    </form>
  );
}

/** Sends the confirmation email again, for a signed-in account that isn't confirmed yet. */
export function ResendVerificationButton({ email, size = "sm" }: { email: string; size?: "sm" | "md" }) {
  const [state, setState] = useState<"idle" | "pending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const resend = async () => {
    setState("pending");
    const { error } = await authClient.sendVerificationEmail({ email, callbackURL: "/email-verified" });
    if (error) {
      setState("error");
      setMessage(authErrorMessage(error));
      return;
    }
    setState("sent");
    setMessage(`Sent to ${email}. Check your spam folder too.`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" size={size} onClick={resend} disabled={state === "pending" || state === "sent"}>
        {state === "pending" ? <LoaderCircle className="animate-spin" /> : <Send />}
        {state === "sent" ? "Email sent" : "Resend confirmation email"}
      </Button>
      <span role="status" className={cn("text-xs", state === "error" ? "text-danger" : "text-fg-muted")}>
        {message}
      </span>
    </div>
  );
}

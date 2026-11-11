"use client";

import { LoaderCircle, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/auth-provider";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/cn";
import { authErrorMessage, PasswordInput } from "./password-input";

export function SignUpForm({ callbackURL = "/" }: { callbackURL?: string }) {
  const router = useRouter();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError(authErrorMessage({ code: "PASSWORD_TOO_SHORT" }));
      return;
    }
    setPending(true);
    // No real name is collected: the inquiry board uses a separate display name.
    const { error: failure } = await authClient.signUp.email({
      email,
      password,
      name: "",
      callbackURL: "/email-verified",
    });
    if (failure) {
      setPending(false);
      setError(authErrorMessage(failure));
      return;
    }
    // Let the rest of the app (and the guest-progress merge) see the new session.
    await refresh();
    router.push(`/verify-request?email=${encodeURIComponent(email)}&next=${encodeURIComponent(callbackURL)}`);
  };

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
          placeholder="you@school.edu"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={cn(inputClass, "h-11")}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="new-password" className="block text-sm font-medium text-fg">
          Password
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
          At least 8 characters. Don&apos;t reuse a password from another site: passwords found in known data breaches
          are rejected.
        </p>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? <LoaderCircle className="animate-spin" /> : <UserPlus />}
        Create account
      </Button>
      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-danger">
        {error}
      </p>
    </form>
  );
}

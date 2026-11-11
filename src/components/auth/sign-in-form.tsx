"use client";

import { LoaderCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/auth-provider";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/cn";
import { authErrorMessage, PasswordInput, RememberMe } from "./password-input";

export function SignInForm({ callbackURL = "/" }: { callbackURL?: string }) {
  const router = useRouter();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    const { error: failure } = await authClient.signIn.email({ email, password, rememberMe });
    if (failure) {
      setPending(false);
      setError(authErrorMessage(failure));
      return;
    }
    // Let the rest of the app (and the guest-progress merge) see the new session.
    await refresh();
    router.push(callbackURL);
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
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="password" className="block text-sm font-medium text-fg">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs font-medium text-accent hover:underline">
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <RememberMe checked={rememberMe} onChange={setRememberMe} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? <LoaderCircle className="animate-spin" /> : <LogIn />}
        Sign in
      </Button>
      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-danger">
        {error}
      </p>
    </form>
  );
}

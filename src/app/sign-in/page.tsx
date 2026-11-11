import { KeyRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { LogoMark } from "@/components/layout/logo";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Kbd } from "@/components/ui/kbd";
import { getSessionUser } from "@/server/auth";
import { authFeatures } from "@/server/env";
import { safeNext } from "@/lib/auth/safe-next";

export const metadata: Metadata = { title: "Sign in" };

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  // Auth availability depends on runtime env, so never prerender this page.
  await connection();
  const params = await searchParams;
  const next = safeNext(params.next);
  const signUp = params.mode === "signup";
  const features = authFeatures();
  if (features.enabled && (await getSessionUser())) redirect(next);
  const switchHref = (mode: "signin" | "signup") =>
    `/sign-in?${new URLSearchParams({ ...(mode === "signup" ? { mode } : {}), ...(next !== "/" ? { next } : {}) })}`;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-6 sm:py-12">
      <LogoMark className="size-12" />
      <h1 className="mt-5 text-center text-2xl font-semibold tracking-tight text-fg">
        {signUp ? "Create your Operon account" : "Sign in to Operon"}
      </h1>
      <p className="mt-2 text-center text-sm text-fg-muted">
        Sync drill attempts and mastery across devices. Guest progress from this browser is copied into your
        account automatically.
      </p>

      <GlassPanel className="mt-8 w-full p-6">
        {features.enabled ? (
          <>
            <nav aria-label="Sign in or create an account" className="mb-5 grid grid-cols-2 gap-1 rounded-xl border border-hairline bg-fg/[0.03] p-1 text-sm font-medium">
              {(["signin", "signup"] as const).map((mode) => {
                const active = (mode === "signup") === signUp;
                return (
                  <Link
                    key={mode}
                    href={switchHref(mode)}
                    aria-current={active ? "page" : undefined}
                    className={active ? "rounded-lg bg-fg/10 px-3 py-2 text-center text-fg shadow-sm" : "rounded-lg px-3 py-2 text-center text-fg-muted hover:text-fg"}
                  >
                    {mode === "signup" ? "Create account" : "Sign in"}
                  </Link>
                );
              })}
            </nav>
            {signUp ? <SignUpForm callbackURL={next} /> : <SignInForm callbackURL={next} />}
          </>
        ) : (
          <div className="text-sm leading-relaxed text-fg-muted">
            <div className="flex items-center gap-2 font-medium text-fg">
              <KeyRound className="size-4 text-warn" />
              Accounts aren&apos;t enabled on this server
            </div>
            <p className="mt-3">
              Everything works in guest mode, with progress saved in this browser. To turn on accounts, set{" "}
              <Kbd>BETTER_AUTH_SECRET</Kbd> in <Kbd>.env</Kbd> (see <Kbd>.env.example</Kbd>) and restart the server.
            </p>
          </div>
        )}
      </GlassPanel>

      <Link href="/" className="mt-6 text-sm font-medium text-fg-muted hover:text-fg">
        Continue as guest
      </Link>
    </div>
  );
}

import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { ResendVerificationButton } from "@/components/auth/account-email-forms";
import { AccountPage } from "@/components/auth/account-page";
import { ButtonLink } from "@/components/ui/button";
import { getSessionUser } from "@/server/auth";
import { authFeatures } from "@/server/env";

export const metadata: Metadata = { title: "Email confirmation" };

/** Where the confirmation link lands (via Better Auth), with `?error=…` when the link was invalid or expired. */
export default async function EmailVerifiedPage({ searchParams }: PageProps<"/email-verified">) {
  // Depends on runtime env, so never prerender.
  await connection();
  if (!authFeatures().enabled) redirect("/sign-in");
  const { error } = await searchParams;
  const user = await getSessionUser();

  if (error || !user?.emailVerified) {
    return (
      <AccountPage title="This link has expired">
        <p className="text-sm leading-relaxed text-fg-muted">
          Confirmation links work for 24 hours.{" "}
          {user ? "Send yourself a new one:" : "Sign in, then send yourself a new one from the inquiry board."}
        </p>
        <div className="mt-5">
          {user ? (
            <ResendVerificationButton email={user.email} size="md" />
          ) : (
            <ButtonLink href="/sign-in?next=/inquiry" className="w-full">
              Sign in
            </ButtonLink>
          )}
        </div>
      </AccountPage>
    );
  }

  return (
    <AccountPage title="Email confirmed">
      <p className="flex items-center gap-2 text-sm font-medium text-fg">
        <CheckCircle2 className="size-4 text-success" /> Thanks! Your account is all set.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">You can now ask and answer questions on the inquiry board.</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <ButtonLink href="/progress">Go to my progress</ButtonLink>
        <ButtonLink href="/inquiry" variant="secondary">
          Open the inquiry board
        </ButtonLink>
      </div>
    </AccountPage>
  );
}

import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/account-email-forms";
import { AccountPage } from "@/components/auth/account-page";
import { ButtonLink } from "@/components/ui/button";
import { authFeatures } from "@/server/env";

export const metadata: Metadata = { title: "Choose a new password" };

/** The reset email links here (via Better Auth) with `?token=…`, or `?error=INVALID_TOKEN` when it has expired. */
export default async function ResetPasswordPage({ searchParams }: PageProps<"/reset-password">) {
  // Depends on runtime env, so never prerender.
  await connection();
  if (!authFeatures().enabled) redirect("/sign-in");
  const { token, error } = await searchParams;

  if (typeof token !== "string" || error) {
    return (
      <AccountPage title="This link has expired">
        <p className="text-sm leading-relaxed text-fg-muted">
          Password reset links work once, for 1 hour. Ask for a new one and use the newest email.
        </p>
        <ButtonLink href="/forgot-password" className="mt-5 w-full">
          Get a new link
        </ButtonLink>
      </AccountPage>
    );
  }

  return (
    <AccountPage title="Choose a new password">
      <ResetPasswordForm token={token} />
    </AccountPage>
  );
}

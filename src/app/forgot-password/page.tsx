import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ForgotPasswordForm } from "@/components/auth/account-email-forms";
import { AccountPage } from "@/components/auth/account-page";
import { authFeatures } from "@/server/env";

export const metadata: Metadata = { title: "Forgot password" };

export default async function ForgotPasswordPage() {
  await connection();
  if (!authFeatures().enabled) redirect("/sign-in");

  return (
    <AccountPage title="Forgot your password?" intro="Enter your account's email address and we'll send you a link to choose a new password.">
      <ForgotPasswordForm />
      <Link href="/sign-in" className="mt-2 inline-block text-sm font-medium text-fg-muted hover:text-fg">
        Back to sign in
      </Link>
    </AccountPage>
  );
}

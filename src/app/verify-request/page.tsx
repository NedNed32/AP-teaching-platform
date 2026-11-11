import { MailCheck } from "lucide-react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { AccountPage } from "@/components/auth/account-page";
import { ButtonLink } from "@/components/ui/button";
import { serverEnv } from "@/server/env";
import { safeNext } from "@/lib/auth/safe-next";

export const metadata: Metadata = { title: "Account created" };

/** Shown right after sign-up: the account works now; confirming the email unlocks the inquiry board. */
export default async function VerifyRequestPage({ searchParams }: PageProps<"/verify-request">) {
  // Depends on runtime env, so never prerender.
  await connection();
  const params = await searchParams;
  const address = typeof params.email === "string" ? params.email : null;
  const env = serverEnv();
  const sender = env.resendApiKey ? (env.emailFrom.match(/<([^>]+)>/)?.[1] ?? env.emailFrom) : null;

  return (
    <AccountPage title="Your account is ready">
      <div className="text-center">
        <span className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl bg-success/10 text-success">
          <MailCheck className="size-6" />
        </span>
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          We sent a confirmation link{address ? <> to <span className="font-medium text-fg">{address}</span></> : null}.
          You can start studying now; confirm your email when you want to post on the inquiry board.
        </p>
        <p className="mt-4 rounded-xl border border-hairline bg-fg/[0.03] p-3 text-xs leading-relaxed text-fg-muted">
          {sender
            ? `Can't find it? Check your spam or promotions folder. It comes from ${sender}.`
            : "Running locally without an email provider? The link is printed in the server console."}
        </p>
        <ButtonLink href={safeNext(params.next)} className="mt-6 w-full">
          Continue
        </ButtonLink>
      </div>
    </AccountPage>
  );
}

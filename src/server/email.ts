import "server-only";
import { site } from "@/config/site";
import { serverEnv } from "@/server/env";

interface AccountEmail {
  to: string;
  subject: string;
  /** Why the recipient is getting this email, in one sentence. */
  reason: string;
  action: string;
  url: string;
  expires: string;
}

/**
 * Sends an account email (address confirmation, password reset) via Resend
 * when configured; otherwise prints the link to the server log.
 *
 * Both a plain-text and an HTML part, the reason for the email and the full
 * link in text: bare one-link emails look like phishing to spam filters.
 */
async function sendAccountEmail({ to, subject, reason, action, url, expires }: AccountEmail): Promise<void> {
  const env = serverEnv();

  if (!env.resendApiKey) {
    const production = process.env.NODE_ENV === "production";
    console.info(
      [
        "",
        `┌─ ${site.name} email: ${subject} ─────────────────────────`,
        `│ to:   ${to}`,
        `│ link: ${url}`,
        production
          ? "│ note: RESEND_API_KEY is not set, so account emails are going to the server log."
          : "│ note: set RESEND_API_KEY to send real emails.",
        "└───────────────────────────────────────────────────────────────",
        "",
      ].join("\n"),
    );
    return;
  }

  const ignore = "If you didn't ask for this, you can ignore this email. Nothing will change.";
  const text = [
    site.name,
    "",
    reason,
    "",
    `${action}:`,
    url,
    "",
    `This link expires in ${expires}.`,
    ignore,
    "",
    site.emailFooter,
  ].join("\n");

  const link = escapeHtml(url);
  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:#f8fafc;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px">
    <tr><td style="padding:28px 28px 8px">
      <p style="margin:0;font-size:18px;font-weight:600">${escapeHtml(site.name)}</p>
    </td></tr>
    <tr><td style="padding:8px 28px 0;font-size:15px;line-height:1.6">
      <p style="margin:0 0 20px">${escapeHtml(reason)}</p>
      <a href="${link}" style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:10px">${escapeHtml(action)}</a>
      <p style="margin:20px 0 4px;font-size:13px;color:#64748b">Or paste this link into your browser:</p>
      <p style="margin:0;font-size:13px;word-break:break-all"><a href="${link}" style="color:#0f766e">${link}</a></p>
    </td></tr>
    <tr><td style="padding:20px 28px 28px;font-size:13px;line-height:1.6;color:#64748b">
      <p style="margin:0">This link expires in ${escapeHtml(expires)}. ${escapeHtml(ignore)}</p>
      <p style="margin:12px 0 0">${escapeHtml(site.emailFooter)}</p>
    </td></tr>
  </table>
</body>
</html>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: env.emailFrom, to: [to], subject, text, html }),
  });

  if (!response.ok) {
    throw new Error(`Resend rejected the "${subject}" email (${response.status}).`);
  }
}

export const sendVerificationEmail = (to: string, url: string) =>
  sendAccountEmail({
    to,
    subject: `Confirm your email for ${site.name}`,
    reason: `Someone created an account on ${site.name} with this email address. Confirm it's you to finish setting up your account.`,
    action: "Confirm my email",
    url,
    expires: "24 hours",
  });

export const sendPasswordResetEmail = (to: string, url: string) =>
  sendAccountEmail({
    to,
    subject: `Reset your ${site.name} password`,
    reason: `Someone asked to reset the password for the ${site.name} account with this email address.`,
    action: "Choose a new password",
    url,
    expires: "1 hour",
  });

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

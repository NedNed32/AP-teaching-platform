import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { haveIBeenPwned } from "better-auth/plugins/haveibeenpwned";
import { headers } from "next/headers";
import { site } from "@/config/site";
import { getDb } from "@/server/db/client";
import { authSchema } from "@/server/db/schema";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/server/email";
import { authFeatures, serverEnv } from "@/server/env";

async function createAuth(secret: string) {
  const env = serverEnv();
  const db = await getDb();

  return betterAuth({
    appName: site.name,
    secret,
    ...(env.authUrl ? { baseURL: env.authUrl } : {}),
    database: drizzleAdapter(db, { provider: "pg", schema: authSchema }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      // Sign in straight after sign-up. The confirmation email proves the address is theirs (for password resets),
      // but nothing waits on it.
      autoSignIn: true,
      requireEmailVerification: false,
      resetPasswordTokenExpiresIn: 60 * 60,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: ({ user, url }) => sendPasswordResetEmail(user.email, url),
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 60 * 60 * 24,
      sendVerificationEmail: ({ user, url }) => sendVerificationEmail(user.email, url),
    },
    // Per IP. Generous for sign-up, because a whole classroom can share one school IP.
    rateLimit: {
      enabled: process.env.NODE_ENV === "production",
      customRules: {
        "/sign-in/email": { window: 60, max: 10 },
        "/sign-up/email": { window: 60 * 60, max: 30 },
        "/request-password-reset": { window: 60 * 10, max: 5 },
        "/send-verification-email": { window: 60 * 10, max: 5 },
      },
    },
    plugins: [
      // Rejects passwords found in known data breaches. Only the first 5 characters
      // of the password's SHA-1 hash leave the server.
      haveIBeenPwned(),
      nextCookies(),
    ],
  });
}

export type Auth = Awaited<ReturnType<typeof createAuth>>;

const globalForAuth = globalThis as typeof globalThis & { __apAuth?: Promise<Auth> | undefined };

/** Returns `null` when accounts are not configured (guest-only mode). */
export async function getAuth(): Promise<Auth | null> {
  const secret = serverEnv().authSecret;
  if (!authFeatures().enabled || !secret) return null;
  globalForAuth.__apAuth ??= createAuth(secret).catch((error: unknown) => {
    globalForAuth.__apAuth = undefined;
    throw error;
  });
  return globalForAuth.__apAuth;
}

export async function getSessionUser() {
  const auth = await getAuth();
  if (!auth) return null;
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

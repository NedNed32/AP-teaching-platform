import "server-only";
import { site } from "@/config/site";

export interface AuthFeatures {
  /** Accounts are available only when a signing secret is configured. */
  enabled: boolean;
  /** True when account emails are really sent (not just printed to the log). */
  email: boolean;
}

const read = (name: string): string | undefined => {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
};

/** Read at request time, so one build can run with or without accounts. */
export function serverEnv() {
  return {
    authSecret: read("BETTER_AUTH_SECRET"),
    authUrl: read("BETTER_AUTH_URL"),
    databaseUrl: read("DATABASE_URL"),
    pgliteDataDir: read("PGLITE_DATA_DIR"),
    resendApiKey: read("RESEND_API_KEY"),
    emailFrom: read("EMAIL_FROM") ?? `${site.name} <onboarding@resend.dev>`,
  };
}

export function authFeatures(): AuthFeatures {
  const env = serverEnv();
  const enabled = Boolean(env.authSecret);
  return {
    enabled,
    email: Boolean(env.resendApiKey),
  };
}

"use client";

import { createAuthClient } from "better-auth/react";

/** Same-origin client; only call it when `/api/auth-config` reports accounts enabled. */
export const authClient = createAuthClient();

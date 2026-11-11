import { authFeatures } from "@/server/env";

/** Lets statically rendered pages discover at runtime whether sign-in is available. */
export function GET(): Response {
  return Response.json(authFeatures(), { headers: { "Cache-Control": "no-store" } });
}

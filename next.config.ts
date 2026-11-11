import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // `*.dev.tsx` routes (e.g. /dev/ui) exist only in development builds.
  pageExtensions: isProduction ? ["tsx", "ts"] : ["dev.tsx", "tsx", "ts"],
  // PGlite ships WASM + data files resolved relative to its own package;
  // keep it (and pg) out of the server bundle so Node loads them natively.
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  poweredByHeader: false,
};

export default nextConfig;

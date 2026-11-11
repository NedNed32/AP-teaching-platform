import "server-only";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { serverEnv } from "@/server/env";
import { schema } from "./schema";

export type Database = PgDatabase<PgQueryResultHKT, typeof schema>;

const migrationsFolder = path.join(process.cwd(), "drizzle");

const globalForDb = globalThis as typeof globalThis & { __apDb?: Promise<Database> | undefined };

/**
 * Lazily opens the database and applies pending migrations (idempotent).
 * `DATABASE_URL` → Postgres via node-postgres; otherwise an embedded PGlite
 * database on disk, so local runs need no setup.
 */
export function getDb(): Promise<Database> {
  globalForDb.__apDb ??= openDatabase().catch((error: unknown) => {
    globalForDb.__apDb = undefined;
    throw error;
  });
  return globalForDb.__apDb;
}

async function openDatabase(): Promise<Database> {
  const env = serverEnv();

  if (env.databaseUrl) {
    const [{ Pool }, { drizzle }, { migrate }] = await Promise.all([
      import("pg"),
      import("drizzle-orm/node-postgres"),
      import("drizzle-orm/node-postgres/migrator"),
    ]);
    const db = drizzle(new Pool({ connectionString: env.databaseUrl }), { schema });
    await migrate(db, { migrationsFolder });
    return db;
  }

  const [{ PGlite }, { drizzle }, { migrate }] = await Promise.all([
    import("@electric-sql/pglite"),
    import("drizzle-orm/pglite"),
    import("drizzle-orm/pglite/migrator"),
  ]);
  // Runtime-chosen location for the database files; exclude it from output file tracing.
  const dataDir = path.resolve(
    /*turbopackIgnore: true*/ env.pgliteDataDir ?? path.join(process.cwd(), ".data", "pglite"),
  );
  await mkdir(dataDir, { recursive: true });
  const db = drizzle({ client: new PGlite(dataDir), schema });
  await migrate(db, { migrationsFolder });
  return db;
}

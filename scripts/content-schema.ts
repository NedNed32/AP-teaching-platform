/**
 * npm run content:schema
 * Writes JSON Schemas for course.json and questions/*.json to content/schema/, so
 * editors (VS Code, via each file's "$schema") autocomplete keys and flag typos.
 * Rerun after changing src/lib/content/schema.ts; a test fails if they're stale.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { contentJsonSchemas } from "../src/lib/content/json-schema";

const dir = path.join(process.cwd(), "content", "schema");
mkdirSync(dir, { recursive: true });
for (const [name, schema] of Object.entries(contentJsonSchemas())) {
  writeFileSync(path.join(dir, name), `${JSON.stringify(schema, null, 2)}\n`);
  console.log(`Wrote content/schema/${name}`);
}

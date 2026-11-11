/**
 * Runs before `dev` and `build`: copies each course's assets/ folder to
 * public/courses/<course-id>/, where pages serve images and audio from.
 * public/courses is generated, so it's git-ignored; edit the files under content/.
 */
import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";

const coursesDir = path.join(process.cwd(), "content", "courses");
const target = path.join(process.cwd(), "public", "courses");

rmSync(target, { recursive: true, force: true });
let copied = 0;
for (const course of existsSync(coursesDir) ? readdirSync(coursesDir) : []) {
  const assets = path.join(coursesDir, course, "assets");
  if (!existsSync(assets)) continue;
  cpSync(assets, path.join(target, course), { recursive: true });
  copied++;
}
if (copied) console.log(`Copied assets for ${copied} course${copied === 1 ? "" : "s"} to public/courses/.`);

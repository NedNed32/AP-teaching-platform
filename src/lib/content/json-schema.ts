import { z } from "zod";
import { courseFileSchema, questionFileSchema } from "./schema";

/** JSON Schemas for the content files, keyed by file name under content/schema/. */
export function contentJsonSchemas(): Record<string, unknown> {
  // "input": what authors write, so fields with defaults stay optional.
  const options = { io: "input", unrepresentable: "any" } as const;
  return {
    "course.schema.json": { title: "course.json", ...z.toJSONSchema(courseFileSchema, options) },
    "questions.schema.json": { title: "questions/*.json", ...z.toJSONSchema(questionFileSchema, options) },
  };
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import type { Subject } from "@/lib/content/schema";

export type BadgeTone = "neutral" | "accent" | "success" | "danger" | "warn" | "info" | `subject-${Subject}`;

// Literal class names so Tailwind can see them.
const tones: Record<BadgeTone, string> = {
  neutral: "border-hairline bg-fg/5 text-fg-muted",
  accent: "border-accent/25 bg-accent/10 text-accent",
  success: "border-success/25 bg-success/10 text-success",
  danger: "border-danger/25 bg-danger/10 text-danger",
  warn: "border-warn/25 bg-warn/10 text-warn",
  info: "border-info/25 bg-info/10 text-info",
  "subject-arts": "border-subject-arts/25 bg-subject-arts/10 text-subject-arts",
  "subject-english": "border-subject-english/25 bg-subject-english/10 text-subject-english",
  "subject-history": "border-subject-history/25 bg-subject-history/10 text-subject-history",
  "subject-math-cs": "border-subject-math-cs/25 bg-subject-math-cs/10 text-subject-math-cs",
  "subject-sciences": "border-subject-sciences/25 bg-subject-sciences/10 text-subject-sciences",
  "subject-world-languages": "border-subject-world-languages/25 bg-subject-world-languages/10 text-subject-world-languages",
  "subject-capstone": "border-subject-capstone/25 bg-subject-capstone/10 text-subject-capstone",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone | undefined;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium [&_svg]:size-3",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Text and dot colour for a subject's accent (literal classes for Tailwind). */
export const subjectText: Record<Subject, string> = {
  arts: "text-subject-arts",
  english: "text-subject-english",
  history: "text-subject-history",
  "math-cs": "text-subject-math-cs",
  sciences: "text-subject-sciences",
  "world-languages": "text-subject-world-languages",
  capstone: "text-subject-capstone",
};

export const subjectDot: Record<Subject, string> = {
  arts: "bg-subject-arts",
  english: "bg-subject-english",
  history: "bg-subject-history",
  "math-cs": "bg-subject-math-cs",
  sciences: "bg-subject-sciences",
  "world-languages": "bg-subject-world-languages",
  capstone: "bg-subject-capstone",
};

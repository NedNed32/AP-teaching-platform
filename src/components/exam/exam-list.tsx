"use client";

import { ArrowRight, CircleCheck, CircleDashed, PlayCircle } from "lucide-react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/cn";
import { loadSummaries, type AttemptSummary } from "@/lib/exam/storage";
import { useIsClient } from "@/lib/hooks/use-is-client";

export function ExamList({ courseId, exams, format }: { courseId: string; exams: { number: number; slug: string }[]; format: string }) {
  const isClient = useIsClient();
  const summaries: Record<number, AttemptSummary> = isClient ? loadSummaries(courseId) : {};
  const done = Object.values(summaries).filter((s) => s.status === "done");
  const best = done.reduce<number | null>((b, s) => (s.apScore !== undefined && (b === null || s.apScore > b) ? s.apScore : b), null);
  const average = done.length ? done.reduce((sum, s) => sum + (s.composite ?? 0), 0) / done.length : null;

  return (
    <div className="space-y-6">
      <dl className="grid gap-3 sm:grid-cols-3">
        <Summary label="Exams completed" value={`${done.length} / ${exams.length}`} />
        <Summary label="Average composite" value={average === null ? "—" : `${average.toFixed(1)}%`} />
        <Summary label="Best estimated AP score" value={best === null ? "—" : String(best)} />
      </dl>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {exams.map((exam) => {
          const s = summaries[exam.number];
          return (
            <li key={exam.number}>
              <Link href={`/${courseId}/mock/${exam.slug}`} className="group block h-full rounded-2xl">
                <GlassPanel interactive className="flex h-full flex-col gap-3 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-fg">Practice exam {exam.number}</span>
                    {s?.status === "done" ? (
                      <CircleCheck aria-label="Completed" className="size-4 text-success" />
                    ) : s?.status === "in-progress" ? (
                      <PlayCircle aria-label="In progress" className="size-4 text-warn" />
                    ) : (
                      <CircleDashed aria-label="Not started" className="size-4 text-fg-subtle" />
                    )}
                  </div>
                  <p className={cn("flex-1 text-xs", s ? "text-fg" : "text-fg-muted")}>
                    {s?.status === "done"
                      ? `Score ${s.apScore} · ${s.composite?.toFixed(0)}% · MCQ ${s.mcqCorrect}/${s.mcqTotal}`
                      : s?.status === "in-progress"
                        ? "In progress, resume where you left off"
                        : format}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                    {s?.status === "done" ? "Review" : s?.status === "in-progress" ? "Resume" : "Start"}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </GlassPanel>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <GlassPanel className="p-4">
      <dt className="text-xs uppercase tracking-[0.1em] text-fg-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums text-fg">{value}</dd>
    </GlassPanel>
  );
}

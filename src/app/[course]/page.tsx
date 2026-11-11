import { ArrowRight, ArrowUpRight, BookOpen, ClipboardCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, examWeightLabel, plural, StatusBadge } from "@/components/course/course-bits";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SUBJECT_LABELS } from "@/lib/content/schema";
import { getCourse, getCourses } from "@/server/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourses().map((course) => ({ course: course.id }));
}

export async function generateMetadata({ params }: PageProps<"/[course]">): Promise<Metadata> {
  const course = getCourse((await params).course);
  return course ? { title: course.title, description: course.description } : {};
}

export default async function CoursePage({ params }: PageProps<"/[course]">) {
  const course = getCourse((await params).course);
  if (!course) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ href: "/", label: "Courses" }]} />
      <PageHeader
        className="pb-0"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={`subject-${course.subject}`}>{SUBJECT_LABELS[course.subject]}</Badge>
            <StatusBadge status={course.status} />
          </div>
        }
        title={course.title}
        description={course.description}
      />

      {course.exams.length ? (
        <Link href={`/${course.id}/mock`} className="group block rounded-2xl">
          <GlassPanel interactive className="flex flex-col gap-3 border-accent/30 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="mt-0.5 size-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold text-fg">{course.exams.length} full-length practice exams</p>
                <p className="mt-1 text-sm text-fg-muted">Timed, in the real exam format, with scoring, an estimated AP score and explanations for every question.</p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">
              Open practice exams <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </GlassPanel>
        </Link>
      ) : null}

      {course.companion ? (
        <GlassPanel className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-fg">Go deeper on {course.companion.name}</p>
            <p className="mt-1 text-sm text-fg-muted">{course.companion.description}</p>
          </div>
          <a
            href={course.companion.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            Open {course.companion.name} <ArrowUpRight className="size-4" />
          </a>
        </GlassPanel>
      ) : null}

      <ol className="space-y-4">
        {course.units.map((unit) => {
          const weight = examWeightLabel(unit.examWeight);
          return (
            <li key={unit.id}>
              <GlassPanel className="p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-lg font-semibold tracking-tight text-fg">
                    <Link href={`/${course.id}/${unit.id}`} className="hover:text-accent">
                      <span className="font-mono text-sm text-fg-muted">Unit {unit.number}</span> {unit.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-fg-muted">
                    {plural(unit.topics.length, "topic")}
                    {weight ? ` · ${weight}` : null}
                  </p>
                </div>
                <ul className="mt-4 grid gap-x-6 gap-y-1 md:grid-cols-2">
                  {unit.topics.map((topic) => (
                    <li key={topic.id}>
                      <Link
                        href={`/${course.id}/${unit.id}/${topic.id}`}
                        className="flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-sm text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg"
                      >
                        {topic.ced ? <span className="w-9 shrink-0 font-mono text-xs text-fg-subtle">{topic.ced}</span> : null}
                        <span className="flex-1">{topic.title}</span>
                        {topic.hasLesson ? <BookOpen aria-label="Lesson available" className="size-3.5 shrink-0 text-accent" /> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

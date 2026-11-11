import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/content/rich-text";
import { Breadcrumbs, examWeightLabel, plural } from "@/components/course/course-bits";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { getCourse, getCourses, getUnit } from "@/server/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourses().flatMap((course) => course.units.map((unit) => ({ course: course.id, unit: unit.id })));
}

async function resolve(params: PageProps<"/[course]/[unit]">["params"]) {
  const { course: courseId, unit: unitId } = await params;
  const course = getCourse(courseId);
  const unit = course && getUnit(course, unitId);
  return course && unit ? { course, unit } : null;
}

export async function generateMetadata({ params }: PageProps<"/[course]/[unit]">): Promise<Metadata> {
  const found = await resolve(params);
  return found ? { title: `Unit ${found.unit.number}: ${found.unit.title} · ${found.course.shortTitle ?? found.course.title}` } : {};
}

export default async function UnitPage({ params }: PageProps<"/[course]/[unit]">) {
  const found = await resolve(params);
  if (!found) notFound();
  const { course, unit } = found;
  const previous = course.units[unit.number - 2];
  const next = course.units[unit.number];
  const weight = examWeightLabel(unit.examWeight);

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ href: "/", label: "Courses" }, { href: `/${course.id}`, label: course.title }]} />
      <PageHeader
        className="pb-0"
        eyebrow={<p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Unit {unit.number}</p>}
        title={unit.title}
        description={[plural(unit.topics.length, "topic"), weight].filter(Boolean).join(" · ")}
      />

      <ol className="grid gap-3 md:grid-cols-2">
        {unit.topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/${course.id}/${unit.id}/${topic.id}`} className="block h-full rounded-2xl">
              <GlassPanel interactive className="flex h-full flex-col p-4">
                <div className="flex items-start gap-3">
                  {topic.ced ? <span className="pt-0.5 font-mono text-xs text-fg-subtle">{topic.ced}</span> : null}
                  <h2 className="flex-1 text-sm font-semibold text-fg">{topic.title}</h2>
                </div>
                {topic.summary ? (
                  <RichText text={topic.summary} className="mt-2 text-sm leading-relaxed text-fg-muted" />
                ) : null}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {topic.hasLesson ? (
                    <Badge tone="accent">
                      <BookOpen /> Lesson
                    </Badge>
                  ) : (
                    <Badge>Lesson coming soon</Badge>
                  )}
                  {topic.questionCount ? <Badge>{plural(topic.questionCount, "practice question")}</Badge> : null}
                </div>
              </GlassPanel>
            </Link>
          </li>
        ))}
      </ol>

      <nav aria-label="Units" className="flex flex-wrap justify-between gap-3 border-t border-hairline pt-6 text-sm">
        {previous ? (
          <Link href={`/${course.id}/${previous.id}`} className="inline-flex items-center gap-1 text-fg-muted hover:text-fg">
            <ChevronLeft className="size-4" /> Unit {previous.number}: {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/${course.id}/${next.id}`} className="inline-flex items-center gap-1 text-fg-muted hover:text-fg">
            Unit {next.number}: {next.title} <ChevronRight className="size-4" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

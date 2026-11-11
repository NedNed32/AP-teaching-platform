import { ChevronLeft, ChevronRight, ClipboardCheck, PenLine } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lessonComponents } from "@/components/content/lesson-components";
import { KeyTerms, LessonObjectives, LessonSources, readingMinutes, SelfChecks, TopicLinks } from "@/components/content/lesson-extras";
import { RichText } from "@/components/content/rich-text";
import { Breadcrumbs } from "@/components/course/course-bits";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/cn";
import { TopicPractice } from "@/components/exam/topic-practice";
import type { McqData } from "@/lib/exam/types";
import { getCourse, getLessonContent, getTopic, getUnit, topicRoutes } from "@/server/content";
import { topicPractice } from "@/server/exams";

export const dynamicParams = false;

export function generateStaticParams() {
  return topicRoutes();
}

async function resolve(params: PageProps<"/[course]/[unit]/[topic]">["params"]) {
  const { course: courseId, unit: unitId, topic: topicId } = await params;
  const course = getCourse(courseId);
  const unit = course && getUnit(course, unitId);
  const topic = unit && getTopic(unit, topicId);
  return course && unit && topic ? { course, unit, topic } : null;
}

export async function generateMetadata({ params }: PageProps<"/[course]/[unit]/[topic]">): Promise<Metadata> {
  const found = await resolve(params);
  if (!found) return {};
  return { title: `${found.topic.title} · ${found.course.shortTitle ?? found.course.title}` };
}

export default async function TopicPage({ params }: PageProps<"/[course]/[unit]/[topic]">) {
  const found = await resolve(params);
  if (!found) notFound();
  const { course, unit, topic } = found;
  const lesson = course.lessons.get(topic.id);
  const Lesson = await getLessonContent(course, topic.id);
  const practice = topicPractice(course, topic.id).filter((q): q is McqData => q.type === "mcq");

  // Previous and next across the whole course, so studying can continue into the next unit.
  const sequence = course.units.flatMap((u) => u.topics.map((t) => ({ unit: u, topic: t })));
  const index = sequence.findIndex((entry) => entry.topic.id === topic.id);
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  const href = (entry: { unit: { id: string }; topic: { id: string } }) => `/${course.id}/${entry.unit.id}/${entry.topic.id}`;

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Courses" },
          { href: `/${course.id}`, label: course.title },
          { href: `/${course.id}/${unit.id}`, label: `Unit ${unit.number}` },
        ]}
      />
      <header className="max-w-3xl">
        {topic.ced ? <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">Topic {topic.ced}</p> : null}
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{topic.title}</h1>
        {topic.summary ? (
          <RichText text={topic.summary} className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-fg-muted" />
        ) : null}
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0 max-w-3xl space-y-8">
          {lesson && Lesson ? (
            <>
              <LessonObjectives objectives={lesson.frontmatter.objectives ?? []} minutes={readingMinutes(lesson.body)} />
              <article className="space-y-5 text-base leading-7 text-fg/85">
                <Lesson components={lessonComponents(course.id)} />
              </article>
              {lesson.frontmatter.keyTerms?.length ? <KeyTerms terms={lesson.frontmatter.keyTerms} /> : null}
              {lesson.frontmatter.checks?.length ? <SelfChecks checks={lesson.frontmatter.checks} /> : null}
              {practice.length ? <TopicPractice questions={practice} /> : null}
              {lesson.frontmatter.sources?.length ? <LessonSources sources={lesson.frontmatter.sources} /> : null}
            </>
          ) : (
            <GlassPanel className="flex items-start gap-3 p-5">
              <PenLine className="mt-0.5 size-5 shrink-0 text-fg-subtle" />
              <div>
                <p className="font-medium text-fg">The lesson for this topic is being written</p>
                <p className="mt-1 text-sm text-fg-muted">
                  {topic.links?.length ? "Until then, the links on this page cover it." : "Check back soon."}
                </p>
              </div>
            </GlassPanel>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          {topic.links?.length ? <TopicLinks links={topic.links} /> : null}
          {course.exams.length ? (
            <Link href={`/${course.id}/mock`} className="block rounded-2xl">
              <GlassPanel interactive className="flex items-center gap-3 p-4">
                <ClipboardCheck className="size-5 shrink-0 text-accent" />
                <span className="text-sm">
                  <span className="block font-semibold text-fg">Full practice exams</span>
                  <span className="block text-xs text-fg-muted">{course.exams.length} timed exams in the AP format</span>
                </span>
              </GlassPanel>
            </Link>
          ) : null}
          <GlassPanel className="p-5">
            <h2 className="text-sm font-semibold text-fg">
              Unit {unit.number}: {unit.title}
            </h2>
            <ol className="mt-3 space-y-0.5">
              {unit.topics.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/${course.id}/${unit.id}/${t.id}`}
                    aria-current={t.id === topic.id ? "page" : undefined}
                    className={cn(
                      "flex gap-2 rounded-lg px-2 py-1.5 text-xs leading-snug transition-colors",
                      t.id === topic.id ? "bg-fg/5 font-medium text-fg" : "text-fg-muted hover:bg-fg/5 hover:text-fg",
                    )}
                  >
                    {t.ced ? <span className="w-8 shrink-0 font-mono text-fg-subtle">{t.ced}</span> : null}
                    <span>{t.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </GlassPanel>
        </aside>
      </div>

      <nav aria-label="Topics" className="flex flex-col gap-3 border-t border-hairline pt-6 text-sm sm:flex-row sm:justify-between">
        {previous ? (
          <Link href={href(previous)} className="inline-flex items-center gap-1 text-fg-muted hover:text-fg">
            <ChevronLeft className="size-4 shrink-0" /> {previous.topic.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={href(next)} className="inline-flex items-center gap-1 text-fg-muted hover:text-fg sm:text-right">
            {next.topic.title} <ChevronRight className="size-4 shrink-0" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

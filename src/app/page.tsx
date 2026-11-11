import { ArrowRight, LibraryBig } from "lucide-react";
import Link from "next/link";
import { plural, StatusBadge } from "@/components/course/course-bits";
import { PageHeader } from "@/components/layout/page-header";
import { subjectDot, subjectText } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { SUBJECT_LABELS, SUBJECTS } from "@/lib/content/schema";
import { getCourses } from "@/server/content";

export default function CatalogPage() {
  const courses = getCourses();
  const groups = SUBJECTS.map((subject) => ({ subject, courses: courses.filter((c) => c.subject === subject) })).filter(
    (group) => group.courses.length > 0,
  );

  return (
    <>
      <PageHeader eyebrow={<p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{site.name}</p>} title="Courses" description={site.description} />

      {groups.length === 0 ? (
        <GlassPanel className="flex flex-col items-center px-6 py-16 text-center">
          <LibraryBig className="size-8 text-fg-subtle" />
          <p className="mt-4 font-medium text-fg">No courses are published yet</p>
          <p className="mt-1 max-w-sm text-sm text-fg-muted">The first courses are being written. Check back soon.</p>
        </GlassPanel>
      ) : (
        <div className="space-y-10">
          {groups.map(({ subject, courses: inGroup }) => (
            <section key={subject} aria-labelledby={`subject-${subject}`}>
              <h2 id={`subject-${subject}`} className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg-muted">
                <span aria-hidden className={cn("size-2 rounded-full", subjectDot[subject])} />
                {SUBJECT_LABELS[subject]}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {inGroup.map((course) => {
                  const topics = course.units.reduce((sum, unit) => sum + unit.topics.length, 0);
                  return (
                    <li key={course.id}>
                      <Link href={`/${course.id}`} className="group block h-full rounded-2xl">
                        <GlassPanel interactive className="flex h-full flex-col p-5">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base font-semibold tracking-tight text-fg">{course.title}</h3>
                            <StatusBadge status={course.status} />
                          </div>
                          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-fg-muted">{course.description}</p>
                          <p className="mt-4 flex items-center justify-between gap-2 text-xs text-fg-muted">
                            <span>
                              {plural(course.units.length, "unit")} · {plural(topics, "topic")} · {plural(course.lessons.size, "lesson")}
                            </span>
                            <ArrowRight className={cn("size-4 transition-transform group-hover:translate-x-0.5", subjectText[subject])} />
                          </p>
                        </GlassPanel>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

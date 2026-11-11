import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamList } from "@/components/exam/exam-list";
import { Breadcrumbs } from "@/components/course/course-bits";
import { PageHeader } from "@/components/layout/page-header";
import { getCourse, getCourses } from "@/server/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourses()
    .filter((course) => course.exams.length > 0)
    .map((course) => ({ course: course.id }));
}

export async function generateMetadata({ params }: PageProps<"/[course]/mock">): Promise<Metadata> {
  const course = getCourse((await params).course);
  return course ? { title: `Practice exams · ${course.shortTitle ?? course.title}` } : {};
}

export default async function MockExamsPage({ params }: PageProps<"/[course]/mock">) {
  const course = getCourse((await params).course);
  if (!course || course.exams.length === 0) notFound();
  const sections = course.mock?.sections ?? [];
  const minutes = sections.reduce((sum, s) => sum + s.minutes, 0);
  const count = (type: "mcq" | "frq") => sections.filter((s) => s.type === type).reduce((sum, s) => sum + s.count, 0);
  const format = [count("mcq") ? `${count("mcq")} multiple choice` : "", count("frq") ? `${count("frq")} free response` : ""].filter(Boolean).join(" · ");

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Courses" },
          { href: `/${course.id}`, label: course.title },
        ]}
      />
      <PageHeader
        className="pb-0"
        eyebrow={<p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{course.exams.length} full-length exams</p>}
        title="Practice exams"
        description={`Each exam follows the ${course.title} format: ${sections
          .map((s) => `${s.count} ${s.type === "mcq" ? "multiple-choice" : "free-response"} (${s.minutes} min${s.calculator === undefined ? "" : s.calculator ? ", calculator" : ", no calculator"})`)
          .join(", ")}, about ${Math.round((minutes / 60) * 10) / 10} hours in all. Your progress is saved in this browser.`}
      />
      <ExamList courseId={course.id} exams={course.exams.map((e) => ({ number: e.number, slug: e.slug }))} format={format} />
    </div>
  );
}

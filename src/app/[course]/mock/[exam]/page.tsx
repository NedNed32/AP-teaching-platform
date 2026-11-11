import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamRunner } from "@/components/exam/exam-runner";
import { Breadcrumbs } from "@/components/course/course-bits";
import { getCourse, getCourses } from "@/server/content";
import { examData, getExam } from "@/server/exams";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourses().flatMap((course) => course.exams.map((exam) => ({ course: course.id, exam: exam.slug })));
}

async function resolve(params: PageProps<"/[course]/mock/[exam]">["params"]) {
  const { course: courseId, exam: slug } = await params;
  const course = getCourse(courseId);
  const exam = course && getExam(course, slug);
  return course && exam ? { course, exam } : null;
}

export async function generateMetadata({ params }: PageProps<"/[course]/mock/[exam]">): Promise<Metadata> {
  const found = await resolve(params);
  return found ? { title: `Practice exam ${found.exam.number} · ${found.course.shortTitle ?? found.course.title}` } : {};
}

export default async function ExamPage({ params }: PageProps<"/[course]/mock/[exam]">) {
  const found = await resolve(params);
  if (!found) notFound();
  const { course, exam } = found;

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Courses" },
          { href: `/${course.id}`, label: course.title },
          { href: `/${course.id}/mock`, label: "Practice exams" },
        ]}
      />
      <ExamRunner key={exam.number} exam={examData(course, exam)} />
    </div>
  );
}

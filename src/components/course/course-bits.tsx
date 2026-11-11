import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import type { CourseStatus } from "@/lib/content/schema";

/** Draft and Beta courses are marked; live ones need no badge. */
export function StatusBadge({ status }: { status: CourseStatus }) {
  if (status === "live") return null;
  return status === "draft" ? <Badge tone="warn">Draft</Badge> : <Badge tone="info">Beta</Badge>;
}

export function Breadcrumbs({ items }: { items: readonly { href: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-fg-muted">
      {items.map((item, index) => (
        <Fragment key={item.href}>
          {index > 0 ? <ChevronRight aria-hidden className="size-3.5 text-fg-subtle" /> : null}
          <Link href={item.href} className="hover:text-fg">
            {item.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}

/** "10–12% of the exam" */
export function examWeightLabel(weight: readonly [number, number] | undefined): string | null {
  if (!weight) return null;
  return weight[0] === weight[1] ? `${weight[0]}% of the exam` : `${weight[0]}–${weight[1]}% of the exam`;
}

export const plural = (n: number, word: string, many = `${word}s`) => `${n} ${n === 1 ? word : many}`;

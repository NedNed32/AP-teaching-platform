import { Lightbulb, NotebookPen } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RichText } from "./rich-text";

/*
 * How lesson MDX renders. The custom components here must match LESSON_COMPONENTS
 * in lib/content/mdx.ts, which decides what lessons are allowed to use.
 */

function Note({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <aside className="space-y-2 rounded-xl border border-info/25 bg-info/5 px-4 py-3 text-[0.9375rem]">
      {title ? <p className="text-sm font-semibold text-info">{title}</p> : null}
      {children}
    </aside>
  );
}

function WorkedExample({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <GlassPanel className="space-y-4 p-5 sm:p-6">
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-success">
          <NotebookPen className="size-4" /> Worked example
        </p>
        {title ? <p className="mt-2 text-lg font-semibold tracking-tight text-fg">{title}</p> : null}
      </div>
      {children}
    </GlassPanel>
  );
}

function Analogy({ breaksDown, children }: { breaksDown: string; children?: ReactNode }) {
  return (
    <aside className="space-y-3 rounded-2xl border border-warn/25 bg-warn/5 p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-warn">
        <Lightbulb className="size-4" /> An analogy
      </p>
      {children}
      <p className="text-[0.9375rem] text-fg-muted">
        <span className="font-semibold text-fg">Where it breaks down: </span>
        <RichText text={breaksDown} inline />
      </p>
    </aside>
  );
}

function figure(courseId: string) {
  return function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
    // scripts/sync-assets.ts copies content/courses/<id>/assets/ to public/courses/<id>/.
    const url = `/courses/${courseId}/${src.slice("assets/".length)}`;
    return (
      <figure className="space-y-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- lesson images have unknown sizes */}
        <img src={url} alt={alt} loading="lazy" className="mx-auto max-h-[28rem] rounded-xl border border-hairline" />
        {caption ? (
          <figcaption className="text-center text-sm text-fg-muted">
            <RichText text={caption} inline />
          </figcaption>
        ) : null}
      </figure>
    );
  };
}

function Anchor({ href = "", children, ...props }: ComponentProps<"a">) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="font-medium text-accent underline-offset-4 hover:underline"
      {...props}
    >
      {children}
    </a>
  );
}

export function lessonComponents(courseId: string): MDXComponents {
  return {
    Note,
    WorkedExample,
    Analogy,
    Figure: figure(courseId),
    h2: (props) => <h2 className="pt-2 text-xl font-semibold tracking-tight text-fg" {...props} />,
    h3: (props) => <h3 className="text-lg font-semibold tracking-tight text-fg" {...props} />,
    h4: (props) => <h4 className="font-semibold text-fg" {...props} />,
    strong: (props) => <strong className="font-semibold text-fg" {...props} />,
    a: Anchor,
    ul: (props) => <ul className="lesson-list space-y-2" {...props} />,
    ol: (props) => <ol className="lesson-steps space-y-2.5" {...props} />,
    blockquote: (props) => <blockquote className="border-l-2 border-hairline-strong pl-4 text-fg-muted" {...props} />,
    hr: () => <hr className="border-hairline" />,
    code: (props) => <code className="rounded-md bg-surface-2/70 px-1.5 py-0.5 font-mono text-[0.875em]" {...props} />,
    table: (props) => (
      <div className="overflow-x-auto rounded-xl border border-hairline">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => <th className="border-b border-hairline bg-fg/[0.03] px-3 py-2 text-left font-semibold text-fg" {...props} />,
    td: (props) => <td className="border-b border-hairline px-3 py-2 tabular-nums last:border-b-0" {...props} />,
  };
}

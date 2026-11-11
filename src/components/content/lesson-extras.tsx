import { ArrowUpRight, BookOpen, ChevronDown, ListChecks, Target } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { site } from "@/config/site";
import type { LessonFrontmatter } from "@/lib/content/schema";
import { RichText } from "./rich-text";

/*
 * The parts of a topic page built from lesson frontmatter and course.json,
 * around the MDX body. Styling follows Operon's lesson pages.
 */

const sectionHeading = "flex items-center gap-2 text-lg font-semibold tracking-tight text-fg";

const WORDS_PER_MINUTE = 200;

export function readingMinutes(body: string): number {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));
}

export function LessonObjectives({ objectives, minutes }: { objectives: readonly string[]; minutes: number }) {
  return (
    <GlassPanel className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-fg">
          <Target className="size-4 text-accent" /> What you&apos;ll learn
        </h2>
        <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
          <BookOpen className="size-3.5" /> About {minutes} min read
        </span>
      </div>
      {objectives.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-fg-muted">
          {objectives.map((objective) => (
            <li key={objective} className="flex gap-2">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <RichText text={objective} inline />
            </li>
          ))}
        </ul>
      ) : null}
    </GlassPanel>
  );
}

export function KeyTerms({ terms }: { terms: NonNullable<LessonFrontmatter["keyTerms"]> }) {
  return (
    <section className="space-y-3">
      <h2 className={sectionHeading}>Key terms</h2>
      <dl className="divide-y divide-hairline rounded-2xl border border-hairline">
        {terms.map(({ term, definition }) => (
          <div key={term} className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-fg">{term}</dt>
            <dd className="text-sm leading-relaxed text-fg-muted">
              <RichText text={definition} inline />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function SelfChecks({ checks }: { checks: NonNullable<LessonFrontmatter["checks"]> }) {
  return (
    <section className="space-y-3">
      <h2 className={sectionHeading}>
        <ListChecks className="size-5 text-accent" /> Check yourself
      </h2>
      <p className="text-sm text-fg-muted">Try answering in your head before you open each answer.</p>
      <ul className="space-y-2">
        {checks.map(({ q, a }, index) => (
          <li key={q}>
            <details className="group glass rounded-xl">
              <summary className="flex cursor-pointer list-none items-start gap-3 p-4 text-[0.9375rem] text-fg [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-sm text-accent">{index + 1}.</span>
                <span className="flex-1">
                  <RichText text={q} inline />
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent">
                  <span className="group-open:hidden">Show answer</span>
                  <span className="hidden group-open:inline">Hide</span>
                  <ChevronDown aria-hidden className="size-3.5 transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <div className="border-t border-hairline px-4 py-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                <RichText text={a} />
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LessonSources({ sources }: { sources: NonNullable<LessonFrontmatter["sources"]> }) {
  return (
    <footer className="border-t border-hairline pt-4 text-xs text-fg-muted">
      <p className="font-medium text-fg">Sources</p>
      <p className="mt-1">Written for {site.name} in our own words; facts checked against:</p>
      <ul className="mt-2 space-y-1">
        {sources.map((source) => (
          <li key={`${source.url}${source.title}`}>
            <a href={source.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              {source.title}
            </a>
            {source.publisher ? ` · ${source.publisher}` : null}
          </li>
        ))}
      </ul>
    </footer>
  );
}

/** "Go deeper" links from course.json: a companion site's full lesson, a free textbook section. */
export function TopicLinks({ links }: { links: readonly { label: string; url: string }[] }) {
  return (
    <GlassPanel className="p-5">
      <h2 className="text-sm font-semibold text-fg">Go deeper</h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.url + link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-2 rounded-lg text-sm font-medium text-accent hover:underline"
            >
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}

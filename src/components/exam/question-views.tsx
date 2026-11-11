"use client";

import { Check, X } from "lucide-react";
import { RichText } from "@/components/content/rich-text";
import { cn } from "@/lib/cn";
import type { McqData, StimulusData } from "@/lib/exam/types";

/** Shared material above a question: text, a data table and/or a graph. */
export function StimulusView({ stimulus }: { stimulus: StimulusData }) {
  return (
    <div className="space-y-3 rounded-xl border border-hairline bg-fg/[0.03] p-4 text-[0.9375rem] leading-relaxed">
      {stimulus.title ? <p className="font-semibold text-fg">{stimulus.title}</p> : null}
      {stimulus.text ? <RichText text={stimulus.text} className="text-fg/85" /> : null}
      {stimulus.table ? (
        <div className="overflow-x-auto">
          <table className="mx-auto border-collapse text-sm">
            <caption className="sr-only">{stimulus.table.caption}</caption>
            <thead>
              <tr>
                {stimulus.table.columns.map((column) => (
                  <th key={column.key} scope="col" className="border border-hairline-strong bg-fg/5 px-3 py-1.5 text-center font-semibold text-fg">
                    <RichText text={column.label} inline />
                    {column.unit ? <span className="text-fg-muted"> ({column.unit})</span> : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stimulus.table.rows.map((row, index) => (
                <tr key={index}>
                  {stimulus.table!.columns.map((column) => (
                    <td key={column.key} className="border border-hairline-strong px-3 py-1.5 text-center font-mono tabular-nums text-fg/90">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {stimulus.image ? (
        <figure className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- generated SVG graphs with intrinsic sizes */}
          <img src={stimulus.image.url} alt={stimulus.image.alt} className="mx-auto w-full max-w-md rounded-lg border border-hairline" />
          {stimulus.image.caption ? (
            <figcaption className="text-center text-sm text-fg-muted">
              <RichText text={stimulus.image.caption} inline />
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      {stimulus.source ? <p className="text-xs text-fg-muted">{stimulus.source}</p> : null}
    </div>
  );
}

const LETTERS: Record<string, string> = { a: "A", b: "B", c: "C", d: "D", e: "E" };

/**
 * The options of a multiple-choice question. While answering, a radio group;
 * with `reveal`, each option shows whether it was right and why.
 */
export function McqOptions({
  question,
  selected,
  onSelect,
  reveal = false,
}: {
  question: McqData;
  selected: string | undefined;
  onSelect?: ((id: string) => void) | undefined;
  reveal?: boolean;
}) {
  return (
    <div role="radiogroup" aria-label="Answer choices" className="space-y-2">
      {question.options.map((option) => {
        const isSelected = selected === option.id;
        const isAnswer = option.id === question.answer;
        const tone = reveal
          ? isAnswer
            ? "border-success/50 bg-success/10"
            : isSelected
              ? "border-danger/50 bg-danger/10"
              : "border-hairline opacity-80"
          : isSelected
            ? "border-accent bg-accent/10 ring-1 ring-accent"
            : "border-hairline hover:border-hairline-strong hover:bg-fg/[0.03]";
        return (
          <div key={option.id}>
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={reveal || !onSelect}
              onClick={() => onSelect?.(option.id)}
              className={cn("flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors disabled:cursor-default", tone)}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  reveal && isAnswer
                    ? "border-success bg-success text-canvas"
                    : reveal && isSelected
                      ? "border-danger bg-danger text-canvas"
                      : isSelected
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-hairline-strong text-fg-muted",
                )}
              >
                {reveal && isAnswer ? <Check className="size-3.5" /> : reveal && isSelected ? <X className="size-3.5" /> : LETTERS[option.id]}
              </span>
              <span className="min-w-0 flex-1 text-[0.9375rem] leading-relaxed text-fg">
                <RichText text={option.text} inline />
              </span>
            </button>
            {reveal && (isAnswer || isSelected) ? (
              <p className={cn("ml-9 mt-1.5 text-sm leading-relaxed", isAnswer ? "text-fg-muted" : "text-fg-muted")}>
                <RichText text={option.why} inline />
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/** Every option's reasoning, for review. */
export function OptionReasons({ question }: { question: McqData }) {
  return (
    <ul className="space-y-1.5 text-sm leading-relaxed text-fg-muted">
      {question.options.map((option) => (
        <li key={option.id} className="flex gap-2">
          <span className={cn("w-4 shrink-0 font-semibold", option.id === question.answer ? "text-success" : "text-fg-subtle")}>{LETTERS[option.id]}</span>
          <RichText text={option.why} inline />
        </li>
      ))}
    </ul>
  );
}

export const letter = (id: string | undefined) => (id ? (LETTERS[id] ?? id.toUpperCase()) : "—");

"use client";

import { ArrowRight, Dumbbell, RotateCcw } from "lucide-react";
import { useState } from "react";
import { RichText } from "@/components/content/rich-text";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { McqData } from "@/lib/exam/types";
import { McqOptions, StimulusView } from "./question-views";

/** Practice questions for one topic, one at a time, with instant feedback. */
export function TopicPractice({ questions }: { questions: McqData[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | undefined>();
  const [checked, setChecked] = useState(false);
  const [right, setRight] = useState(0);
  const [done, setDone] = useState(0);
  const question = questions[index % questions.length]!;

  const next = () => {
    setIndex(index + 1);
    setSelected(undefined);
    setChecked(false);
  };

  return (
    <section className="space-y-3" aria-labelledby="practice-heading">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="practice-heading" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-fg">
          <Dumbbell className="size-5 text-accent" /> Practice questions
        </h2>
        <p className="text-sm text-fg-muted">
          {done ? `${right} of ${done} correct · ` : ""}
          {questions.length} AP-style questions on this topic
        </p>
      </div>
      <GlassPanel className="space-y-4 p-5 sm:p-6">
        {question.stimuli.map((s) => (
          <StimulusView key={s.id} stimulus={s} />
        ))}
        <RichText text={question.stem} className="text-base leading-relaxed text-fg" />
        <McqOptions question={question} selected={selected} onSelect={checked ? undefined : setSelected} reveal={checked} />
        {checked ? (
          <div className="rounded-xl border border-info/25 bg-info/5 p-4 text-sm leading-relaxed">
            <p className="mb-1 font-semibold text-info">{selected === question.answer ? "Correct!" : "Not quite."}</p>
            <RichText text={question.explanation} className="text-fg/85" />
          </div>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
          <span className="text-xs text-fg-muted">
            Question {(index % questions.length) + 1} of {questions.length}
          </span>
          {checked ? (
            <Button size="sm" onClick={next}>
              {index % questions.length === questions.length - 1 ? (
                <>
                  Start again <RotateCcw />
                </>
              ) : (
                <>
                  Next question <ArrowRight />
                </>
              )}
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={!selected}
              onClick={() => {
                setChecked(true);
                setDone(done + 1);
                if (selected === question.answer) setRight(right + 1);
              }}
            >
              Check answer
            </Button>
          )}
        </div>
      </GlassPanel>
    </section>
  );
}

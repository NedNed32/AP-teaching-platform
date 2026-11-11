"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CalculatorIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  ListChecks,
  RotateCcw,
  Timer,
  TimerOff,
  Trophy,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RichText } from "@/components/content/rich-text";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/cn";
import { loadAttempt, saveAttempt, saveSummary, type Attempt } from "@/lib/exam/storage";
import { estimateApScore, type ExamData, type ExamSectionData, type FrqData, type McqData, type QuestionData } from "@/lib/exam/types";
import { useIsClient } from "@/lib/hooks/use-is-client";
import { letter, McqOptions, OptionReasons, StimulusView } from "./question-views";

export function ExamRunner({ exam }: { exam: ExamData }) {
  // Attempts live in localStorage, so render only on the client to avoid a hydration mismatch.
  const isClient = useIsClient();
  if (!isClient) return <GlassPanel className="h-64 animate-pulse" />;
  return <Runner exam={exam} />;
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

interface Score {
  mcqCorrect: number;
  mcqTotal: number;
  frqPoints: number;
  frqTotal: number;
  composite: number;
  apScore: number;
  sectionFractions: number[];
}

function frqPartPoints(attempt: Attempt, q: FrqData, part: FrqData["parts"][number]) {
  const raw = part.rubric.reduce((sum, row) => sum + Math.min(row.max, attempt.scores[`${q.id}:${part.id}:${row.id}`] ?? 0), 0);
  return Math.min(raw, part.maxPoints);
}

function score(exam: ExamData, attempt: Attempt): Score {
  let mcqCorrect = 0;
  let mcqTotal = 0;
  let frqPoints = 0;
  let frqTotal = 0;
  const sectionFractions = exam.sections.map((section) => {
    let got = 0;
    let max = 0;
    for (const q of section.questions) {
      if (q.type === "mcq") {
        max += 1;
        if (attempt.answers[q.id] === q.answer) got += 1;
      } else {
        for (const part of q.parts) {
          max += part.maxPoints;
          got += frqPartPoints(attempt, q, part);
        }
      }
    }
    if (section.type === "mcq") {
      mcqCorrect += got;
      mcqTotal += max;
    } else {
      frqPoints += got;
      frqTotal += max;
    }
    return max ? got / max : 0;
  });
  const totalWeight = exam.sections.reduce((s, sec) => s + sec.weight, 0) || 1;
  const composite = (exam.sections.reduce((s, sec, i) => s + sec.weight * sectionFractions[i]!, 0) / totalWeight) * 100;
  return { mcqCorrect, mcqTotal, frqPoints, frqTotal, composite, apScore: estimateApScore(composite, exam.cutoffs), sectionFractions };
}

function newAttempt(timed: boolean): Attempt {
  return { version: 1, stage: "break", section: 0, timed, answers: {}, flags: [], responses: {}, scores: {}, startedAt: Date.now() };
}

const formatTime = (ms: number) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${m}:${String(s).padStart(2, "0")}`;
};

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function Runner({ exam }: { exam: ExamData }) {
  const [attempt, setAttemptState] = useState<Attempt | null>(() => loadAttempt(exam.courseId, exam.number));
  const [index, setIndex] = useState(0);

  const setAttempt = useCallback(
    (next: Attempt | null) => {
      setAttemptState(next);
      saveAttempt(exam.courseId, exam.number, next);
      if (!next) saveSummary(exam.courseId, exam.number, null);
      else if (next.stage === "results") {
        const s = score(exam, next);
        saveSummary(exam.courseId, exam.number, {
          status: "done",
          composite: s.composite,
          apScore: s.apScore,
          mcqCorrect: s.mcqCorrect,
          mcqTotal: s.mcqTotal,
          updatedAt: Date.now(),
        });
      } else saveSummary(exam.courseId, exam.number, { status: "in-progress", updatedAt: Date.now() });
    },
    [exam],
  );

  if (!attempt) return <Intro exam={exam} onStart={(timed) => setAttempt(newAttempt(timed))} />;
  if (attempt.stage === "results") return <Results exam={exam} attempt={attempt} setAttempt={setAttempt} />;
  if (attempt.stage === "break")
    return (
      <SectionBreak
        exam={exam}
        attempt={attempt}
        onBegin={() => {
          setIndex(0);
          const section = exam.sections[attempt.section]!;
          setAttempt({ ...attempt, stage: "section", deadline: attempt.timed ? Date.now() + section.minutes * 60_000 : undefined });
        }}
        onRestart={() => setAttempt(null)}
      />
    );
  return <SectionView exam={exam} attempt={attempt} setAttempt={setAttempt} index={index} setIndex={setIndex} />;
}

// ---------------------------------------------------------------------------
// Intro and breaks
// ---------------------------------------------------------------------------

function SectionTable({ exam, current }: { exam: ExamData; current?: number }) {
  return (
    <ol className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline">
      {exam.sections.map((section, i) => (
        <li
          key={section.label}
          className={cn("flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm", current === i && "bg-accent/10", current !== undefined && i < current && "text-fg-muted")}
        >
          <span className="flex items-center gap-2 font-medium text-fg">
            {current !== undefined && i < current ? <Check className="size-4 text-success" /> : null}
            {section.label}
          </span>
          <span className="flex flex-wrap items-center gap-2 text-fg-muted">
            <span>
              {section.questions.length} {section.type === "mcq" ? "multiple-choice" : "free-response"}
            </span>
            <span aria-hidden>·</span>
            <span>{section.minutes} min</span>
            {section.calculator !== undefined ? <Badge tone={section.calculator ? "info" : "neutral"}>{section.calculator ? "Calculator" : "No calculator"}</Badge> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Intro({ exam, onStart }: { exam: ExamData; onStart: (timed: boolean) => void }) {
  const [timed, setTimed] = useState(true);
  const minutes = exam.sections.reduce((s, sec) => s + sec.minutes, 0);
  return (
    <GlassPanel className="mx-auto max-w-2xl space-y-6 p-6 sm:p-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Practice exam {exam.number} of {exam.total}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fg">Full-length {exam.courseTitle} exam</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {["One", "Two", "Three", "Four", "Five", "Six"][exam.sections.length - 1] ?? exam.sections.length} timed {exam.sections.length === 1 ? "section" : "sections"} in the format of the real exam, about {Math.round(minutes / 60 * 10) / 10} hours in total. Multiple-choice answers are scored
          automatically. For free-response questions you write your answers, then score them yourself against the rubric.
        </p>
      </div>
      <SectionTable exam={exam} />
      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-semibold text-fg">Timing</legend>
        {[
          { value: true, icon: Timer, title: "Timed", text: "Each section ends when its time runs out, as on exam day." },
          { value: false, icon: TimerOff, title: "Untimed", text: "Take as long as you need; good for learning a new unit." },
        ].map((option) => (
          <label
            key={option.title}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors",
              timed === option.value ? "border-accent bg-accent/10" : "border-hairline hover:border-hairline-strong",
            )}
          >
            <input type="radio" name="timing" className="sr-only" checked={timed === option.value} onChange={() => setTimed(option.value)} />
            <option.icon className="mt-0.5 size-5 text-accent" />
            <span>
              <span className="block text-sm font-medium text-fg">{option.title}</span>
              <span className="block text-sm text-fg-muted">{option.text}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <Button size="lg" className="w-full" onClick={() => onStart(timed)}>
        Start exam <ArrowRight />
      </Button>
    </GlassPanel>
  );
}

function SectionBreak({ exam, attempt, onBegin, onRestart }: { exam: ExamData; attempt: Attempt; onBegin: () => void; onRestart: () => void }) {
  const section = exam.sections[attempt.section]!;
  const first = attempt.section === 0;
  return (
    <GlassPanel className="mx-auto max-w-2xl space-y-6 p-6 sm:p-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{first ? "Ready when you are" : "Section complete"}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fg">Next: {section.label}</h2>
        {section.calculator !== undefined ? (
          <p className="mt-2 flex items-center gap-2 text-sm text-fg-muted">
            {section.calculator ? <Calculator className="size-4 text-info" /> : <CalculatorIcon className="size-4" />}
            {section.calculator ? "A graphing calculator is required for this section." : "No calculator is allowed in this section."}
          </p>
        ) : null}
        <p className="mt-1 text-sm text-fg-muted">
          {section.questions.length} questions · {attempt.timed ? `${section.minutes} minutes` : "untimed"}
          {section.type === "frq"
            ? section.calculator
              ? " · show your work; give decimal answers correct to three places."
              : " · write complete answers; you will score them against the rubric afterwards."
            : ""}
        </p>
      </div>
      <SectionTable exam={exam} current={attempt.section} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" onClick={onBegin}>
          Begin {section.label} <ArrowRight />
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => {
            if (window.confirm("Discard this attempt and start over?")) onRestart();
          }}
        >
          <RotateCcw /> Start over
        </Button>
      </div>
    </GlassPanel>
  );
}

// ---------------------------------------------------------------------------
// Taking a section
// ---------------------------------------------------------------------------

function SectionView({
  exam,
  attempt,
  setAttempt,
  index,
  setIndex,
}: {
  exam: ExamData;
  attempt: Attempt;
  setAttempt: (a: Attempt) => void;
  index: number;
  setIndex: (i: number) => void;
}) {
  const section = exam.sections[attempt.section]!;
  const question = section.questions[Math.min(index, section.questions.length - 1)]!;
  const [now, setNow] = useState(() => Date.now());

  const finishSection = useCallback(() => {
    const last = attempt.section >= exam.sections.length - 1;
    setAttempt(
      last
        ? { ...attempt, stage: "results", deadline: undefined, finishedAt: Date.now() }
        : { ...attempt, stage: "break", section: attempt.section + 1, deadline: undefined },
    );
  }, [attempt, exam.sections.length, setAttempt]);

  const remaining = attempt.deadline ? attempt.deadline - now : null;

  useEffect(() => {
    if (!attempt.deadline) return;
    const timer = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (attempt.deadline && t >= attempt.deadline) {
        window.clearInterval(timer);
        finishSection();
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [attempt.deadline, finishSection]);

  const select = useCallback(
    (qid: string, option: string) => setAttempt({ ...attempt, answers: { ...attempt.answers, [qid]: option } }),
    [attempt, setAttempt],
  );
  const toggleFlag = () =>
    setAttempt({ ...attempt, flags: attempt.flags.includes(question.id) ? attempt.flags.filter((f) => f !== question.id) : [...attempt.flags, question.id] });

  // Keyboard: ← → move between questions; A–D choose an option.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "TEXTAREA" || target.tagName === "INPUT" || target.isContentEditable)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowRight" && index < section.questions.length - 1) setIndex(index + 1);
      else if (event.key === "ArrowLeft" && index > 0) setIndex(index - 1);
      else if (question.type === "mcq") {
        const key = event.key.toLowerCase();
        if (question.options.some((o) => o.id === key)) select(question.id, key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, question, section.questions.length, select, setIndex]);

  const answered = (q: QuestionData) =>
    q.type === "mcq" ? !!attempt.answers[q.id] : q.parts.some((p) => (attempt.responses[`${q.id}:${p.id}`] ?? "").trim());
  const unanswered = section.questions.filter((q) => !answered(q)).length;
  const flagged = attempt.flags.includes(question.id);

  const endSection = () => {
    const message = unanswered
      ? `You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"} in this section. End the section anyway?`
      : "End this section? You can't return to it.";
    if (window.confirm(message)) finishSection();
  };

  return (
    <div className="space-y-4">
      <GlassPanel className="sticky top-2 z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-fg">{section.label}</span>
          {section.calculator !== undefined ? <Badge tone={section.calculator ? "info" : "neutral"}>{section.calculator ? "Calculator" : "No calculator"}</Badge> : null}
          <span className="text-fg-muted">
            Question {index + 1} of {section.questions.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {remaining !== null ? (
            <span
              role="timer"
              aria-live="off"
              className={cn("inline-flex items-center gap-1.5 font-mono text-sm tabular-nums", remaining < 5 * 60_000 ? "text-warn" : "text-fg")}
            >
              <Clock className="size-4" /> {formatTime(remaining)}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
              <TimerOff className="size-4" /> Untimed
            </span>
          )}
          <Button size="sm" variant="secondary" onClick={endSection}>
            End section
          </Button>
        </div>
      </GlassPanel>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <GlassPanel className="min-w-0 space-y-5 p-5 sm:p-6">
          {question.type === "mcq" ? (
            <McqQuestion question={question} number={index + 1} selected={attempt.answers[question.id]} onSelect={(o) => select(question.id, o)} />
          ) : (
            <FrqQuestion
              question={question}
              number={index + 1}
              responses={attempt.responses}
              onChange={(key, value) => setAttempt({ ...attempt, responses: { ...attempt.responses, [key]: value } })}
            />
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
            <Button variant="ghost" size="sm" disabled={index === 0} onClick={() => setIndex(index - 1)}>
              <ChevronLeft /> Previous
            </Button>
            <Button variant={flagged ? "secondary" : "ghost"} size="sm" onClick={toggleFlag} aria-pressed={flagged}>
              <Flag className={cn(flagged && "fill-warn text-warn")} /> {flagged ? "Flagged" : "Flag for review"}
            </Button>
            {index < section.questions.length - 1 ? (
              <Button size="sm" onClick={() => setIndex(index + 1)}>
                Next <ChevronRight />
              </Button>
            ) : (
              <Button size="sm" onClick={endSection}>
                Finish section <Check />
              </Button>
            )}
          </div>
        </GlassPanel>

        <GlassPanel className="h-fit space-y-3 p-4 lg:sticky lg:top-20">
          <p className="flex items-center gap-2 text-sm font-semibold text-fg">
            <ListChecks className="size-4 text-accent" /> Questions
          </p>
          <div className="grid grid-cols-6 gap-1.5 lg:grid-cols-5">
            {section.questions.map((q, i) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Question ${i + 1}${answered(q) ? ", answered" : ""}${attempt.flags.includes(q.id) ? ", flagged" : ""}`}
                aria-current={i === index ? "step" : undefined}
                className={cn(
                  "relative flex h-8 items-center justify-center rounded-lg border text-xs font-medium tabular-nums transition-colors",
                  i === index ? "border-accent ring-1 ring-accent" : "border-hairline hover:border-hairline-strong",
                  answered(q) ? "bg-accent/15 text-fg" : "text-fg-muted",
                )}
              >
                {i + 1}
                {attempt.flags.includes(q.id) ? <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-warn" /> : null}
              </button>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-fg-muted">
            {section.questions.length - unanswered} of {section.questions.length} answered.
            {section.type === "mcq" ? " Keys A–D choose; ← → move." : ""}
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}

function McqQuestion({ question, number, selected, onSelect }: { question: McqData; number: number; selected?: string | undefined; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-4">
      {question.stimuli.map((s) => (
        <StimulusView key={s.id} stimulus={s} />
      ))}
      <div className="flex gap-3 text-base leading-relaxed text-fg">
        <span className="font-mono text-sm text-fg-subtle">{number}.</span>
        <RichText text={question.stem} className="min-w-0 flex-1" />
      </div>
      <McqOptions question={question} selected={selected} onSelect={onSelect} />
    </div>
  );
}

function FrqQuestion({
  question,
  number,
  responses,
  onChange,
}: {
  question: FrqData;
  number: number;
  responses: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold tracking-tight text-fg">
        <span className="font-mono text-sm text-fg-subtle">{number}.</span> {question.title}
      </h3>
      {question.stimuli.map((s) => (
        <StimulusView key={s.id} stimulus={s} />
      ))}
      {question.parts.map((part) => {
        const key = `${question.id}:${part.id}`;
        return (
          <div key={part.id} className="space-y-2">
            <label htmlFor={key} className="flex gap-2 text-[0.9375rem] leading-relaxed text-fg">
              <span className="font-semibold">({part.id})</span>
              <RichText text={part.prompt} className="min-w-0 flex-1" />
            </label>
            <textarea
              id={key}
              value={responses[key] ?? ""}
              onChange={(e) => onChange(key, e.target.value)}
              rows={4}
              placeholder="Show your work and your answer."
              className="w-full rounded-xl border border-hairline bg-surface/60 px-3 py-2 font-mono text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Results and review
// ---------------------------------------------------------------------------

type Filter = "all" | "wrong" | "flagged" | "frq";

function Results({ exam, attempt, setAttempt }: { exam: ExamData; attempt: Attempt; setAttempt: (a: Attempt | null) => void }) {
  const s = useMemo(() => score(exam, attempt), [exam, attempt]);
  const [filter, setFilter] = useState<Filter>("all");

  const byUnit = useMemo(() => {
    const units = new Map<number, { right: number; total: number }>();
    for (const section of exam.sections)
      for (const q of section.questions) {
        if (q.type !== "mcq") continue;
        const unit = q.units[0] ?? 0;
        const entry = units.get(unit) ?? { right: 0, total: 0 };
        entry.total += 1;
        if (attempt.answers[q.id] === q.answer) entry.right += 1;
        units.set(unit, entry);
      }
    return [...units.entries()].sort((a, b) => a[0] - b[0]);
  }, [exam, attempt]);

  const minutes = attempt.finishedAt ? Math.round((attempt.finishedAt - attempt.startedAt) / 60_000) : null;
  const next = exam.number < exam.total ? exam.number + 1 : null;

  return (
    <div className="space-y-8">
      <GlassPanel className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:p-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 px-8 py-6 text-center">
          <Trophy className="size-6 text-accent" />
          <p className="mt-2 text-5xl font-semibold tracking-tight text-fg">{s.apScore}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-fg-muted">Estimated AP score</p>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-fg">Practice exam {exam.number} results</h2>
            <p className="mt-1 text-sm text-fg-muted">
              Weighted composite {s.composite.toFixed(1)}%{minutes !== null ? ` · finished in ${minutes} min` : ""}. The AP score is an estimate from typical
              score cut-offs, not an official conversion.
            </p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            <Stat label="Multiple choice" value={`${s.mcqCorrect} / ${s.mcqTotal}`} fraction={s.mcqTotal ? s.mcqCorrect / s.mcqTotal : 0} />
            <Stat
              label="Free response (self-scored)"
              value={`${s.frqPoints} / ${s.frqTotal}`}
              fraction={s.frqTotal ? s.frqPoints / s.frqTotal : 0}
              hint={s.frqPoints === 0 ? "Score your answers below with the rubrics." : undefined}
            />
          </dl>
        </div>
      </GlassPanel>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-fg">Multiple choice by unit</h2>
        <GlassPanel className="space-y-3 p-5">
          {byUnit.map(([unit, { right, total }]) => (
            <div key={unit} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 sm:grid-cols-[16rem_minmax(0,1fr)_auto]">
              <p className="truncate text-sm text-fg">
                <span className="font-mono text-xs text-fg-subtle">Unit {unit}</span> {exam.unitTitles[unit]}
              </p>
              <div className="order-3 col-span-2 h-2 overflow-hidden rounded-full bg-fg/10 sm:order-none sm:col-span-1">
                <div className={cn("h-full rounded-full", right / total >= 0.7 ? "bg-success" : right / total >= 0.4 ? "bg-warn" : "bg-danger")} style={{ width: `${(right / total) * 100}%` }} />
              </div>
              <p className="text-right font-mono text-sm tabular-nums text-fg-muted">
                {right}/{total}
              </p>
            </div>
          ))}
        </GlassPanel>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-fg">Review</h2>
          <div role="tablist" aria-label="Filter questions" className="flex flex-wrap gap-1 rounded-xl border border-hairline p-1">
            {(
              [
                ["all", "All"],
                ["wrong", "Missed"],
                ["flagged", "Flagged"],
                ["frq", "Free response"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                role="tab"
                aria-selected={filter === value}
                onClick={() => setFilter(value)}
                className={cn("rounded-lg px-3 py-1.5 text-sm transition-colors", filter === value ? "bg-accent text-accent-fg" : "text-fg-muted hover:text-fg")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {exam.sections.map((section) => (
          <ReviewSection key={section.label} section={section} attempt={attempt} filter={filter} setAttempt={setAttempt} />
        ))}
      </section>

      <div className="flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:justify-between">
        <ButtonLink href={`/${exam.courseId}/mock`} variant="ghost">
          <ArrowLeft /> All practice exams
        </ButtonLink>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            onClick={() => {
              if (window.confirm("Retake this exam? Your answers and score will be cleared.")) setAttempt(null);
            }}
          >
            <RotateCcw /> Retake
          </Button>
          {next ? (
            <ButtonLink href={`/${exam.courseId}/mock/${next}`}>
              Practice exam {next} <ArrowRight />
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, fraction, hint }: { label: string; value: string; fraction: number; hint?: string | undefined }) {
  return (
    <div className="rounded-xl border border-hairline p-4">
      <dt className="text-xs uppercase tracking-[0.1em] text-fg-muted">{label}</dt>
      <dd className="mt-1 flex items-baseline justify-between gap-2">
        <span className="text-2xl font-semibold tabular-nums text-fg">{value}</span>
        <span className="font-mono text-sm text-fg-muted">{Math.round(fraction * 100)}%</span>
      </dd>
      {hint ? <p className="mt-1 text-xs text-fg-muted">{hint}</p> : null}
    </div>
  );
}

function ReviewSection({
  section,
  attempt,
  filter,
  setAttempt,
}: {
  section: ExamSectionData;
  attempt: Attempt;
  filter: Filter;
  setAttempt: (a: Attempt) => void;
}) {
  const items = section.questions
    .map((q, i) => ({ q, number: i + 1 }))
    .filter(({ q }) => {
      if (filter === "flagged") return attempt.flags.includes(q.id);
      if (filter === "frq") return q.type === "frq";
      if (filter === "wrong") return q.type === "mcq" && attempt.answers[q.id] !== q.answer;
      return true;
    });
  if (!items.length) return null;
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-fg-muted">{section.label}</h3>
      {items.map(({ q, number }) =>
        q.type === "mcq" ? (
          <McqReview key={q.id} q={q} number={number} selected={attempt.answers[q.id]} />
        ) : (
          <FrqReview key={q.id} q={q} number={number} attempt={attempt} setAttempt={setAttempt} />
        ),
      )}
    </div>
  );
}

function McqReview({ q, number, selected }: { q: McqData; number: number; selected: string | undefined }) {
  const right = selected === q.answer;
  return (
    <details className="group glass rounded-2xl">
      <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span
          className={cn(
            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            right ? "bg-success/15 text-success" : selected ? "bg-danger/15 text-danger" : "bg-fg/10 text-fg-muted",
          )}
        >
          {number}
        </span>
        <span className="min-w-0 flex-1 text-sm leading-relaxed text-fg/90">
          <RichText text={q.stem} inline />
        </span>
        <span className="shrink-0 text-xs text-fg-muted">
          {right ? "Correct" : selected ? `You: ${letter(selected)} · Answer: ${letter(q.answer)}` : `Skipped · Answer: ${letter(q.answer)}`}
        </span>
      </summary>
      <div className="space-y-4 border-t border-hairline p-4 sm:p-5">
        {q.stimuli.map((s) => (
          <StimulusView key={s.id} stimulus={s} />
        ))}
        <McqOptions question={q} selected={selected} reveal />
        <div className="rounded-xl border border-info/25 bg-info/5 p-4 text-sm leading-relaxed">
          <p className="mb-1 font-semibold text-info">Explanation</p>
          <RichText text={q.explanation} className="text-fg/85" />
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer text-fg-muted hover:text-fg">Why each option is right or wrong</summary>
          <div className="mt-2">
            <OptionReasons question={q} />
          </div>
        </details>
      </div>
    </details>
  );
}

function FrqReview({ q, number, attempt, setAttempt }: { q: FrqData; number: number; attempt: Attempt; setAttempt: (a: Attempt) => void }) {
  const total = q.parts.reduce((s, p) => s + p.maxPoints, 0);
  const got = q.parts.reduce((s, p) => s + frqPartPoints(attempt, q, p), 0);
  return (
    <GlassPanel className="space-y-5 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h4 className="text-base font-semibold text-fg">
          <span className="font-mono text-sm text-fg-subtle">{number}.</span> {q.title}
        </h4>
        <Badge tone="accent">
          {got} / {total} points
        </Badge>
      </div>
      {q.stimuli.map((s) => (
        <StimulusView key={s.id} stimulus={s} />
      ))}
      {q.parts.map((part) => {
        const response = attempt.responses[`${q.id}:${part.id}`]?.trim();
        return (
          <div key={part.id} className="space-y-3 border-t border-hairline pt-4">
            <div className="flex gap-2 text-[0.9375rem] leading-relaxed text-fg">
              <span className="font-semibold">({part.id})</span>
              <RichText text={part.prompt} className="min-w-0 flex-1" />
            </div>
            <div className="rounded-xl border border-hairline bg-fg/[0.03] p-3">
              <p className="mb-1 text-xs uppercase tracking-[0.1em] text-fg-muted">Your answer</p>
              <p className="whitespace-pre-wrap font-mono text-sm text-fg/90">{response || "No answer written."}</p>
            </div>
            <fieldset className="space-y-2">
              <legend className="mb-1 text-xs uppercase tracking-[0.1em] text-fg-muted">Score yourself: check each point you earned</legend>
              {part.rubric.map((row) => {
                const key = `${q.id}:${part.id}:${row.id}`;
                const earned = (attempt.scores[key] ?? 0) > 0;
                return (
                  <label
                    key={row.id}
                    className={cn("flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors", earned ? "border-success/40 bg-success/10" : "border-hairline hover:border-hairline-strong")}
                  >
                    <input
                      type="checkbox"
                      checked={earned}
                      onChange={(e) => setAttempt({ ...attempt, scores: { ...attempt.scores, [key]: e.target.checked ? row.max : 0 } })}
                      className="mt-1 size-4 shrink-0 accent-[var(--success)]"
                    />
                    <span className="min-w-0 flex-1 space-y-1 text-sm leading-relaxed">
                      <RichText text={row.criterion} inline className="text-fg" />
                      {row.example ? (
                        <span className="block text-fg-muted">
                          <span className="font-medium">Model answer: </span>
                          <RichText text={row.example} inline />
                        </span>
                      ) : null}
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </div>
        );
      })}
    </GlassPanel>
  );
}

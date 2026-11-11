"use client";

import { Check } from "lucide-react";
import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface RadioCardOption<T extends string> {
  value: T;
  label: ReactNode;
  description?: ReactNode;
  /** Leading visual: an icon, a letter, a preview. */
  leading?: ReactNode;
  /** Trailing badge, e.g. "Recommended". */
  badge?: ReactNode;
  /** Extra classes for this card, e.g. result colouring. */
  className?: string | undefined;
}

interface RadioCardsProps<T extends string> {
  options: readonly RadioCardOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  "aria-label"?: string | undefined;
  "aria-labelledby"?: string | undefined;
  disabled?: boolean | undefined;
  /** Hide the selection check, e.g. when cards show their own state. */
  hideCheck?: boolean | undefined;
  className?: string | undefined;
}

/** A radio group drawn as cards, with roving focus and arrow-key selection. */
export function RadioCards<T extends string>({
  options,
  value,
  onChange,
  disabled = false,
  hideCheck = false,
  className,
  ...aria
}: RadioCardsProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = options.findIndex((option) => option.value === value);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const delta =
      event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const from = selectedIndex < 0 ? (delta > 0 ? -1 : 0) : selectedIndex;
    const next = (from + delta + options.length) % options.length;
    const option = options[next];
    if (option) {
      onChange(option.value);
      refs.current[next]?.focus();
    }
  };

  return (
    <div role="radiogroup" {...aria} aria-disabled={disabled || undefined} onKeyDown={onKeyDown} className={cn("grid gap-2", className)}>
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected || (selectedIndex < 0 && index === 0) ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "glass flex w-full items-center gap-3 rounded-xl p-3.5 text-left transition-[border-color,box-shadow,opacity] duration-150 sm:p-4",
              "disabled:cursor-default",
              !disabled && "hover:border-hairline-strong",
              // Locked groups (e.g. a revealed quiz answer) colour themselves via option.className.
              selected && !disabled && "border-accent shadow-[0_0_0_1px_var(--accent)]",
              option.className,
            )}
          >
            {option.leading ? <span className="shrink-0">{option.leading}</span> : null}
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2 text-[0.9375rem] font-medium text-fg">
                {option.label}
                {option.badge}
              </span>
              {option.description ? (
                <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">{option.description}</span>
              ) : null}
            </span>
            {hideCheck ? null : (
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  selected ? "border-accent bg-accent text-accent-fg" : "border-hairline-strong",
                )}
              >
                {selected ? <Check className="size-3" strokeWidth={3} /> : null}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

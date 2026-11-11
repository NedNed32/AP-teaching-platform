"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/cn";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string | undefined;
  className?: string | undefined;
}

export function Toggle({ label, checked, onChange, description, className }: ToggleProps) {
  const id = useId();
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {description ? (
          <p id={`${id}-desc`} className="mt-0.5 text-xs leading-relaxed text-fg-muted">
            {description}
          </p>
        ) : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? `${id}-desc` : undefined}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border p-0.5 transition-colors duration-200",
          checked ? "justify-end border-accent/40 bg-accent" : "justify-start border-hairline-strong bg-surface-2",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
          className={cn("block size-4.5 rounded-full shadow-sm", checked ? "bg-accent-fg" : "bg-fg-muted")}
        />
      </button>
    </div>
  );
}

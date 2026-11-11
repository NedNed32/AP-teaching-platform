"use client";

import { motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: readonly TabItem[];
  defaultTabId?: string | undefined;
  "aria-label": string;
  className?: string | undefined;
}

export function Tabs({ tabs, defaultTabId, className, ...aria }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(defaultTabId ?? tabs[0]?.id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.id === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    const tab = tabs[next];
    if (tab) {
      setActive(tab.id);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={aria["aria-label"]}
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto border-b border-hairline"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors",
                selected ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {tab.label}
              {selected ? (
                <motion.span
                  layoutId={`${baseId}-underline`}
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                />
              ) : null}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
          className="pt-4 focus-visible:outline-offset-4"
        >
          {tab.id === active ? tab.content : null}
        </div>
      ))}
    </div>
  );
}

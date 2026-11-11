"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useIsClient } from "@/lib/hooks/use-is-client";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string | undefined;
  side?: "right" | "bottom" | undefined;
  children: ReactNode;
  className?: string | undefined;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** Modal slide-over: Esc and backdrop close it; focus is trapped inside and restored after. */
export function Sheet({ open, onClose, title, description, side = "right", children, className }: SheetProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = nodes[0];
      const last = nodes.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!isClient) return null;

  const fromRight = side === "right";
  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-canvas/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            initial={fromRight ? { x: "100%" } : { y: "100%" }}
            animate={fromRight ? { x: 0 } : { y: 0 }}
            exit={fromRight ? { x: "100%" } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className={cn(
              "glass absolute flex flex-col bg-surface/85",
              fromRight
                ? "inset-y-0 right-0 w-full max-w-md rounded-l-3xl"
                : "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-3xl pb-[env(safe-area-inset-bottom)]",
              className,
            )}
          >
            <header className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4">
              <div>
                <h2 id={titleId} className="text-base font-semibold text-fg">
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="mt-0.5 text-sm text-fg-muted">
                    {description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 rounded-lg p-1.5 text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

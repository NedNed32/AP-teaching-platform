import { cloneElement, useId, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TooltipProps {
  content: ReactNode;
  children: ReactElement<{ "aria-describedby"?: string }>;
  side?: "top" | "bottom" | undefined;
  className?: string | undefined;
}

/** CSS-only tooltip shown on hover and keyboard focus; linked via aria-describedby. */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();
  return (
    <span className="group/tooltip relative inline-flex">
      {cloneElement(children, { "aria-describedby": id })}
      <span
        id={id}
        role="tooltip"
        className={cn(
          // display:none while hidden, so an off-screen tooltip never widens the page.
          "pointer-events-none absolute left-1/2 z-40 hidden w-max max-w-64 -translate-x-1/2 rounded-lg border border-hairline-strong bg-surface px-2.5 py-1.5 text-xs leading-snug text-fg shadow-glass",
          "group-hover/tooltip:block group-focus-within/tooltip:block",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}

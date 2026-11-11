import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a hover lift for clickable cards. */
  interactive?: boolean | undefined;
}

export function GlassPanel({ interactive = false, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-hairline-strong",
        className,
      )}
      {...props}
    />
  );
}

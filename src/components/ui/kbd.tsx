import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-hairline-strong bg-surface-2/70 px-1.5 font-mono text-[0.6875rem] text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

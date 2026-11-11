import Link from "next/link";
import { useId } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/** A placeholder mark until the site has a name: three rising steps, one per stage of a course. */
export function LogoMark({ className }: { className?: string | undefined }) {
  const gradientId = useId();
  const fill = `url(#${gradientId})`;
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--success)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill={fill} opacity="0.14" />
      <rect x="1" y="1" width="30" height="30" rx="9" fill="none" stroke={fill} strokeOpacity="0.5" />
      <rect x="7.5" y="18" width="4.5" height="7" rx="1.2" fill="var(--accent)" fillOpacity="0.55" />
      <rect x="13.75" y="13" width="4.5" height="12" rx="1.2" fill="var(--accent)" fillOpacity="0.8" />
      <rect x="20" y="7.5" width="4.5" height="17.5" rx="1.2" fill="var(--success)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string | undefined }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5 rounded-xl", className)} aria-label={`${site.name} home`}>
      <LogoMark className="transition-transform duration-300 group-hover:rotate-[-6deg]" />
      <span className="leading-tight">
        <span className="block text-[0.9375rem] font-semibold tracking-tight text-fg">{site.name}</span>
        <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-fg-muted">{site.tagline}</span>
      </span>
    </Link>
  );
}

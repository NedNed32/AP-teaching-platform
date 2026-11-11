"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isActiveItem, navItems } from "@/lib/navigation";

export function MobileNav() {
  const pathname = usePathname();
  // A bottom bar needs at least two destinations; until then the top bar's logo links home.
  if (navItems.length < 2) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-surface-glass pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-flow-col auto-cols-fr">
        {navItems.map((item) => {
          const { href, label, icon: Icon } = item;
          const active = isActiveItem(pathname, item);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium transition-colors",
                  active ? "text-accent" : "text-fg-muted hover:text-fg",
                )}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isActiveItem, navItems } from "@/lib/navigation";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-hairline bg-surface-glass backdrop-blur-xl md:flex">
      <div className="px-5 pb-6 pt-6">
        <Logo />
      </div>

      <nav aria-label="Primary" className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const { href, label, icon: Icon } = item;
            const active = isActiveItem(pathname, item);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    active ? "text-fg" : "text-fg-muted hover:bg-fg/5 hover:text-fg",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="side-nav-active"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      className="absolute inset-0 rounded-xl border border-hairline-strong bg-fg/5"
                    >
                      <span className="absolute inset-y-2.5 left-0 w-0.5 rounded-full bg-accent" />
                    </motion.span>
                  ) : null}
                  <Icon className={cn("relative size-4", active && "text-accent")} />
                  <span className="relative">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-2 border-t border-hairline p-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-medium text-fg-muted">Theme</span>
          <ThemeToggle />
        </div>
        <UserMenu />
      </div>
    </aside>
  );
}

import type { ReactNode } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/navigation";
import { MobileNav } from "./mobile-nav";
import { SideNav } from "./side-nav";
import { TopBar } from "./top-bar";

export function AppShell({ children }: { children: ReactNode }) {
  // Room for the mobile bottom bar, which only shows with two or more nav items.
  const bottomBar = navItems.length > 1;
  return (
    <div className="relative min-h-dvh">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div aria-hidden className="backdrop-grid pointer-events-none fixed inset-0 -z-10" />
      <SideNav />
      <div className="flex min-h-dvh flex-col md:pl-64">
        <TopBar />
        <main id="main" className={cn("flex-1 px-4 pt-6 sm:px-6 md:pb-12 lg:px-10 lg:pt-10", bottomBar ? "pb-28" : "pb-12")}>
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
        <footer className={cn("px-4 text-xs text-fg-subtle sm:px-6 md:pb-8 lg:px-10", bottomBar ? "pb-24" : "pb-8")}>
          <p className="mx-auto max-w-7xl border-t border-hairline pt-4">{site.trademark}</p>
        </footer>
      </div>
      <MobileNav />
    </div>
  );
}

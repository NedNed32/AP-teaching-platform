import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

/** Mobile-only header; desktop uses the side navigation. */
export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-hairline bg-surface-glass px-4 backdrop-blur-xl md:hidden">
      <Logo />
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <UserMenu compact />
      </div>
    </header>
  );
}

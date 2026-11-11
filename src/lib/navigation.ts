import { LibraryBig, type LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Whether this item is active on a path, when that's more than "the path is under href". */
  matches?: (pathname: string) => boolean;
}

export const navItems: readonly NavItem[] = [
  // Course pages live at /ap-…, so they count as part of Courses.
  { href: "/", label: "Courses", icon: LibraryBig, matches: (pathname) => pathname === "/" || pathname.startsWith("/ap-") },
];

export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export const isActiveItem = (pathname: string, item: NavItem) => item.matches?.(pathname) ?? isActivePath(pathname, item.href);

import type { ReactNode } from "react";
import { LogoMark } from "@/components/layout/logo";
import { GlassPanel } from "@/components/ui/glass-panel";

/** The centred logo, heading and panel shared by the account pages. */
export function AccountPage({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-6 sm:py-12">
      <LogoMark className="size-12" />
      <h1 className="mt-5 text-center text-2xl font-semibold tracking-tight text-fg">{title}</h1>
      {intro ? <p className="mt-2 text-center text-sm leading-relaxed text-fg-muted">{intro}</p> : null}
      <GlassPanel className="mt-8 w-full p-6">{children}</GlassPanel>
    </div>
  );
}

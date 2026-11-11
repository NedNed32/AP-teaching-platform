"use client";

import { ArrowRight, Info } from "lucide-react";
import { useState } from "react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Kbd } from "@/components/ui/kbd";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Sheet } from "@/components/ui/sheet";
import { Tabs } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip } from "@/components/ui/tooltip";
import type { Theme } from "@/lib/theme/theme";

const tones: readonly BadgeTone[] = [
  "neutral",
  "accent",
  "success",
  "danger",
  "warn",
  "info",
  "subject-arts",
  "subject-english",
  "subject-history",
  "subject-math-cs",
  "subject-sciences",
  "subject-world-languages",
  "subject-capstone",
];

const text = [
  ["text-fg", "Primary text"],
  ["text-fg-muted", "Muted text"],
  ["text-fg-subtle", "Subtle text (large / decorative only)"],
  ["text-accent", "Accent: interactive"],
  ["text-flux", "Flux: active / correct"],
  ["text-inhibit", "Inhibit: blocked"],
  ["text-warn", "Warn: misconception"],
  ["text-info", "Info"],
] as const;

export function ComponentGallery({ theme }: { theme: Theme }) {
  const [oxygen, setOxygen] = useState(0.8);
  const [cyanide, setCyanide] = useState(true);
  const [track, setTrack] = useState<"all" | "ap" | "olympiad">("all");
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <section data-theme={theme} className="space-y-4 rounded-3xl border border-hairline bg-canvas p-4 text-fg sm:p-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{theme} theme</h2>

      <GlassPanel className="space-y-3 p-5">
        {text.map(([className, label]) => (
          <p key={className} className={`text-sm ${className}`}>
            {label} <span className="font-mono text-xs opacity-70">.{className}</span>
          </p>
        ))}
      </GlassPanel>

      <GlassPanel className="flex flex-wrap gap-2 p-5">
        <Button>
          Primary <ArrowRight />
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Disabled</Button>
        <Button size="sm" variant="secondary" onClick={() => setSheetOpen(true)}>
          Open sheet
        </Button>
      </GlassPanel>

      <GlassPanel className="flex flex-wrap gap-2 p-5">
        {tones.map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </GlassPanel>

      <GlassPanel className="space-y-5 p-5">
        <label className="block space-y-1 text-sm text-fg">
          <span className="flex justify-between">
            <span>O₂ availability</span>
            <span className="font-mono text-fg-muted">{Math.round(oxygen * 100)}%</span>
          </span>
          <input type="range" min={0} max={1} step={0.05} value={oxygen} onChange={(e) => setOxygen(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
        </label>
        <Toggle
          label="Cyanide"
          description="Binds the heme a₃–CuB site of Complex IV."
          checked={cyanide}
          onChange={setCyanide}
        />
        <SegmentedControl
          aria-label="Track"
          value={track}
          onChange={setTrack}
          options={[
            { value: "all", label: "All" },
            { value: "ap", label: "AP" },
            { value: "olympiad", label: "Olympiad" },
          ]}
        />
        <div className="flex items-center gap-3 text-sm text-fg-muted">
          <Tooltip content="Tooltips appear on hover and keyboard focus.">
            <button type="button" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-fg/5">
              <Info className="size-4" /> Hover me
            </button>
          </Tooltip>
          <span>
            Step with <Kbd>←</Kbd> <Kbd>→</Kbd>
          </span>
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <Tabs
          aria-label="Example tabs"
          tabs={[
            { id: "setup", label: "Setup", content: <p className="text-sm text-fg-muted">Experimental setup panel.</p> },
            { id: "data", label: "Data", content: <p className="text-sm text-fg-muted">Results table panel.</p> },
            { id: "feedback", label: "Feedback", content: <p className="text-sm text-fg-muted">Mechanism feedback panel.</p> },
          ]}
        />
      </GlassPanel>

      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Sheet"
        description="Slide-over panel, used for the pathway controls on mobile."
      >
        <p className="text-sm text-fg-muted">
          Why does blocking Complex IV also stop the Krebs cycle, even though no Krebs enzyme is inhibited?
        </p>
      </Sheet>
    </section>
  );
}

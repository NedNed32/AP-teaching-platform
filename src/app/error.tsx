"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center py-24 text-center" role="alert">
      <p className="font-mono text-sm text-danger">Something went wrong</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-fg">This view failed to load</h1>
      <p className="mt-2 max-w-sm text-sm text-fg-muted">
        Try again. If it keeps happening, reload the page.
        {error.digest ? <span className="mt-2 block font-mono text-xs">ref {error.digest}</span> : null}
      </p>
      <Button variant="secondary" className="mt-6" onClick={reset}>
        <RotateCcw />
        Try again
      </Button>
    </div>
  );
}

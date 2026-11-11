import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-fg">This page doesn&apos;t exist</h1>
      <p className="mt-2 max-w-sm text-sm text-fg-muted">The link may be out of date, or the page hasn&apos;t been built yet.</p>
      <ButtonLink href="/" variant="secondary" className="mt-6">
        Back to courses
      </ButtonLink>
    </div>
  );
}

import type { Metadata } from "next";
import { ComponentGallery } from "@/components/dev/component-gallery";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "UI gallery", robots: { index: false } };

/** Development-only design-system gallery. The `.dev.tsx` extension keeps it out of production builds. */
export default function UiGalleryPage() {
  return (
    <>
      <PageHeader
        title="UI gallery"
        description="Every primitive rendered in both themes side by side. Contrast of the text tokens is also checked automatically in tests/theme-contrast.test.ts."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <ComponentGallery theme="dark" />
        <ComponentGallery theme="light" />
      </div>
    </>
  );
}

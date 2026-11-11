/**
 * Branding in one place. The name is a working name until a real one is chosen;
 * renaming means editing this file and the logo (components/layout/logo.tsx, app/icon.svg).
 */
export const site = {
  name: "AP-Program",
  /** Shown under the name in the logo. */
  tagline: "AP study",
  description: "Free, curated study material and practice for AP courses.",
  /** One sentence at the bottom of account emails, saying what the site is. */
  emailFooter: "AP-Program is a free study site for AP students.",
  /** Required wording when using the AP mark. */
  trademark:
    "AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site.",
} as const;

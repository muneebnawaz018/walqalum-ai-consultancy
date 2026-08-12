import type { Metadata } from "next";
import "../artifact.css";
import { ThemeStyle } from "@/components/ThemeStyle";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WalQalum · AI Partner",
  description:
    "Your AI partner for scalable growth. Agents, models and data platforms, from pilot to long after production.",
};

/**
 * The 2026 design. It carries its own stylesheet rather than the old one, so
 * the two can coexist while the remaining routes are moved across.
 */
export default function ArtifactLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <ThemeStyle />
      </head>
      {/* Extensions write their own attributes onto body before React hydrates
          (ColorZilla's cz-shortcut-listen is the usual one), which React then
          reports as a mismatch we did not cause and cannot prevent. This covers
          body's own attributes only, so a real mismatch inside the tree still
          reports. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

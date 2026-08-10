import type { Metadata } from "next";
import "../artifact.css";
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
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}

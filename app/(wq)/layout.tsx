import type { Metadata } from "next";
import "../wq.css";
import { Footer } from "@/components/wq/Footer";
import { Header } from "@/components/wq/Header";
import { SiteEffects } from "@/components/wq/SiteEffects";
import { ThemeStyle } from "@/components/ThemeStyle";
import { SITE_URL } from "@/lib/seo";
import { DEFAULT_THEME } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WalQalum · AI that makes it past the pilot",
  description:
    "An AI consultancy and engineering agency. We design and run production AI systems: agents, RAG platforms and automation pipelines, on fifteen years of real software engineering.",
};

/**
 * The 2026 design's root layout.
 *
 * A third root layout alongside `(nb)` and `(admin)`, deliberately: it carries
 * its own stylesheet and chrome, so the outgoing pages keep rendering while
 * routes move across one at a time. When the last one has moved, this becomes
 * the only site layout and `(nb)` goes.
 *
 * `data-theme` is stamped on <html> by the boot script inside `ThemeStyle`
 * before first paint, which is why the element is marked as hydration-exempt.
 */
export default function WqLayout({ children }: LayoutProps<"/">) {
  return (
    /* `data-theme` is rendered server-side at the design's default so the
       markup already carries a theme before any script runs. The boot script
       only rewrites it for a visitor who has chosen the other one, which is
       also the only case where client and server can differ — hence the
       hydration exemption. */
    <html
      lang="en"
      dir="ltr"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <head>
        <ThemeStyle />
      </head>
      <body className="wq" suppressHydrationWarning>
        <SiteEffects />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

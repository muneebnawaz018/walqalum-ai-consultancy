import type { Metadata } from "next";
import "../fonts.css";
import "../wq.css";
import "../artifact.css";
import "./admin.css";
import { ThemeStyle } from "@/components/ThemeStyle";
import { Header } from "@/components/wq/Header";
import { DEFAULT_THEME } from "@/lib/theme";

export const metadata: Metadata = {
  title: "WalQalum newsroom",
  robots: { index: false, follow: false },
};

/**
 * The newsroom's root layout.
 *
 * It carries the site's own header, unchanged and with every control on it: the
 * admin is an unlisted route, not a separate product, and an editor who lands
 * here should still be somewhere recognisable. That includes the theme toggle,
 * so the newsroom turns over with the rest of the site rather than being the one
 * screen that ignores the choice.
 *
 * Dark is the default here as everywhere, stamped server-side so the markup
 * matches what the boot script will find.
 */
export default function AdminRootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <ThemeStyle />
      </head>
      {/* `wq` brings the site's shell and the header's own styles with it.
          Same reason as the site layout for suppressHydrationWarning: browser
          extensions add attributes to body before hydration. */}
      <body className="wq admin" suppressHydrationWarning>
        <Header />
        <main id="main" className="wq-below-header">
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "../../wq.css";
import { Footer } from "@/components/wq/Footer";
import { Header } from "@/components/wq/Header";
import { SiteEffects } from "@/components/wq/SiteEffects";
import { ThemeStyle } from "@/components/ThemeStyle";
import { LocaleAlternates } from "@/components/wq/LocaleAlternates";
import { SITE_URL } from "@/lib/seo";
import { DEFAULT_THEME } from "@/lib/theme";
import { LOCALES, dirFor, hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildNav } from "@/lib/wq-menu";
import { notFound } from "next/navigation";

/** Generated rather than static, because the title and description are now
 *  per-locale strings like everything else. */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
  };
}

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
 *
 * `[lang]` sits above this layout, which makes it a *root* parameter — any
 * server component below can read it from `next/root-params` without it being
 * threaded through as a prop.
 */

/** Both locales are known at build time, so both are prerendered. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function WqLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  /* `[lang]` matches any single segment, so an unknown one — `/foo` — lands
     here too. Without this it would render the site under a nonsense locale
     instead of returning a 404. */
  if (!hasLocale(lang)) notFound();
  const locale: Locale = lang;
  const t = await getDictionary();

  return (
    /* `data-theme` is rendered server-side at the design's default so the
       markup already carries a theme before any script runs. The boot script
       only rewrites it for a visitor who has chosen the other one, which is
       also the only case where client and server can differ — hence the
       hydration exemption. */
    <html
      lang={locale}
      dir={dirFor(locale)}
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <head>
        <ThemeStyle />
        {/* Tells a crawler that these two URLs are the same page in two
            languages, rather than duplicates competing with each other.
            `x-default` names the one to serve when neither language matches.
            Rendered here rather than through `alternates` in `metadata`
            because every page under this layout needs the same pair, and the
            path is the same in both. */}
        <LocaleAlternates siteUrl={SITE_URL} />
      </head>
      <body className="wq" suppressHydrationWarning>
        <SiteEffects />
        <Header nav={buildNav(t)} labels={t.actions} aria={t.aria} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

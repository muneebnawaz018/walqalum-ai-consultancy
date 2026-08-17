"use client";

import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAG, localeHref, stripLocale } from "@/lib/i18n";

/**
 * The `hreflang` set for the page being viewed.
 *
 * A client component only so it can read the current path — it renders no
 * behaviour and no interactivity, and because client components are still
 * rendered on the server, the tags are in the HTML a crawler receives rather
 * than being added after hydration.
 *
 * The origin arrives as a prop rather than being imported: `lib/seo` reaches
 * for `next/headers`, which cannot be pulled into a client bundle.
 *
 * `x-default` points at English: it is the answer to "this visitor's language
 * is neither of yours, which one do you want them on".
 */
export function LocaleAlternates({ siteUrl }: { siteUrl: string }) {
  const bare = stripLocale(usePathname());

  return (
    <>
      {LOCALES.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={LOCALE_TAG[locale]}
          href={`${siteUrl}${localeHref(bare, locale)}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteUrl}${localeHref(bare, DEFAULT_LOCALE)}`}
      />
    </>
  );
}

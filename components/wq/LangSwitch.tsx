"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, localeHref, stripLocale, type Locale } from "@/lib/i18n";

/**
 * The language switcher.
 *
 * A link rather than a button, because switching language changes which page
 * you are on — `/about` and `/ar/about` are two documents, not two states of
 * one. As a link it can be opened in a new tab, copied, and followed by a
 * crawler, which is the whole reason the Arabic site has its own URLs.
 *
 * The target is the current path in the other locale, so the visitor stays
 * where they are instead of being dropped on the home page.
 */
export function LangSwitch({ label }: { label: string }) {
  const pathname = usePathname();

  /* `usePathname` gives the URL as the visitor sees it, so English paths are
     bare and only Arabic carries a prefix. Stripping it yields the shared,
     locale-free path that `localeHref` re-prefixes. */
  const bare = stripLocale(pathname);
  const current: Locale =
    pathname === bare ? DEFAULT_LOCALE : ((pathname.split("/")[1] ?? DEFAULT_LOCALE) as Locale);
  const next = LOCALES.find((l) => l !== current) ?? DEFAULT_LOCALE;

  return (
    <Link
      href={localeHref(bare, next)}
      className="wq-lang wq-desktop"
      aria-label={label}
      /* Tells the browser and assistive tech that the destination is in
         another language — without it a screen reader announces the Arabic
         label with an English voice. */
      lang={next}
      hrefLang={next}
    >
      {next === "ar" ? "العربية" : "English"}
    </Link>
  );
}

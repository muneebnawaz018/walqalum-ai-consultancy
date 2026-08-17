"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { DEFAULT_LOCALE, hasLocale, localeHref, type Locale } from "@/lib/i18n";

/**
 * `next/link` that keeps the visitor in the locale they are already reading.
 *
 * Every `href` in the app is written bare — `/about` — because that is the
 * English URL and the shared identity of the page. On the Arabic site those
 * same links have to point at `/ar/about`, or one click drops the reader back
 * into English.
 *
 * The locale comes from the current path rather than from a prop, so a link
 * anywhere in the client tree gets it right without being told.
 */
export function LocaleLink({ href, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const first = usePathname().split("/")[1] ?? "";
  const locale: Locale = hasLocale(first) ? first : DEFAULT_LOCALE;
  return <Link href={localeHref(href, locale)} {...rest} />;
}

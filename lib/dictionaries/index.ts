import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { ar } from "./ar";

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

/**
 * The dictionary for the current request.
 *
 * The locale is read from `next/root-params` rather than passed in, because
 * `[lang]` sits above the root layout — that makes it a root parameter, which
 * any server component can ask for directly. Threading it as a prop through
 * every section would be the same value written twenty times.
 *
 * Server components only. Client components take the strings they need as
 * props, which is why `Toggles` and `Header` are handed labels rather than
 * calling this.
 */
export async function getDictionary(): Promise<Dictionary> {
  const locale = await lang();
  if (!locale || !hasLocale(locale)) notFound();
  return DICTIONARIES[locale];
}

/** The current locale, for anything that needs it beside the words. */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!locale || !hasLocale(locale)) notFound();
  return locale;
}

export type { Dictionary };

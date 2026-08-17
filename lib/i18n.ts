/**
 * Locales, and where each one lives in the URL.
 *
 * English stays at the root — `/about`, not `/en/about` — because those URLs
 * are the ones already published and indexed, and moving them to gain symmetry
 * with Arabic would cost every one of them its history. Arabic is prefixed:
 * `/ar/about`. Internally both render the same tree under `app/[lang]`, and the
 * proxy maps the unprefixed English URLs onto it.
 *
 * The consequence to remember: a bare path and its `/en` twin would otherwise
 * be two URLs for one page, so the proxy redirects `/en/...` back to the bare
 * form rather than serving both.
 */

export const LOCALES = ["en", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** How each locale names itself, for the switcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** The `hreflang` value for each locale. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: "en",
  ar: "ar",
};

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * The first segment of every page the new site owns.
 *
 * The proxy needs this to tell a wq page from the pages the legacy layout still
 * serves (`/blog`, `/products`, `/privacy`, `/terms`), which are not localised
 * and must not be rewritten into the localised tree. Kept as data rather than
 * inferred, because a wrong guess here is a 404 on a live page.
 */
export const LOCALISED_ROOTS = ["about", "contact", "industries", "insights", "work"] as const;

/** Whether a bare pathname belongs to the localised tree. */
export function isLocalisedPath(pathname: string): boolean {
  if (pathname === "/") return true;
  const first = pathname.split("/")[1];
  return (LOCALISED_ROOTS as readonly string[]).includes(first);
}

/**
 * The public URL for a path in a given locale.
 *
 * `path` is always the bare, unprefixed form (`/about`), which is what every
 * `<Link>` in the app is written with.
 */
export function localeHref(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Strips a locale prefix back off, giving the bare path. */
export function stripLocale(pathname: string): string {
  const first = pathname.split("/")[1];
  if (first && hasLocale(first)) {
    const rest = pathname.slice(first.length + 1);
    return rest || "/";
  }
  return pathname;
}

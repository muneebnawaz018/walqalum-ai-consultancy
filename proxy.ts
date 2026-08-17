import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from "@/lib/auth-edge";
import { DEFAULT_LOCALE, hasLocale, isLocalisedPath } from "@/lib/i18n";

/**
 * Puts the unprefixed English URLs onto the localised tree.
 *
 * Every public page renders from `app/[lang]`, so `/about` has to reach
 * `/en/about` somehow. A *rewrite* does it without the visitor's URL changing,
 * which is the point: `/about` stays `/about`.
 *
 * The reverse direction is a redirect, not a rewrite. `/en/about` would
 * otherwise serve the same page at a second URL, and two URLs for one page is
 * the duplicate-content problem hreflang exists to avoid — so it is sent back
 * to the bare form permanently.
 *
 * Only the new site's paths are touched. The legacy layout still owns `/blog`,
 * `/products`, `/privacy` and `/terms`, none of which live under `[lang]`;
 * rewriting those would 404 a live page.
 */
function localeRoute(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === DEFAULT_LOCALE) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  /* Already an Arabic URL: it maps onto the tree as it stands. */
  if (hasLocale(first)) return undefined;

  if (isLocalisedPath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  return undefined;
}

/** Next 16 renames middleware to proxy; same behaviour, different name. */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Guard the admin and every mutating API route. The route handlers check the
  // session again on the server — a check here alone is never enough.
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isMutatingApi =
    pathname.startsWith("/api/posts") && req.method !== "GET" ? true : pathname.startsWith("/api/upload");

  if (isAdminPage || isMutatingApi) {
    const session = await verifySession(req.cookies.get("wq_session")?.value);
    if (!session) {
      if (isAdminPage) {
        if (pathname === "/admin") return NextResponse.next(); // the login page itself
        const url = req.nextUrl.clone();
        url.pathname = "/admin";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
      }
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
  }

  /* After the auth guard, so a signed-out visitor is bounced to the login page
     before any of this runs, and never on an API route. */
  if (!pathname.startsWith("/api/") && !isAdminPage) {
    const routed = localeRoute(req);
    if (routed) return routed;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|fonts|img|favicon.ico).*)"],
};

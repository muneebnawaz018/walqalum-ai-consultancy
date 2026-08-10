import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from "@/lib/auth-edge";

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|fonts|img|favicon.ico).*)"],
};

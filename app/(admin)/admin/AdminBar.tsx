"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Who you are, and the way out.
 *
 * The wordmark used to live here. It moved to the site header the newsroom now
 * sits under, so this carries only what that header cannot: the signed-in name
 * and sign-out. Two wordmarks stacked read as two applications.
 */
export function AdminBar({ name }: { name: string }) {
  const router = useRouter();
  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin");
    router.refresh();
  }
  return (
    <div className="admin-bar">
      <span className="who">
        {/* Still the way back to the list, which the public nav above has no
            link to. */}
        <Link href="/admin/posts">Newsroom</Link> · {name}
      </span>
      <button className="admin-btn ghost" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}

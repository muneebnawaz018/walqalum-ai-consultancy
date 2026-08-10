"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminBar({ name }: { name: string }) {
  const router = useRouter();
  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin");
    router.refresh();
  }
  return (
    <div className="admin-bar">
      {/* The wordmark is the way back to the list. Posts and New were a second
          route to the two places the page already offers: the list has its own
          Write a post, and the editor has a breadcrumb. */}
      <h1>
        <Link href="/admin/posts">
          Wal<b>Qalum</b> newsroom
        </Link>
      </h1>
      <nav>
        <span className="who">{name}</span>
        <button className="admin-btn ghost" onClick={signOut}>
          Sign out
        </button>
      </nav>
    </div>
  );
}

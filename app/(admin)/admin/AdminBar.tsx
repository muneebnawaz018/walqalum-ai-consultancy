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
      <h1>Wal<b>Qalum</b> newsroom</h1>
      <nav>
        <Link href="/admin/posts">Posts</Link>
        <Link href="/admin/posts/new">New</Link>
        <span className="who">{name}</span>
        <button className="admin-btn ghost" onClick={signOut}>
          Sign out
        </button>
      </nav>
    </div>
  );
}

import { redirect } from "next/navigation";
import { currentSession } from "@/lib/auth";
import { AuthArt } from "./AuthArt";
import { LoginForm } from "./LoginForm";

export default async function AdminLogin({ searchParams }: PageProps<"/admin">) {
  const session = await currentSession();
  const { next } = await searchParams;
  if (session) redirect(typeof next === "string" ? next : "/admin/posts");

  return (
    <div className="auth">
      <aside className="auth-side">
        <AuthArt />
        <div className="auth-side-in">
          <div>
            <span className="auth-eyebrow">Newsroom · internal</span>
            <h2 className="auth-display">Where the writing gets published.</h2>
            <ul className="auth-facts">
              <li>
                <span>01</span>Bilingual English and Arabic, one post
              </li>
              <li>
                <span>02</span>Markdown, with images straight into the body
              </li>
              <li>
                <span>03</span>Draft privately, publish when it is ready
              </li>
            </ul>
          </div>
          <p className="auth-foot">Restricted to the marketing team. This page is not linked from the site.</p>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-form">
          <span className="auth-eyebrow dark">Restricted</span>
          <h1 className="auth-h1">Sign in.</h1>
          <p className="admin-note" style={{ marginBottom: "30px" }}>
            Accounts are seeded by a script, and there is no sign-up route. If you need one, ask an engineer.
          </p>
          <LoginForm next={typeof next === "string" ? next : "/admin/posts"} />
        </div>
      </main>
    </div>
  );
}

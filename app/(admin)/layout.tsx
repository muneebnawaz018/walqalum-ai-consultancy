import type { Metadata } from "next";
import "../artifact.css";
import "./admin.css";

export const metadata: Metadata = {
  title: "WalQalum newsroom",
  robots: { index: false, follow: false },
};

/** A separate root layout: the admin shares the tokens, not the site chrome. */
export default function AdminRootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr">
      <body className="admin">{children}</body>
    </html>
  );
}

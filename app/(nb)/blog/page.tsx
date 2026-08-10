import type { Metadata } from "next";
import { Behaviour } from "@/components/nb/Behaviour";
import { Blog } from "@/components/nb/Blog";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { listPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — WalQalum",
  description: "Field notes on software, AI and delivery.",
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await listPosts();
  return (
    <>
      <Chrome route="blog" />
      <main id="main">
        <Blog posts={posts} />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

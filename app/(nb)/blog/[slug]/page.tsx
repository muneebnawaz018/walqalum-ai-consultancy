import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/nb/Article";
import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { getPost } from "@/lib/posts";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.seo?.title?.en || post.title.en} — WalQalum`,
    description: post.seo?.description?.en || post.excerpt.en,
  };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Chrome route="blog" />
      <main id="main">
        <Article post={post} />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/nb/Article";
import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { getPost } from "@/lib/posts";
import { schemaFor } from "@/lib/schema-org";

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://walqalum.com";

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seo?.title?.en || post.title.en;
  const description = post.seo?.description?.en || post.excerpt.en;
  const image = post.seo?.ogImage?.url || post.cover?.url || "";
  const absolute = image.startsWith("http") ? image : image ? `${SITE}${image}` : "";

  return {
    title: `${title} · WalQalum`,
    description,
    keywords: post.tags?.length ? post.tags : undefined,
    // Only when the editor set one: an unset canonical means this URL is it.
    alternates: post.seo?.canonical ? { canonical: post.seo.canonical } : undefined,
    robots: post.seo?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE}/blog/${post.slug}`,
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      modifiedTime: post.lastUpdatedAt ? new Date(post.lastUpdatedAt).toISOString() : undefined,
      authors: [post.authorName || post.author?.name || "WalQalum"],
      ...(absolute ? { images: [{ url: absolute, alt: post.seo?.ogImage?.alt?.en || post.cover?.alt?.en || "" }] } : {}),
    },
    twitter: {
      card: absolute ? "summary_large_image" : "summary",
      title,
      description,
      ...(absolute ? { images: [absolute] } : {}),
    },
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
      {/* One tag per block, which is what Google's own examples do. */}
      {schemaFor(post).map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

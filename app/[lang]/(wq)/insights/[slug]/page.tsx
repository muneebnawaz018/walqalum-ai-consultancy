import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EndCta, PageHead } from "@/components/wq/Page";
import { POSTS } from "@/lib/wq-content";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return post ? { title: `${post.title} · WalQalum`, description: post.meta } : {};
}

/**
 * An article.
 *
 * The Insights list and the header's panel both linked here before this route
 * existed, which meant every headline was a 404. The bodies themselves are not
 * written yet — these three headlines come from the design — so the page states
 * that plainly rather than inventing an article under someone's byline.
 */
export default async function Article({ params }: PageProps<"/[lang]/insights/[slug]">) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHead eyebrow={post.meta} title={post.title} />
      <section className="wq-wrap wq-sec-b">
        <p className="wq-lede wq-case-note">
          This piece is still being written. We publish once it says something
          we would stand behind in a review, and not before.
        </p>
      </section>
      <EndCta title="Want to talk it through instead?" />
    </>
  );
}

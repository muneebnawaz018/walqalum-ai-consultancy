import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EndCta, PageHead } from "@/components/wq/Page";
import { WORK } from "@/lib/wq-content";

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  return item
    ? { title: `${item.name} · WalQalum`, description: item.tags }
    : {};
}

/**
 * A case study.
 *
 * The write-ups are not yet cleared for publication, and the brief's rule is
 * that placeholders stay visibly labelled rather than dressed up as finished.
 * So this states plainly that the detail is pending instead of padding the page
 * with invented narrative or an unconfirmed metric.
 */
export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHead eyebrow={item.tags} title={item.name} />
      <section className="wq-wrap wq-sec-b">
        <div className="wq-card-media wq-case-media" aria-hidden="true" />
        <p className="wq-lede wq-case-note">
          The full write-up for this project is with the client for approval. We
          publish outcomes once they are confirmed, and not before.
        </p>
      </section>
      <EndCta title="Want something like this?" />
    </>
  );
}

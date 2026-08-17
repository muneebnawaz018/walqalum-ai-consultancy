import type { Metadata } from "next";
import { EndCta, PageHead, RowList } from "@/components/wq/Page";
import { getDictionary } from "@/lib/dictionaries";
import { industries } from "@/lib/wq-pages";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.meta.industriesTitle,
    description: t.meta.industriesDescription,
  };
}

/**
 * Industries.
 *
 * Replaces the design's Services tab. Built on the home page's Capabilities
 * pattern — a numbered row list — because these are the same shape of content:
 * a named thing and one honest sentence about it.
 */
export default async function Industries() {
  const t = await getDictionary();

  return (
    <>
      <PageHead
        eyebrow={t.industries.eyebrow}
        title={t.industries.titleLead}
        accent={t.industries.titleAccent}
        lede={t.industries.lede}
      />
      <section className="wq-wrap wq-sec-b">
        <RowList rows={industries(t)} />
      </section>
      <EndCta title={t.industries.ctaTitle} />
    </>
  );
}

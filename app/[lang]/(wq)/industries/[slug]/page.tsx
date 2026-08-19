import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FillText } from "@/components/wq/FillText";
import { EndCta, NextItems, PageHead, SectionHead } from "@/components/wq/Page";
import type { WorkCard } from "@/components/wq/WorkGrid";
import { WorkTiles } from "@/components/wq/WorkTiles";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";
import { workInSector } from "@/lib/wq-content";
import { SECTOR_SLUGS, industries } from "@/lib/wq-pages";

export function generateStaticParams() {
  return SECTOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = await getDictionary();
  const sector = industries(t).find((s) => s.slug === slug);
  return sector ? { title: `${sector.name} · WalQalum`, description: sector.desc } : {};
}

/**
 * One sector.
 *
 * The list page answers "which sectors"; this one answers the question a
 * visitor asks next, which is always "so what have you built for mine". That
 * makes the project grid the page, and everything above it the frame: the
 * sector's own paragraph, set large, and a plate.
 *
 * The grid is the same tile the /work index uses, without the filter — the
 * sector already is the filter. Sectors with nothing published say so rather
 * than rendering an empty row.
 */
export default async function Industry({
  params,
}: PageProps<"/[lang]/industries/[slug]">) {
  const { slug } = await params;
  const t = await getDictionary();
  const locale = await getLocale();

  const all = industries(t);
  const sector = all.find((s) => s.slug === slug);
  if (!sector) notFound();

  const items: WorkCard[] = workInSector(t, sector.slug).map((w) => ({
    slug: w.slug,
    name: w.name,
    tags: w.tags,
    href: localeHref(`/work/${w.slug}`, locale),
    image: w.image,
  }));

  const others = all
    .filter((s) => s.slug !== sector.slug)
    .map((s) => ({
      href: localeHref(`/industries/${s.slug}`, locale),
      name: s.name,
      meta: s.blurb,
    }));

  return (
    <>
      <PageHead
        eyebrow={`${sector.num} / ${t.nav.industries}`}
        title={sector.name}
        lede={sector.blurb}
      />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-card-media wq-case-media" aria-hidden="true" data-parallax-scale="">
          <Image
            src={sector.image}
            alt=""
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-wide wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.industries.whyLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
          </div>
          <FillText className="wq-statement">{sector.desc}</FillText>
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        <SectionHead
          index={t.industries.detailWorkLabel}
          title={[t.industries.detailWorkTitle]}
          link={{ href: localeHref("/work", locale), label: t.actions.allWork }}
        />
        {items.length > 0 ? (
          <WorkTiles items={items} viewLabel={t.actions.viewProject} />
        ) : (
          <p className="wq-lede wq-empty">{t.industries.detailEmpty}</p>
        )}
      </section>

      <NextItems label={t.industries.detailOtherLabel} items={others} />

      <EndCta title={t.industries.detailCta} />
    </>
  );
}

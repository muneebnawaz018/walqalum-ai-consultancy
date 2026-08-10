import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Behaviour } from "@/components/nb/Behaviour";
import { CaseStudy } from "@/components/nb/CaseStudy";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { CASES } from "@/lib/cases";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = CASES[slug];
  if (!study) return {};
  return { title: `${study.title} · WalQalum`, description: study.ch };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = CASES[slug];
  if (!study) notFound();

  return (
    <>
      <Chrome route="work" />
      <main id="main">
        <CaseStudy study={study} />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

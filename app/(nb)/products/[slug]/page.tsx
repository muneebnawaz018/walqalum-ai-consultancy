import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { Product } from "@/components/nb/Product";
import { PRODUCTS, getProduct } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: `${product.name} · WalQalum`, description: product.tagline };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <Chrome route="products" />
      <main id="main">
        <Product product={product} />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

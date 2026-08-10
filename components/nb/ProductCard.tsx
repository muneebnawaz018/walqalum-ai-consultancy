import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/products";

/** A product card, linking through to the product's own page. */
export function ProductCard({ product, sizes }: { product: Product; sizes: string }) {
  return (
    <Link className="prod" href={`/products/${product.slug}`} data-nav="product">
      <div className="shot">
        <span className={`status ${product.status}`}>{product.status === "beta" ? "Beta" : "Live"}</span>
        <Image src={`/img/${product.img}.jpg`} alt={product.name} fill sizes={sizes} />
      </div>
      <div className="pbody">
        <div className="pcat" data-en={product.cat} data-ar={product.catAr}>{product.cat}</div>
        <h3 className="display">{product.name}</h3>
        <p data-en={product.tagline} data-ar={product.taglineAr}>{product.tagline}</p>
        <div className="metric">
          <b>{product.metric}</b>
          <span data-en={product.metricLabel} data-ar={product.metricLabelAr}>{product.metricLabel}</span>
        </div>
      </div>
    </Link>
  );
}

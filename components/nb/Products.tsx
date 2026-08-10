import Link from "next/link";

import { PRODUCTS } from "@/lib/products";

import { ProductCard } from "./ProductCard";

/** The products page, converted from the 2026 design artifact. */
export function Products() {
  return (
    <section className="view" data-route="products">
      <div className="pagehead"><div className="wrap">
        <span className="eyebrow mono reveal" data-en="AI products" data-ar="منتجات الذكاء الاصطناعي">AI products</span>
        <h1 className="display reveal sweep" data-en="AI we stand behind, not just build." data-ar="ذكاءٌ اصطناعيّ ندعمه، لا نبنيه فحسب.">AI we stand behind, not just build.</h1>
        <p className="reveal" data-en="Models and agents born from client work, then hardened into products of their own. Use them off the shelf, or as a head start on something trained for you." data-ar="نماذجُ ووكلاءُ وُلدوا من عمل العملاء ثم نضجوا ليصيروا منتجاتٍ مستقلّة. استخدمها جاهزة، أو كنقطة انطلاق لشيءٍ مُدرَّبٍ لك.">Models and agents born from client work, then hardened into products of their own. Use them off the shelf, or as a head start on something trained for you.</p>
      </div></div>
      <section className="band"><div className="wrap">
        <div className="prod-grid stagger">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} sizes="(max-width: 900px) 100vw, 33vw" />
          ))}
        </div>
      </div></section>
      <section className="band"><div className="wrap">
        <div className="sec-head reveal"><div><span className="eyebrow mono" data-en="Not on the shelf?" data-ar="غير متوفّر جاهزًا؟">Not on the shelf?</span><h2 className="display sweep" style={{ marginTop: "18px" }} data-en="We'll build the one you actually need." data-ar="سنبني المنتج الذي تحتاجه فعلًا.">We&apos;ll build the one you actually need.</h2></div><div className="rt"><p data-en="Every one of these started as a model trained for a single client. Tell us the decision you want made better, and the product might follow." data-ar="بدأ كلٌّ منها كنموذجٍ دُرِّب لعميلٍ واحد. أخبِرنا بالقرار الذي تريد تحسينه، وقد يتبعه المنتج.">Every one of these started as a model trained for a single client. Tell us the decision you want made better, and the product might follow.</p><Link href="/contact" className="tlink" data-nav="contact"><span className="u" data-en="Talk to us" data-ar="تحدّث إلينا">Talk to us</span><svg className="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link></div></div>
      </div></section>
  
    </section>
  );
}

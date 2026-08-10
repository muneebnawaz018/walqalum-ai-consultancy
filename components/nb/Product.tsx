import Image from "next/image";
import Link from "next/link";

import type { Product as Item } from "@/lib/products";
import { SECTORS } from "@/lib/sectors";

/**
 * A product page: what it is, every use case it covers, what you get with it,
 * and what it plugs into. Built from the artifact's own devices, so it reads as
 * part of the site rather than a bolted-on template.
 */
export function Product({ product }: { product: Item }) {
  const sectors = product.sectors
    .map((slug) => SECTORS.find((s) => s.slug === slug))
    .filter((s): s is (typeof SECTORS)[number] => Boolean(s));

  return (
    <section className="view" data-route="product">
      <div className="pagehead"><div className="wrap">
        <div className="crumb reveal">
          <Link href="/products" data-nav="products" style={{ cursor: "pointer" }} data-en="Products" data-ar="منتجاتنا">Products</Link> <b>/</b> <span data-en={product.cat} data-ar={product.catAr}>{product.cat}</span>
        </div>
        <h1 className="display reveal sweep">{product.name}</h1>
        <p className="reveal" data-en={product.tagline} data-ar={product.taglineAr}>{product.tagline}</p>
        <div className="case-meta reveal">
          <div>
            <div className="k" data-en="Status" data-ar="الحالة">Status</div>
            <div className="v"><span className={`pill${product.status === "beta" ? " beta" : ""}`}>{product.status === "beta" ? "Beta" : "Live"}</span></div>
          </div>
          <div>
            <div className="k" data-en="Category" data-ar="الفئة">Category</div>
            <div className="v" data-en={product.cat} data-ar={product.catAr}>{product.cat}</div>
          </div>
          <div>
            <div className="k" data-en="Reported" data-ar="المُعلَن">Reported</div>
            <div className="v">{product.metric} <span style={{ color: "var(--muted)", fontSize: "14px" }} data-en={product.metricLabel} data-ar={product.metricLabelAr}>{product.metricLabel}</span></div>
          </div>
        </div>
      </div></div>

      <div className="wrap">
        <div className="case-hero reveal zoom" data-parallax="">
          <Image src={`/img/${product.img}.jpg`} alt={product.name} fill priority sizes="100vw" />
        </div>
      </div>

      <section className="band" style={{ borderTop: "1px solid var(--hair)" }}><div className="wrap">
        <div className="prose reveal fromL">
          <h3 data-en="What it does" data-ar="ما الذي يفعله">What it does</h3>
          <div className="body"><p data-en={product.lede} data-ar={product.ledeAr}>{product.lede}</p></div>
        </div>
      </div></section>

      <section className="band"><div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow mono" data-en="Use cases" data-ar="حالات الاستخدام">Use cases</span>
            <h2 className="display" style={{ marginTop: "18px" }} data-en="Everywhere teams put it to work." data-ar="حيثما تُشغّله الفرق.">Everywhere teams put it to work.</h2>
          </div>
          <div className="rt">
            <p data-en="The full set, not a highlight reel. Each one is live in production somewhere." data-ar="المجموعة كاملة، لا مختارات. كلٌّ منها يعمل في الإنتاج في مكانٍ ما.">The full set, not a highlight reel. Each one is live in production somewhere.</p>
          </div>
        </div>
        <div className="svc-list stagger">
          {product.useCases.map((u, i) => (
            <div className="svc-row" key={u.title} style={{ cursor: "default" }}>
              <div className="no">{`U/${String(i + 1).padStart(2, "0")}`}</div>
              <h3 className="display" data-en={u.title} data-ar={u.titleAr}>{u.title}</h3>
              <p data-en={u.desc} data-ar={u.descAr}>{u.desc}</p>
              <span />
            </div>
          ))}
        </div>
      </div></section>

      <section className="band"><div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow mono" data-en="Solutions" data-ar="الحلول">Solutions</span>
            <h2 className="display" style={{ marginTop: "18px" }} data-en="What you actually get." data-ar="ما تحصل عليه فعلًا.">What you actually get.</h2>
          </div>
          <div className="rt">
            <p data-en="The decisions already made for you, and the ones deliberately left to you." data-ar="القرارات المحسومة لك سلفًا، وتلك المتروكة لك عمدًا.">The decisions already made for you, and the ones deliberately left to you.</p>
          </div>
        </div>
        <div className="approach stagger">
          {product.solutions.map((s, i) => (
            <div className="appr" key={s.title}>
              <div className="no">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h4 className="display" data-en={s.title} data-ar={s.titleAr}>{s.title}</h4>
                <p data-en={s.desc} data-ar={s.descAr}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="band"><div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow mono" data-en="Fit" data-ar="التوافق">Fit</span>
            <h2 className="display" style={{ marginTop: "18px" }} data-en="Where it plugs in." data-ar="أين يتّصل.">Where it plugs in.</h2>
          </div>
          <div className="rt">
            <p data-en="Built to sit beside the systems you run today. Anything missing here is an integration we write, not a reason to replatform." data-ar="مبنيّ ليجلس إلى جانب أنظمتك اليوم. وما ينقص هنا تكاملٌ نكتبه، لا سببًا لتغيير منصّتك.">Built to sit beside the systems you run today. Anything missing here is an integration we write, not a reason to replatform.</p>
          </div>
        </div>
        <div className="reveal">
          <span className="mono" data-en="Integrations" data-ar="التكاملات">Integrations</span>
          <ul className="chips">
            {product.integrations.map((n) => <li key={n}><span>{n}</span></li>)}
          </ul>
        </div>
        <div className="reveal" style={{ marginTop: "34px" }}>
          <span className="mono" data-en="Sectors it serves" data-ar="القطاعات التي يخدمها">Sectors it serves</span>
          <ul className="chips link">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link href="/industries" data-nav="industries" data-en={s.name} data-ar={s.nameAr}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal" style={{ marginTop: "44px" }}>
          <Link href="/products" className="tlink" data-nav="products">
            <svg className="arrow" viewBox="0 0 24 24" style={{ transform: "scaleX(-1)" }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            <span className="u" data-en="Back to all products" data-ar="العودة إلى كل المنتجات">Back to all products</span>
          </Link>
        </div>
      </div></section>
    </section>
  );
}

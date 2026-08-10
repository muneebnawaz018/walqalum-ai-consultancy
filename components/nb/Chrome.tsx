import Link from "next/link";

import { SECTORS } from "@/lib/sectors";

export type NavKey = "home" | "industries" | "products" | "work" | "blog" | "about" | "contact";

/**
 * Header, mega menu, drawer and scroll progress, taken from the 2026 design
 * artifact. Bilingual text stays on data-en / data-ar attributes exactly as the
 * artifact had it — {@link Behaviour} swaps them on the client, which keeps
 * markup that carries inline emphasis (<em>) working in both languages.
 */
export function Chrome({ route }: { route?: NavKey } = {}) {
  /** The artifact underlined the current section in the header. */
  const on = (key: NavKey) => (route === key ? "active" : undefined);

  return (
    <>
      <div id="progress"></div>
      <header className="site">
        <div className="wrap"><div className="row">
          <Link href="/" className="logo" data-nav="home">Wal<b>Qalum</b></Link>
          <nav className="main">
            <span className="has-mega" style={{ position: "static" }}>
              <Link href="/industries" data-nav="industries" className={`hasmenu ${on("industries") ?? ""}`.trim()} data-en="Industries" data-ar="القطاعات">Industries</Link>
              <div className="mega"><div className="grid">
          <div className="intro">
            <div className="mono" data-en="Where we work" data-ar="أين نعمل">Where we work</div>
            <h4 className="display" data-en="Eight sectors where our AI already knows the constraints." data-ar="ثمانية قطاعات يعرف ذكاؤنا الاصطناعي قيودها سلفًا.">Eight sectors where our AI already knows the constraints.</h4>
            <p data-en="What a model may decide, and what the data looks like underneath, differ by sector. These are the four we have already shipped into." data-ar="ما يُسمح للنموذج بتقريره، وشكل البيانات تحته، يختلفان بحسب القطاع. هذه أربعة أطلقنا فيها بالفعل.">What a model may decide, and what the data looks like underneath, differ by sector. These are the four we have already shipped into.</p>
          </div>
          <div className="col">
            <h5 data-en="Sectors" data-ar="القطاعات">Sectors</h5>
            {SECTORS.slice(0, 4).map((s) => (
              <Link key={s.slug} href="/industries" data-nav="industries" data-en={s.name} data-ar={s.nameAr}>{s.name}</Link>
            ))}
          </div>
          <div className="col">
            <h5 data-en="&nbsp;" data-ar="&nbsp;">&nbsp;</h5>
            {SECTORS.slice(4).map((s) => (
              <Link key={s.slug} href="/industries" data-nav="industries" data-en={s.name} data-ar={s.nameAr}>{s.name}</Link>
            ))}
          </div>
          <div className="col">
            <h5 data-en="Also" data-ar="أيضًا">Also</h5>
            <Link href="/products" data-nav="products" data-en="AI products" data-ar="منتجات الذكاء الاصطناعي">AI products</Link>
            <Link href="/work" data-nav="work" data-en="Selected work" data-ar="أعمال مختارة">Selected work</Link>
            <Link href="/about" data-nav="about" data-en="About the firm" data-ar="عن الشركة">About the firm</Link>
            <Link href="/contact" style={{ color: "var(--accent)" }} data-nav="contact" data-en="Start a project" data-ar="ابدأ مشروعًا">Start a project</Link>
          </div>
        </div></div></span>
            <Link className={on("products")} href="/products" data-nav="products" data-en="Products" data-ar="منتجاتنا">Products</Link>
            <Link className={on("work")} href="/work" data-nav="work" data-en="Work" data-ar="أعمالنا">Work</Link>
            <Link className={on("blog")} href="/blog" data-nav="blog" data-en="Blog" data-ar="المدوّنة">Blog</Link>
            <Link className={on("about")} href="/about" data-nav="about" data-en="About" data-ar="من نحن">About</Link>
            <Link className={on("contact")} href="/contact" data-nav="contact" data-en="Contact" data-ar="تواصل">Contact</Link>
          </nav>
          <div className="head-cta">
            <button className="lang" id="langBtn" aria-label="Switch language">العربية</button>
            <button className="btn btn-primary" data-nav="contact" data-en="Start a project" data-ar="ابدأ مشروعًا">Start a project</button>
            <button className="burger" id="burger" aria-label="Open menu"><svg viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" /></svg></button>
          </div>
        </div></div>
      </header>

      <div className="drawer" id="drawer">
        <div className="top"><span className="logo">Wal<b>Qalum</b></span><button className="x" id="drawerX" aria-label="Close menu">×</button></div>
        <nav>
          <Link href="/" data-nav="home" data-en="Home" data-ar="الرئيسية">Home</Link>
          <Link href="/industries" data-nav="industries" data-en="Industries" data-ar="القطاعات">Industries</Link>
          <Link href="/products" data-nav="products" data-en="Products" data-ar="منتجاتنا">Products</Link>
          <Link href="/work" data-nav="work" data-en="Work" data-ar="أعمالنا">Work</Link>
          <Link href="/blog" data-nav="blog" data-en="Blog" data-ar="المدوّنة">Blog</Link>
          <Link href="/about" data-nav="about" data-en="About" data-ar="من نحن">About</Link>
          <Link href="/contact" data-nav="contact" data-en="Contact" data-ar="تواصل">Contact</Link>
        </nav>
        <div className="dcta">
          <button className="btn btn-primary" data-nav="contact" data-en="Start a project" data-ar="ابدأ مشروعًا">Start a project</button>
          <button className="lang btn btn-ghost" id="langBtn2" data-en="العربية" data-ar="English">العربية</button>
        </div>
      </div>
    </>
  );
}

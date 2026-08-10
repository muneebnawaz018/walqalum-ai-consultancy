import Link from "next/link";

import { SECTORS } from "@/lib/sectors";

/** Site footer and the closing CTA band. */
export function CtaBand() {
  return (
    <section className="cta-band"><div className="wrap"><div className="in">
        <div><h2 className="display" data-en="Have something worth building?" data-ar="لديك ما يستحقّ البناء؟">Have something worth building?</h2><p data-en="Tell us the outcome you're after. We'll bring the team that owns it end to end." data-ar="أخبِرنا بالنتيجة التي تريدها. سنُحضِر الفريق الذي يملكها من البداية للنهاية.">Tell us the outcome you&apos;re after. We&apos;ll bring the team that owns it end to end.</p></div>
        <div className="act"><button className="btn btn-primary magnetic" data-nav="contact" data-en="Start a project" data-ar="ابدأ مشروعًا">Start a project<svg className="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button><button className="btn btn-on-ink" data-nav="work" data-en="See our work" data-ar="شاهد أعمالنا">See our work</button></div>
      </div></div></section>
  );
}

export function Footer() {
  return (
    <>
      <footer className="site">
        <div className="wrap">
          <div className="top">
            <div><div className="brand">Wal<b>Qalum</b></div><p className="tagf" data-en="Your AI partner for scalable growth. Agents, models and data platforms, from pilot to long after production." data-ar="شريكك في الذكاء الاصطناعي لنموٍّ قابل للتوسّع. وكلاء ونماذج ومنصّات بيانات، من التجربة إلى ما بعد الإنتاج.">Your AI partner for scalable growth. Agents, models and data platforms, from pilot to long after production.</p></div>
            <div className="fcol"><h5 data-en="Explore" data-ar="استكشف">Explore</h5><Link href="/" data-nav="home" data-en="Home" data-ar="الرئيسية">Home</Link><Link href="/industries" data-nav="industries" data-en="Industries" data-ar="القطاعات">Industries</Link><Link href="/products" data-nav="products" data-en="Products" data-ar="منتجاتنا">Products</Link><Link href="/work" data-nav="work" data-en="Work" data-ar="أعمالنا">Work</Link><Link href="/blog" data-nav="blog" data-en="Blog" data-ar="المدوّنة">Blog</Link><Link href="/about" data-nav="about" data-en="About" data-ar="من نحن">About</Link><Link href="/contact" data-nav="contact" data-en="Contact" data-ar="تواصل">Contact</Link></div>
            <div className="fcol"><h5 data-en="Industries" data-ar="القطاعات">Industries</h5>{SECTORS.map((s) => (<Link key={s.slug} href="/industries" data-nav="industries" data-en={s.name} data-ar={s.nameAr}>{s.name}</Link>))}</div>
            <div className="fcol"><h5 data-en="Offices" data-ar="المكاتب">Offices</h5><a data-en="Sharjah, UAE" data-ar="الشارقة، الإمارات">Sharjah, UAE</a><a data-en="Lahore, Pakistan" data-ar="لاهور، باكستان">Lahore, Pakistan</a><a data-en="Dubbo, Australia" data-ar="دوبو، أستراليا">Dubbo, Australia</a><a href="mailto:tafseel@walqalum.com">tafseel@walqalum.com</a></div>
          </div>
          <div className="bottom">
            <span>© 2026 WalQalum</span>
            <Link href="/privacy" data-en="Privacy Policy" data-ar="سياسة الخصوصية">Privacy Policy</Link>
            <Link href="/terms" data-en="Terms & Conditions" data-ar="الشروط والأحكام">Terms & Conditions</Link>
          </div>
        </div>
      </footer>


    </>
  );
}

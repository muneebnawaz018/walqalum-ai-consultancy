import Image from "next/image";
import Link from "next/link";

/** The work page, converted from the 2026 design artifact. */
export function Work() {
  return (
    <section className="view" data-route="work">
      <div className="pagehead"><div className="wrap">
        <span className="eyebrow mono reveal" data-en="Selected work" data-ar="أعمال مختارة">Selected work</span>
        <h1 className="display reveal" data-en="Models in production, not in slides." data-ar="نماذجُ في الإنتاج، لا في الشرائح.">Models in production, not in slides.</h1>
        <p className="reveal" data-en="A sample of AI engagements across the sectors we know best. Names withheld where clients prefer it." data-ar="عيّنة من تعاقدات الذكاء الاصطناعي عبر القطاعات التي نعرفها جيّدًا. حُجبت الأسماء حيث فضّل العملاء ذلك.">A sample of AI engagements across the sectors we know best. Names withheld where clients prefer it.</p>
      </div></div>
      <section className="band"><div className="wrap">
        <div className="filters reveal" role="group">
          <button aria-pressed="true" data-en="All" data-ar="الكل">All</button>
          <button aria-pressed="false" data-en="Healthcare" data-ar="الصحة">Healthcare</button>
          <button aria-pressed="false" data-en="Finance" data-ar="المال">Finance</button>
          <button aria-pressed="false" data-en="Education" data-ar="التعليم">Education</button>
          <button aria-pressed="false" data-en="Manufacturing" data-ar="التصنيع">Manufacturing</button>
          <button aria-pressed="false" data-en="Retail" data-ar="التجزئة">Retail</button>
        </div>
        <div className="work-grid stagger">
          <Link href="/work/clinic" className="case wide" data-nav="case"><div className="img"><Image alt="Project preview" src="/img/banner.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="meta"><span className="tag" data-en="Healthcare" data-ar="الصحة">Healthcare</span><span className="yr">2024</span></div><h3 className="display" data-en="Cutting clinic no-shows by a third with predictive scheduling" data-ar="خفض تغيّب المرضى بمقدار الثلث عبر جدولة تنبّؤية">Cutting clinic no-shows by a third with predictive scheduling</h3><p data-en="A no-show risk model reallocating appointment slots in real time across a multi-site network." data-ar="منصّة مخصّصة ونموذج تعلّم آلي يُعيدان توزيع المواعيد لحظيًّا عبر شبكة متعدّدة المواقع.">A no-show risk model reallocating appointment slots in real time across a multi-site network.</p></Link>
          <Link href="/work/lending" className="case" data-nav="case"><div className="img"><Image alt="Project preview" src="/img/ps20.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="meta"><span className="tag" data-en="Finance" data-ar="المال">Finance</span><span className="yr">2023</span></div><h3 className="display" data-en="A lending back-office rebuilt for speed" data-ar="مكتب إقراض خلفي أُعيد بناؤه للسرعة">A lending back-office rebuilt for speed</h3><p data-en="Document extraction and risk scoring took 4-day manual reviews down to same-day decisions." data-ar="من مراجعات بأربعة أيام إلى قرارات في اليوم نفسه عبر محرّك قابل للتدقيق.">Document extraction and risk scoring took 4-day manual reviews down to same-day decisions.</p></Link>
          <Link href="/work/learning" className="case" data-nav="case"><div className="img"><Image alt="Project preview" src="/img/ps180.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="meta"><span className="tag" data-en="Education" data-ar="التعليم">Education</span><span className="yr">2023</span></div><h3 className="display" data-en="A learning app students actually finish" data-ar="تطبيق تعليمي يُكمله الطلاب فعلًا">A learning app students actually finish</h3><p data-en="An adaptive tutor and offline-first mobile lifted course completion by 41%." data-ar="تجربة تعمل دون اتصال وبدءٌ مُعاد تصميمه رفعا الإتمام ٤١٪.">An adaptive tutor and offline-first mobile lifted course completion by 41%.</p></Link>
          <Link href="/work/factory" className="case" data-nav="case"><div className="img"><Image alt="Project preview" src="/img/ps0.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="meta"><span className="tag" data-en="Manufacturing" data-ar="التصنيع">Manufacturing</span><span className="yr">2022</span></div><h3 className="display" data-en="Live telemetry across three plants" data-ar="قياسٌ حيّ عبر ثلاثة مصانع">Live telemetry across three plants</h3><p data-en="Predictive maintenance on unified telemetry cut unplanned downtime across three plants." data-ar="لوحة موحّدة خفّضت التوقّف غير المخطّط بدمج بيانات الآلات المتفرّقة.">Predictive maintenance on unified telemetry cut unplanned downtime across three plants.</p></Link>
          <Link href="/work/shopify" className="case" data-nav="case"><div className="img"><Image alt="Project preview" src="/img/team.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="meta"><span className="tag" data-en="Retail" data-ar="التجزئة">Retail</span><span className="yr">2022</span></div><h3 className="display" data-en="A Shopify replatform that doubled AOV" data-ar="إعادة بناء شوبيفاي ضاعفت متوسّط الطلب">A Shopify replatform that doubled AOV</h3><p data-en="Demand forecasting and model-picked bundles lifted average order value across two markets." data-ar="تجميعٌ مخصّص وصفحة دفع مُعاد بناؤها رفعا متوسّط قيمة الطلب في سوقَين.">Demand forecasting and model-picked bundles lifted average order value across two markets.</p></Link>
        </div>
      </div></section>
  
    </section>
  );
}

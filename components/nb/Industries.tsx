import { SectorTabs } from "./SectorTabs";

/**
 * The industries page. The four sectors were a section on the artifact's home
 * page; this promotes them to a page of their own, using the artifact's own
 * page head and sector tabs.
 */
export function Industries() {
  return (
    <section className="view" data-route="industries">
      <div className="pagehead"><div className="wrap">
        <span className="eyebrow mono reveal" data-en="Industries" data-ar="القطاعات">Industries</span>
        <h1 className="display reveal" data-en="Eight sectors where our AI already knows the constraints." data-ar="ثمانية قطاعات يعرف ذكاؤنا الاصطناعي قيودها سلفًا.">Eight sectors where our AI already knows the constraints.</h1>
        <p className="reveal" data-en="What a model is allowed to decide, what the data looks like, and what “production-ready” means all differ by sector. These are the eight we have already shipped into." data-ar="ما يُسمح للنموذج بتقريره، وشكل البيانات، ومعنى «الجاهزية للإنتاج» كلّها تختلف بحسب القطاع. هذه ثمانية أطلقنا فيها بالفعل.">What a model is allowed to decide, what the data looks like, and what “production-ready” means all differ by sector. These are the eight we have already shipped into.</p>
      </div></div>

    <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>            <h2 className="display" style={{ marginTop: "18px" }} data-en="Depth where it counts." data-ar="عُمقٌ حيث يهمّ.">Depth where it counts.</h2></div>
            <div className="rt"><p data-en="Eight sectors where we've learned the constraints: regulation, messy legacy data, and what ‘production-ready’ actually means." data-ar="ثمانية قطاعات تعلّمنا فيها القيود: التنظيم وفوضى البيانات القديمة ومعنى ‘الجاهزية للإنتاج’ الحقيقي.">Eight sectors where we&apos;ve learned the constraints: regulation, messy legacy data, and what ‘production-ready’ actually means.</p></div>
          </div>
          <SectorTabs />
        </div>
      </section>
    </section>
  );
}

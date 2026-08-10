import Image from "next/image";
import Link from "next/link";

/** The about page, converted from the 2026 design artifact. */
export function About() {
  return (
    <section className="view" data-route="about">
      <div className="pagehead"><div className="wrap">
        <span className="eyebrow mono reveal" data-en="About" data-ar="من نحن">About</span>
        <h1 className="display reveal sweep" data-en="We build the AI that outlasts the pilot." data-ar="نبني الأنظمة التي تبقى بعد أن يخبو الحماس.">We build the AI that outlasts the pilot.</h1>
        <p className="reveal" data-en="WalQalum started as a small team that liked hard problems and hated hand-offs. A few years on, that's still the whole idea, just with more people and more time zones." data-ar="بدأت وَالقلم كفريقٍ صغير يحبّ المشكلات الصعبة ويكره تسليم العمل من يدٍ إلى يد. وبعد سنوات، ما زالت هذه هي الفكرة كلّها، لكن بأشخاصٍ أكثر ومناطق زمنية أكثر.">WalQalum started as a small team that liked hard problems and hated hand-offs. A few years on, that&apos;s still the whole idea, just with more people and more time zones.</p>
      </div></div>

      <section className="band"><div className="wrap">
        <p className="manifesto reveal" data-en="We'd rather ship <em>one model that holds</em> than ten demos that impress." data-ar="نُفضّل أن نُطلق <em>نظامًا واحدًا يصمد</em> على عشرة عروضٍ تبهر.">We&apos;d rather ship <em>one model that holds</em> than ten demos that impress.</p>
        <div className="beliefs reveal" style={{ marginTop: "44px" }}>
          <div className="belief"><div className="bn">01</div><h4 className="display" data-en="Own the outcome" data-ar="نملك النتيجة">Own the outcome</h4><p data-en="We measure ourselves on the decision your business makes better after launch, not on model benchmarks." data-ar="نقيس أنفسنا بما يتغيّر في عملك بعد الإطلاق، لا بعدد أسطر الشيفرة.">We measure ourselves on the decision your business makes better after launch, not on model benchmarks.</p></div>
          <div className="belief"><div className="bn">02</div><h4 className="display" data-en="Small, senior, accountable" data-ar="صغيرٌ، خبير، ومسؤول">Small, senior, accountable</h4><p data-en="The people who scope the work are the people who build it, and the founders still review what ships." data-ar="من يُحدّد نطاق العمل هم من يبنونه، وما زال المؤسّسون يراجعون ما يُطلَق.">The people who scope the work are the people who build it, and the founders still review what ships.</p></div>
          <div className="belief"><div className="bn">03</div><h4 className="display" data-en="Boring where it counts" data-ar="مملٌّ حيث يجب">Boring where it counts</h4><p data-en="Clever is for the parts users see. The pipelines, evaluations and rollbacks underneath are deliberately, reliably boring." data-ar="الذكاء لِما يراه المستخدم. أمّا ما تحته فمُملٌّ عن قصدٍ وبثبات.">Clever is for the parts users see. The pipelines, evaluations and rollbacks underneath are deliberately, reliably boring.</p></div>
        </div>
      </div></section>

      <section className="band"><div className="wrap">
        <div className="sec-head reveal"><div><span className="eyebrow mono" data-en="The short version" data-ar="القصّة باختصار">The short version</span><h2 className="display sweep" style={{ marginTop: "18px" }} data-en="Eight years, three countries, one standard." data-ar="ثماني سنوات، ثلاث دول، معيارٌ واحد.">Eight years, three countries, one standard.</h2></div><div className="rt"><p data-en="How a room of four became a team that ships across time zones." data-ar="كيف صارت غرفةٌ من أربعة فريقًا يُسلّم عبر المناطق الزمنية.">How a room of four became a team that ships across time zones.</p></div></div>
        <div className="timeline">
          <div className="tl reveal fromL"><div className="yr">2018</div><div><h4 className="display" data-en="Started in Lahore" data-ar="انطلقنا في لاهور">Started in Lahore</h4><p data-en="Four engineers, one room, and a stubborn belief that an agency could actually ship." data-ar="أربعة مهندسين، غرفةٌ واحدة، وإيمانٌ عنيد بأن الوكالة تستطيع فعلًا أن تُسلّم.">Four engineers, one room, and a stubborn belief that an agency could actually ship.</p></div></div>
          <div className="tl reveal fromL"><div className="yr">2021</div><div><h4 className="display" data-en="Crossed 25 clients" data-ar="تجاوزنا 25 عميلًا">Crossed 25 clients</h4><p data-en="Healthcare, finance and commerce work taught us the constraints that actually matter." data-ar="علّمنا العمل في الصحة والمال والتجارة القيود التي تهمّ فعلًا.">Healthcare, finance and commerce work taught us the constraints that actually matter.</p></div></div>
          <div className="tl reveal fromL"><div className="yr">2023</div><div><h4 className="display" data-en="Opened in Sharjah" data-ar="افتتحنا في الشارقة">Opened in Sharjah</h4><p data-en="A UAE base put us next to the enterprise teams we were already building for." data-ar="وضعنا مقرٌّ في الإمارات بجوار فرق المؤسسات التي كنّا نبني لها أصلًا.">A UAE base put us next to the enterprise teams we were already building for.</p></div></div>
          <div className="tl reveal fromL"><div className="yr">2025</div><div><h4 className="display" data-en="Australia delivery hub" data-ar="مركز تسليم في أستراليا">Australia delivery hub</h4><p data-en="Dubbo, NSW. Genuine follow-the-sun delivery for teams that can't wait until morning." data-ar="دوبو، نيو ساوث ويلز. تسليمٌ يتبع الشمس حقًّا لفرقٍ لا تنتظر الصباح.">Dubbo, NSW. Genuine follow-the-sun delivery for teams that can&apos;t wait until morning.</p></div></div>
          <div className="tl reveal fromL"><div className="yr">2026</div><div><h4 className="display" data-en="40+ people, one standard" data-ar="أكثر من 40 شخصًا، معيارٌ واحد">40+ people, one standard</h4><p data-en="Bigger now, but the same senior team still signs off on the work." data-ar="أكبر الآن، لكن الفريق الخبير نفسه ما زال يعتمد العمل.">Bigger now, but the same senior team still signs off on the work.</p></div></div>
        </div>
      </div></section>

      <section className="band" style={{ paddingBlock: "0", borderBottom: "0" }}><div className="vmarquee reveal"><div className="vtrack">
        <span className="vitem">Own the outcome</span><span className="vitem">Ship, then iterate</span><span className="vitem">Senior by default</span><span className="vitem">Clarity over cleverness</span><span className="vitem">Accountable after launch</span><span className="vitem">Built to last</span>
        <span className="vitem">Own the outcome</span><span className="vitem">Ship, then iterate</span><span className="vitem">Senior by default</span><span className="vitem">Clarity over cleverness</span><span className="vitem">Accountable after launch</span><span className="vitem">Built to last</span>
      </div></div></section>
      <section className="band"><div className="wrap">
        <div className="sec-head reveal">
          <div><span className="eyebrow mono" data-en="Leadership" data-ar="القيادة">Leadership</span><h2 className="display" style={{ marginTop: "18px" }} data-en="The people accountable for the work." data-ar="الأشخاص المسؤولون عن العمل.">The people accountable for the work.</h2></div>
          <div className="rt"><p data-en="A senior team that still reviews what ships." data-ar="فريقٌ خبيرٌ ما زال يراجع ما يُطلَق.">A senior team that still reviews what ships.</p></div>
        </div>
        <div className="people stagger">
          <div className="person"><div className="mono">CEO</div><div className="mug"><Image alt="Team member portrait" src="/img/talha.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /><span>MT</span></div><div className="info"><h4 className="display">Muhammad Talha Khan</h4><div className="role" data-en="Chief Executive · 10+ yrs in software" data-ar="الرئيس التنفيذي · +10 سنوات في البرمجيات">Chief Executive · 10+ yrs in software</div></div></div>
          <div className="person"><div className="mono">CTO</div><div className="mug"><Image alt="Team member portrait" src="/img/taha.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /><span>MT</span></div><div className="info"><h4 className="display">Muhammad Taha Khan</h4><div className="role" data-en="Chief Technology · full-stack" data-ar="رئيس التقنية · متكامل">Chief Technology · full-stack</div></div></div>
          <div className="person"><div className="mono">PM</div><div className="mug"><Image alt="Team member portrait" src="/img/zuhaib.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /><span>ZG</span></div><div className="info"><h4 className="display">Zuhaib Ali Ghumman</h4><div className="role" data-en="Project Manager · Scrum Master" data-ar="مدير المشاريع · سكرم ماستر">Project Manager · Scrum Master</div></div></div>
          <div className="person"><div className="mono" data-en="Sr. Consultant" data-ar="مستشار أول">Sr. Consultant</div><div className="mug"><Image alt="Team member portrait" src="/img/hamaz.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /><span>HM</span></div><div className="info"><h4 className="display">Hamaz Mubashar</h4><div className="role" data-en="6+ yrs · ERP solutions" data-ar="+6 سنوات · حلول ERP">6+ yrs · ERP solutions</div></div></div>
          <div className="person"><div className="mono" data-en="Team Lead" data-ar="قائد الفريق">Team Lead</div><div className="mug"><Image alt="Team member portrait" src="/img/safeer.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /><span>SA</span></div><div className="info"><h4 className="display">Safeer Ahmad</h4><div className="role" data-en="5+ yrs · technical delivery" data-ar="+5 سنوات · التسليم التقني">5+ yrs · technical delivery</div></div></div>
          <div className="person" style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--ink)", color: "#fff", padding: "26px" }}><h4 className="display" style={{ color: "#fff", fontSize: "22px" }} data-en="40+ engineers, designers & strategists behind them." data-ar="+40 مهندسًا ومصمّمًا واستراتيجيًّا خلفهم.">40+ engineers, designers & strategists behind them.</h4><Link href="/contact" className="tlink" data-nav="contact" style={{ color: "var(--accent)", marginTop: "16px" }}><span className="u" data-en="Work with us" data-ar="اعمل معنا">Work with us</span></Link></div>
        </div>
      </div></section>
      <section className="band"><div className="wrap">
        <div className="sec-head reveal"><div><span className="eyebrow mono" data-en="Life at WalQalum" data-ar="الحياة في وَالقلم">Life at WalQalum</span><h2 className="display" style={{ marginTop: "18px" }} data-en="Forty-plus people, one standard." data-ar="أكثر من أربعين شخصًا، ومعيارٌ واحد.">Forty-plus people, one standard.</h2></div><div className="rt"><p data-en="Engineers, designers and strategists across three countries, reviewed by the same senior team that started it." data-ar="مهندسون ومصمّمون واستراتيجيون في ثلاث دول، يراجعهم الفريق الخبير نفسه الذي بدأها.">Engineers, designers and strategists across three countries, reviewed by the same senior team that started it.</p></div></div>
        <div id="teamband" className="teamband reveal"><Image alt="The WalQalum team" src="/img/team.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
      </div></section>

      <section className="band"><div className="wrap">
        <div className="sec-head reveal"><div><span className="eyebrow mono" data-en="Where we are" data-ar="أين نحن">Where we are</span><h2 className="display" style={{ marginTop: "18px" }} data-en="Three offices, three time zones." data-ar="ثلاثة مكاتب، ثلاث مناطق زمنية.">Three offices, three time zones.</h2></div><div className="rt"><p data-en="Delivery that follows the sun for teams that can't wait." data-ar="تسليمٌ يتبع الشمس لفرقٍ لا تنتظر.">Delivery that follows the sun for teams that can&apos;t wait.</p></div></div>
        <div className="offices stagger">
          <div className="office"><div className="flag">UAE</div><h4 className="display" data-en="Sharjah" data-ar="الشارقة">Sharjah</h4><p data-en="Sharjah Media City" data-ar="مدينة الشارقة للإعلام">Sharjah Media City</p><div className="ph-n" dir="ltr">+971 54 744 8002</div></div>
          <div className="office"><div className="flag">Pakistan</div><h4 className="display" data-en="Lahore" data-ar="لاهور">Lahore</h4><p data-en="Johar Town" data-ar="جوهر تاون">Johar Town</p><div className="ph-n" dir="ltr">+92 322 4696562</div></div>
          <div className="office"><div className="flag">Australia</div><h4 className="display" data-en="Dubbo, NSW" data-ar="دوبو، نيو ساوث ويلز">Dubbo, NSW</h4><p data-en="Regional delivery hub" data-ar="مركز تسليم إقليمي">Regional delivery hub</p><div className="ph-n" dir="ltr">+61 470 669 147</div></div>
        </div>
      </div></section>
  
    </section>
  );
}

import Image from "next/image";

import Link from "next/link";

import { PRODUCTS } from "@/lib/products";

import { ProductCard } from "./ProductCard";
import { SectorTabs } from "./SectorTabs";

/** The home page, converted from the 2026 design artifact. */
export function Home() {
  return (
    <section className="view" data-route="home">
      <div className="hero"><div className="wrap"><div className="grid">
        <div>
          <span className="eyebrow mono reveal" data-en="AI · Data · Software" data-ar="ذكاء اصطناعي · بيانات · برمجيات">AI · Data · Software</span>
          <h1 className="display reveal" data-en="Your <em>AI</em> partner for scalable growth." data-ar="شريكك في <em>الذكاء الاصطناعي</em> لِنموٍّ قابلٍ للتوسّع.">Your <em>AI</em> partner for scalable growth.</h1>
          <p className="sub reveal" data-en="We build the agents, models and data platforms that take teams from pilot to production across eight sectors, and keep them running long after launch." data-ar="نبني الوكلاء والنماذج ومنصّات البيانات التي تنقل الفرق من التجربة إلى الإنتاج في ثمانية قطاعات، وتُبقيها تعمل بعد الإطلاق بوقتٍ طويل.">We build the agents, models and data platforms that take teams from pilot to production across eight sectors, and keep them running long after launch.</p>
          <div className="cta reveal">
            <button className="btn btn-primary magnetic" data-nav="contact" data-en="Start a project" data-ar="ابدأ مشروعًا">Start a project<svg className="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
            <button className="btn btn-ghost" data-nav="work" data-en="See our work" data-ar="شاهد أعمالنا">See our work</button>
          </div>
        </div>
        <div className="hero-side reveal">
          <div className="ph" data-parallax=""><Image alt="WalQalum engineering team at work" src="/img/home.jpg" fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
        </div>
      </div></div></div>

      <div className="marquee"><div className="track">
        <span className="lg">AI Agents</span><span className="lg">LLM & RAG</span><span className="lg">Applied ML</span><span className="lg">Computer Vision</span><span className="lg">MLOps</span><span className="lg">Data Platforms</span><span className="lg">AI Security</span><span className="lg">Custom Software</span>
        <span className="lg">AI Agents</span><span className="lg">LLM & RAG</span><span className="lg">Applied ML</span><span className="lg">Computer Vision</span><span className="lg">MLOps</span><span className="lg">Data Platforms</span><span className="lg">AI Security</span><span className="lg">Custom Software</span>
      </div></div>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow mono" data-en="AI capabilities" data-ar="قدرات الذكاء الاصطناعي">AI capabilities</span>
              <h2 className="display" style={{ marginTop: "18px" }} data-en="Everything an AI product needs, under one roof." data-ar="كل ما يحتاجه منتج الذكاء الاصطناعي، تحت سقفٍ واحد.">Everything an AI product needs, under one roof.</h2>
            </div>
            <div className="rt">
              <p data-en="We don't hand you between vendors. Research, data, engineering, evaluation and security sit on the same accountable team." data-ar="لا نُمرّرك بين مورّدين. البحث والبيانات والهندسة والتقييم والأمن في فريقٍ واحدٍ مسؤول.">We don&apos;t hand you between vendors. Research, data, engineering, evaluation and security sit on the same accountable team.</p>
              <Link href="/industries" className="tlink" data-nav="industries"><span className="u" data-en="See the sectors" data-ar="اطّلع على القطاعات">See the sectors</span><svg className="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
            </div>
          </div>
          <div className="svc-list stagger">
            <Link href="/industries" className="svc-row" data-nav="industries">
              <div className="no">A/01</div>
              <h3 className="display" data-en="AI Agents & Automation" data-ar="وكلاء الذكاء الاصطناعي والأتمتة">AI Agents &amp; Automation</h3>
              <p data-en="Agents that run real workflows end to end, with a human in the loop exactly where it matters." data-ar="وكلاءُ ينفّذون سير عملٍ حقيقيًّا من طرفه إلى طرفه، مع إنسانٍ في الحلقة حيث يهمّ تمامًا.">Agents that run real workflows end to end, with a human in the loop exactly where it matters.</p>
              <svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/industries" className="svc-row" data-nav="industries">
              <div className="no">A/02</div>
              <h3 className="display" data-en="Applied ML & Prediction" data-ar="التعلّم الآلي التطبيقي والتنبّؤ">Applied ML &amp; Prediction</h3>
              <p data-en="Forecasting, scoring and ranking models trained on your own data, measured against the decision they inform." data-ar="نماذج تنبّؤ وتقييم وترتيب مُدرّبة على بياناتك أنت، وتُقاس بالقرار الذي تخدمه.">Forecasting, scoring and ranking models trained on your own data, measured against the decision they inform.</p>
              <svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/industries" className="svc-row" data-nav="industries">
              <div className="no">A/03</div>
              <h3 className="display" data-en="LLM & Knowledge Systems" data-ar="النماذج اللغوية وأنظمة المعرفة">LLM &amp; Knowledge Systems</h3>
              <p data-en="Retrieval over your private documents, with citations, access control and answers you can trace." data-ar="استرجاعٌ من مستنداتك الخاصة، باستشهاداتٍ وتحكّمٍ في الصلاحيات وإجاباتٍ يمكن تتبّعها.">Retrieval over your private documents, with citations, access control and answers you can trace.</p>
              <svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/industries" className="svc-row" data-nav="industries">
              <div className="no">A/04</div>
              <h3 className="display" data-en="AI Product Engineering" data-ar="هندسة منتجات الذكاء الاصطناعي">AI Product Engineering</h3>
              <p data-en="Web and mobile products with the model in the core loop rather than bolted on at the end." data-ar="منتجات ويب وجوال يقع فيها النموذج في صميم الحلقة، لا مُلحقًا في آخر الطريق.">Web and mobile products with the model in the core loop rather than bolted on at the end.</p>
              <svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/industries" className="svc-row" data-nav="industries">
              <div className="no">A/05</div>
              <h3 className="display" data-en="Data Platforms & MLOps" data-ar="منصّات البيانات وتشغيل النماذج">Data Platforms &amp; MLOps</h3>
              <p data-en="Pipelines, evaluations, monitoring and retraining, so a model keeps earning its place after launch." data-ar="خطوط بيانات وتقييمات ومراقبة وإعادة تدريب، ليظلّ النموذج مستحقًّا لمكانه بعد الإطلاق.">Pipelines, evaluations, monitoring and retraining, so a model keeps earning its place after launch.</p>
              <svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/industries" className="svc-row" data-nav="industries">
              <div className="no">A/06</div>
              <h3 className="display" data-en="AI Security & Governance" data-ar="أمن الذكاء الاصطناعي وحوكمته">AI Security &amp; Governance</h3>
              <p data-en="Guardrails, audit trails and red-teaming, settled before a model is allowed near production." data-ar="ضوابطُ وسجلّاتُ تدقيقٍ واختبارٌ هجومي، تُحسم قبل أن يقترب النموذج من الإنتاج.">Guardrails, audit trails and red-teaming, settled before a model is allowed near production.</p>
              <svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><span className="eyebrow mono" data-en="Industries" data-ar="القطاعات">Industries</span>
            <h2 className="display" style={{ marginTop: "18px" }} data-en="Depth where it counts." data-ar="عُمقٌ حيث يهمّ.">Depth where it counts.</h2></div>
            <div className="rt"><p data-en="Eight sectors where we've learned the constraints: regulation, messy legacy data, and what ‘production-ready’ actually means." data-ar="ثمانية قطاعات تعلّمنا فيها القيود: التنظيم وفوضى البيانات القديمة ومعنى ‘الجاهزية للإنتاج’ الحقيقي.">Eight sectors where we&apos;ve learned the constraints: regulation, messy legacy data, and what ‘production-ready’ actually means.</p></div>
          </div>
          <SectorTabs />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><span className="eyebrow mono" data-en="AI products" data-ar="منتجات الذكاء الاصطناعي">AI products</span>
            <h2 className="display sweep" style={{ marginTop: "18px" }} data-en="Models we built, then made for everyone." data-ar="نماذجُ بنيناها ثم أتحناها للجميع.">Models we built, then made for everyone.</h2></div>
            <div className="rt"><Link href="/products" className="tlink" data-nav="products"><span className="u" data-en="All products" data-ar="كل المنتجات">All products</span><svg className="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link></div>
          </div>
          <div className="prod-grid stagger">
            {PRODUCTS.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} sizes="(max-width: 900px) 100vw, 33vw" />
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><span className="eyebrow mono" data-en="Selected work" data-ar="أعمال مختارة">Selected work</span>
            <h2 className="display" style={{ marginTop: "18px" }} data-en="Outcomes, not demos." data-ar="نتائج، لا عروضٌ تجريبية.">Outcomes, not demos.</h2></div>
            <div className="rt"><Link href="/work" className="tlink" data-nav="work"><span className="u" data-en="All case studies" data-ar="كل دراسات الحالة">All case studies</span><svg className="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link></div>
          </div>
          <div className="work-grid stagger">
            <Link href="/work/clinic" className="case wide" data-nav="case">
              <div className="img"><Image alt="Project preview" src="/img/banner.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div className="meta"><span className="tag" data-en="Healthcare" data-ar="الصحة">Healthcare</span><span className="yr">2024</span></div>
              <h3 className="display" data-en="Cutting clinic no-shows by a third with predictive scheduling" data-ar="خفض تغيّب المرضى بمقدار الثلث عبر جدولة تنبّؤية">Cutting clinic no-shows by a third with predictive scheduling</h3>
              <p data-en="A custom platform and ML model that reallocates appointment slots in real time across a multi-site clinic network." data-ar="منصّة مخصّصة ونموذج تعلّم آلي يُعيدان توزيع المواعيد لحظيًّا عبر شبكة عيادات متعدّدة المواقع.">A custom platform and ML model that reallocates appointment slots in real time across a multi-site clinic network.</p>
            </Link>
            <Link href="/work/lending" className="case" data-nav="case">
              <div className="img"><Image alt="Project preview" src="/img/ps20.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div className="meta"><span className="tag" data-en="Finance" data-ar="المال">Finance</span><span className="yr">2023</span></div>
              <h3 className="display" data-en="A lending back-office rebuilt for speed" data-ar="مكتب إقراض خلفي أُعيد بناؤه للسرعة">A lending back-office rebuilt for speed</h3>
              <p data-en="From 4-day manual reviews to same-day decisions with an auditable workflow engine." data-ar="من مراجعات يدوية بأربعة أيام إلى قرارات في اليوم نفسه عبر محرّك سير عمل قابل للتدقيق.">From 4-day manual reviews to same-day decisions with an auditable workflow engine.</p>
            </Link>
            <Link href="/work/learning" className="case" data-nav="case">
              <div className="img"><Image alt="Project preview" src="/img/ps180.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div className="meta"><span className="tag" data-en="Education" data-ar="التعليم">Education</span><span className="yr">2023</span></div>
              <h3 className="display" data-en="A learning app students actually finish" data-ar="تطبيق تعليمي يُكمله الطلاب فعلًا">A learning app students actually finish</h3>
              <p data-en="Redesigned onboarding and offline-first mobile lifted course completion by 41%." data-ar="إعادة تصميم البدء وتجربة تعمل دون اتصال رفعت إتمام الدورات بنسبة ٤١٪.">Redesigned onboarding and offline-first mobile lifted course completion by 41%.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><span className="eyebrow mono" data-en="Our partners" data-ar="شركاؤنا">Our partners</span>
            <h2 className="display sweep" style={{ marginTop: "18px" }} data-en="Teams that trust us with the hard parts." data-ar="فرقٌ تأتمننا على أصعب الأجزاء.">Teams that trust us with the hard parts.</h2></div>
            <div className="rt"><p data-en="A selection of the brands and startups we build and ship AI alongside." data-ar="مجموعة من العلامات والشركات الناشئة التي نبني ونُطلق معها الذكاء الاصطناعي.">A selection of the brands and startups we build and ship AI alongside.</p></div>
          </div>
          <div className="partners reveal">
            <div className="partner">Securance</div><div className="partner">Epictory</div><div className="partner">Bremod</div><div className="partner">Tutors</div><div className="partner">BigDreamLab</div>
            <div className="partner">Hainok</div><div className="partner">Nectios</div><div className="partner">Bowst</div><div className="partner">Misk</div><div className="partner">Rauf & Co</div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><span className="eyebrow mono" data-en="Why WalQalum" data-ar="لماذا وَالقلم">Why WalQalum</span>
            <h2 className="display" style={{ marginTop: "18px" }} data-en="A partner, measured on your outcomes." data-ar="شريكٌ يُقاس بنتائجك.">A partner, measured on your outcomes.</h2></div>
            <div className="rt"><p data-en="The reasons clients stay past the first engagement." data-ar="الأسباب التي تجعل العملاء يبقون بعد أول تعاقد.">The reasons clients stay past the first engagement.</p></div>
          </div>
          <div className="approach stagger">
            <div className="appr"><div className="no">01</div><div><h4 className="display" data-en="Senior teams who have shipped AI" data-ar="فِرَقٌ خبيرة أطلقت ذكاءً اصطناعيًّا">Senior teams who have shipped AI</h4><p data-en="Engineers who have put models into production across health, finance and industry, led by founders who still review the work." data-ar="مهندسون أدخلوا نماذج إلى الإنتاج في الصحة والمال والصناعة، بقيادة مؤسّسين ما زالوا يراجعون العمل.">Engineers who have put models into production across health, finance and industry, led by founders who still review the work.</p></div></div>
            <div className="appr"><div className="no">02</div><div><h4 className="display" data-en="Built around your objective" data-ar="مبنيٌّ حول هدفك">Built around your objective</h4><p data-en="We start from the decision you want made better and work back to the smallest model that reaches it, never the other way around." data-ar="نبدأ من القرار الذي تريد تحسينه ونعود إلى أصغر نموذجٍ يحقّقه، لا العكس.">We start from the decision you want made better and work back to the smallest model that reaches it, never the other way around.</p></div></div>
            <div className="appr"><div className="no">03</div><div><h4 className="display" data-en="Through to post-launch" data-ar="حتى ما بعد الإطلاق">Through to post-launch</h4><p data-en="Evaluation, monitoring and retraining from first concept to well after go-live, with the same team still accountable." data-ar="تقييمٌ ومراقبةٌ وإعادة تدريبٍ من أول فكرة إلى ما بعد الإطلاق بوقتٍ طويل، والفريق نفسه ما زال مسؤولًا.">Evaluation, monitoring and retraining from first concept to well after go-live, with the same team still accountable.</p></div></div>
            <div className="appr"><div className="no">04</div><div><h4 className="display" data-en="Premium, without the premium bill" data-ar="جودةٌ راقية بلا فاتورةٍ باهظة">Premium, without the premium bill</h4><p data-en="A global delivery model that keeps senior AI work within reach of startups and enterprises alike." data-ar="نموذج تسليم عالمي يُبقي عمل الذكاء الاصطناعي الخبير في متناول الشركات الناشئة والمؤسسات معًا.">A global delivery model that keeps senior AI work within reach of startups and enterprises alike.</p></div></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><span className="eyebrow mono" data-en="Blog" data-ar="المدوّنة">Blog</span>
            <h2 className="display" style={{ marginTop: "18px" }} data-en="Notes from the work." data-ar="ملاحظات من قلب العمل.">Notes from the work.</h2></div>
            <div className="rt"><Link href="/blog" className="tlink" data-nav="blog"><span className="u" data-en="All posts" data-ar="كل التدوينات">All posts</span><svg className="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link></div>
          </div>
          <div className="work-grid thirds stagger">
            <Link href="/blog" className="case" data-nav="article"><div className="img"><Image alt="Project preview" src="/img/ps0.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="meta"><span className="tag warm" data-en="AI / ML" data-ar="ذكاء اصطناعي">AI / ML</span><span className="yr">Jul 2026</span></div><h3 className="display" data-en="What ‘production-ready AI’ actually means" data-ar="ماذا يعني فعلًا ذكاء اصطناعي جاهز للإنتاج">What ‘production-ready AI’ actually means</h3><p data-en="Most AI pilots stall at the demo. The real gap is everything between a notebook and a system your team can run." data-ar="تتعثّر معظم تجارب الذكاء الاصطناعي عند العرض. الفجوة الحقيقية هي كل ما بين الدفتر ونظامٍ يشغّله فريقك.">Most AI pilots stall at the demo. The real gap is everything between a notebook and a system your team can run.</p></Link>
            <Link href="/blog" className="case" data-nav="article"><div className="img"><Image alt="Project preview" src="/img/team.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="meta"><span className="tag" data-en="Cloud" data-ar="سحابة">Cloud</span><span className="yr">Jun 2026</span></div><h3 className="display" data-en="Cutting cloud spend without cutting corners" data-ar="خفض إنفاق السحابة دون المساس بالجودة">Cutting cloud spend without cutting corners</h3><p data-en="A calm, boring audit that trimmed a client's monthly bill by a third, and what we'd never touch." data-ar="تدقيقٌ هادئ وممل قلّص فاتورة عميل الشهرية بالثلث، وما لا نمسّه أبدًا.">A calm, boring audit that trimmed a client&apos;s monthly bill by a third, and what we&apos;d never touch.</p></Link>
            <Link href="/blog" className="case" data-nav="article"><div className="img"><Image alt="Project preview" src="/img/ps504.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="meta"><span className="tag" data-en="Design" data-ar="تصميم">Design</span><span className="yr">May 2026</span></div><h3 className="display" data-en="Designing for Arabic: lessons from real RTL work" data-ar="التصميم للعربية: دروس من مشاريع RTL حقيقية">Designing for Arabic: lessons from real RTL work</h3><p data-en="Mirroring a layout is the easy part. The details that actually make Arabic feel native." data-ar="عكس التخطيط هو الجزء السهل. التفاصيل التي تجعل العربية تبدو أصيلة حقًّا.">Mirroring a layout is the easy part. The details that actually make Arabic feel native.</p></Link>
          </div>
        </div>
      </section>

  
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy as Study } from "@/lib/cases";

/**
 * The case study page. The artifact injected the copy with JavaScript from a
 * CASES object; here it renders on the server from the same data, so each study
 * is a real URL with real content in the HTML.
 */
export function CaseStudy({ study }: { study: Study }) {
  return (
    <section className="view" data-route="case">
      <div className="pagehead"><div className="wrap">
        <div className="crumb reveal"><Link href="/work" data-nav="work" style={{ cursor: "pointer" }} data-en="Work" data-ar="أعمالنا">Work</Link> <b>/</b> <span id="caseCat">{study.cat}</span></div>
        <h1 id="caseTitle" className="display reveal sweep">{study.title}</h1>
        <div className="case-meta reveal">
          <div><div className="k" data-en="Industry" data-ar="القطاع">Industry</div><div id="caseIndustry" className="v">{study.ind}</div></div>
          <div><div className="k" data-en="Industries" data-ar="القطاعات">Services</div><div id="caseServices" className="v">{study.svc}</div></div>
          <div><div className="k" data-en="Year" data-ar="السنة">Year</div><div id="caseYear" className="v">{study.year}</div></div>
        </div>
      </div></div>
      <div className="wrap">
        <div id="caseHero" className="case-hero reveal zoom" data-parallax=""><Image src={`/img/${study.img}.jpg`} alt={study.title} fill priority sizes="100vw" /></div>
      </div>
      <section className="band" style={{ borderTop: "1px solid var(--hair)" }}><div className="wrap">
        <div className="prose reveal fromL"><h3 data-en="The challenge" data-ar="التحدّي">The challenge</h3><div className="body" id="caseChallenge"><p>{study.ch}</p></div></div>
        <div className="prose reveal fromR"><h3 data-en="The approach" data-ar="المقاربة">The approach</h3><div className="body" id="caseApproach"><p>{study.ap}</p></div></div>
        <div className="prose reveal fromL"><h3 data-en="The outcome" data-ar="النتيجة">The outcome</h3><div className="body" id="caseOutcome"><p>{study.out}</p></div></div>
        <div id="caseStats" className="stat-row reveal" style={{ marginTop: "24px" }}>
        {study.stats.map(([value, label]) => (
          <div className="stat" key={label}>
            <div className="n" dangerouslySetInnerHTML={{ __html: value }} />
            <div className="k">{label}</div>
          </div>
        ))}
      </div>
        <div className="reveal" style={{ marginTop: "44px" }}><Link href="/work" className="tlink" data-nav="work"><svg className="arrow" viewBox="0 0 24 24" style={{ transform: "scaleX(-1)" }}><path d="M5 12h14M13 6l6 6-6 6" /></svg><span className="u" data-en="Back to all work" data-ar="العودة إلى كل الأعمال">Back to all work</span></Link></div>
      </div></section>
  
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";

/** The contact page, converted from the 2026 design artifact. */
export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  /** The artifact's form was inert; this posts it to the enquiries endpoint. */
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setState("sending");
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: String(f.get("name") || ""),
        email: String(f.get("email") || ""),
        company: String(f.get("company") || ""),
        needs: f.get("need") ? [String(f.get("need"))] : [],
        message: String(f.get("msg") || ""),
        lang: document.documentElement.lang === "ar" ? "ar" : "en",
      }),
    }).catch(() => null);
    if (res?.ok) {
      setState("sent");
      form.reset();
    } else {
      setState("error");
    }
  }

  return (
    <section className="view" data-route="contact">
      <div className="pagehead"><div className="wrap">
        <span className="eyebrow mono reveal" data-en="Contact" data-ar="تواصل">Contact</span>
        <h1 className="display reveal" data-en="Tell us what you're building." data-ar="أخبِرنا بما تبنيه.">Tell us what you&apos;re building.</h1>
        <p className="reveal" data-en="A short note is enough to start. We'll reply within one business day with the right person, not a form letter." data-ar="سطورٌ قليلة تكفي للبدء. سنردّ خلال يوم عملٍ واحد بالشخص المناسب، لا برسالةٍ جاهزة.">A short note is enough to start. We&apos;ll reply within one business day with the right person, not a form letter.</p>
      </div></div>
      <section className="band"><div className="wrap">
        <div className="contact-grid">
          <form className="reveal" onSubmit={send}>
            <div className="field"><label data-en="Your name" data-ar="اسمك">Your name</label><input type="text" name="name" autoComplete="name" /></div>
            <div className="field"><label data-en="Work email" data-ar="بريد العمل">Work email</label><input type="email" name="email" autoComplete="email" /></div>
            <div className="field"><label data-en="Company" data-ar="الشركة">Company</label><input type="text" name="company" autoComplete="organization" /></div>
            <div className="field"><label data-en="What do you need?" data-ar="ما الذي تحتاجه؟">What do you need?</label>
              <select name="need"><option data-en="AI agents & automation" data-ar="برمجيات مخصّصة / SaaS">AI agents &amp; automation</option><option data-en="Applied ML / prediction" data-ar="ذكاء اصطناعي / تعلّم آلي">Applied ML / prediction</option><option data-en="LLM & knowledge systems" data-ar="تطبيق جوال">LLM &amp; knowledge systems</option><option data-en="AI product engineering" data-ar="موقع / تجارة">AI product engineering</option><option data-en="Something else" data-ar="شيء آخر">Something else</option></select></div>
            <div className="field"><label data-en="A few lines about the project" data-ar="أسطر قليلة عن المشروع">A few lines about the project</label><textarea name="msg"></textarea></div>
            <button className="btn btn-primary magnetic" type="submit" disabled={state === "sending"} data-en="Send message" data-ar="أرسل الرسالة">Send message<svg className="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
              {state !== "idle" ? (
                <p className="mono" role="status" style={{ marginTop: 14 }}>
                  {state === "sending"
                    ? "Sending…"
                    : state === "sent"
                      ? "Thank you. We&apos;ll be in touch shortly."
                      : "That didn&apos;t send. Please email service@walqalum.com."}
                </p>
              ) : null}
            <p className="form-note" data-en="We reply within one business day, from a person rather than an autoresponder." data-ar="نردّ خلال يوم عمل واحد، من شخصٍ لا من ردٍّ آلي.">We reply within one business day, from a person rather than an autoresponder.</p>
          </form>
          <div className="contact-side reveal">
            <div className="block"><div className="mono" data-en="Prefer email?" data-ar="تفضّل البريد؟">Prefer email?</div><a className="big tlink" href="mailto:tafseel@walqalum.com" style={{ color: "var(--ink)" }}><span className="u">tafseel@walqalum.com</span></a></div>
            <div className="block"><div className="mono" data-en="United Arab Emirates" data-ar="الإمارات">United Arab Emirates</div><div className="big" data-en="Sharjah Media City" data-ar="مدينة الشارقة للإعلام">Sharjah Media City</div><div className="mono" dir="ltr" style={{ marginTop: "8px", textTransform: "none" }}>+971 54 744 8002</div></div>
            <div className="block"><div className="mono" data-en="Pakistan" data-ar="باكستان">Pakistan</div><div className="big" data-en="Johar Town, Lahore" data-ar="جوهر تاون، لاهور">Johar Town, Lahore</div><div className="mono" dir="ltr" style={{ marginTop: "8px", textTransform: "none" }}>+92 322 4696562</div></div>
            <div className="block"><div className="mono" data-en="Australia" data-ar="أستراليا">Australia</div><div className="big" data-en="Dubbo, NSW" data-ar="دوبو، نيو ساوث ويلز">Dubbo, NSW</div><div className="mono" dir="ltr" style={{ marginTop: "8px", textTransform: "none" }}>+61 470 669 147</div></div>
          </div>
        </div>
      </div></section>
    </section>
  );
}

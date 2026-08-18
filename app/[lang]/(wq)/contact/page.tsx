import type { Metadata } from "next";
import { ContactForm } from "@/components/wq/ContactForm";
import { PageHead, SectionHead, Statement } from "@/components/wq/Page";
import { getDictionary } from "@/lib/dictionaries";
import { EMAIL, offices, telHref } from "@/lib/wq-pages";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.contactTitle, description: t.contact.lede };
}

/**
 * Contact.
 *
 * The form posts to the existing `/api/enquiries` route, which validates with
 * the same schema the old page used — the endpoint is unchanged, only the
 * surface around it is. No closing call to action here: the page is already
 * the call to action, and a second one below the form would be noise.
 */
/** Display order for the three steps below the form. */
const NEXT_STEP_IDS = ["read", "fit", "scope"] as const;

export default async function Contact() {
  const t = await getDictionary();

  return (
    <>
      <PageHead
        eyebrow={t.contact.eyebrow}
        title={t.contact.titleLead}
        accent={t.contact.titleAccent}
        lede={t.contact.lede}
      />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.contact.directLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
            <div className="wq-contact-direct" data-reveal-group="">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              {offices(t).map((o) => (
                <div key={o.id} className="wq-office">
                  <span>
                    {o.city}, {o.country}
                  </span>
                  <a href={telHref(o.tel)}>{o.tel}</a>
                </div>
              ))}
            </div>
          </div>
          <ContactForm t={t.form} />
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        <SectionHead
          index={t.contact.nextLabel}
          title={[t.contact.nextTitleLead, t.contact.nextTitleTail]}
        />
        <div className="wq-grid3" data-reveal-group="">
          {NEXT_STEP_IDS.map((id, i) => (
            <div key={id}>
              {/* "STEP 01" is the translated word plus a derived number, the
                  same pairing the home page's process band uses. */}
              <div className="wq-step-num">
                {t.home.stepLabel} {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="wq-step-name">{t.contact.nextSteps[id].name}</h3>
              <p className="wq-step-desc">{t.contact.nextSteps[id].desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        <Statement
          lines={[
            t.contact.closeLead,
            <em key="em">{t.contact.closeEm}</em>,
          ]}
        />
      </section>
    </>
  );
}

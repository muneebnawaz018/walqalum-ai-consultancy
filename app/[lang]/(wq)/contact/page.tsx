import type { Metadata } from "next";
import { PageHead } from "@/components/wq/Page";
import { ContactForm } from "@/components/wq/ContactForm";
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
 * surface around it is.
 */
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
            <p className="wq-eyebrow">{t.contact.directLabel}</p>
            <div className="wq-tick" aria-hidden="true" />
            <div className="wq-contact-direct">
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
    </>
  );
}

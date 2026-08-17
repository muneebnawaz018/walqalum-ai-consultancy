import type { Metadata } from "next";
import { PageHead } from "@/components/wq/Page";
import { ContactForm } from "@/components/wq/ContactForm";
import { ABOUT, CONTACT } from "@/lib/wq-pages";

export const metadata: Metadata = {
  title: "Contact · WalQalum",
  description: CONTACT.lede,
};

/**
 * Contact.
 *
 * The form posts to the existing `/api/enquiries` route, which validates with
 * the same schema the old page used — the endpoint is unchanged, only the
 * surface around it is.
 */
export default function Contact() {
  return (
    <>
      <PageHead
        eyebrow="01 / Contact"
        title={
          <>
            Tell us what you are <span className="wq-accent">building.</span>
          </>
        }
        lede={CONTACT.lede}
      />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow">Direct</p>
            <div className="wq-tick" aria-hidden="true" />
            <div className="wq-contact-direct">
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              {ABOUT.offices.map((o) => (
                <div key={o.city} className="wq-office">
                  <span>
                    {o.city}, {o.country}
                  </span>
                  <a href={`tel:${o.tel.replace(/\s/g, "")}`}>{o.tel}</a>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

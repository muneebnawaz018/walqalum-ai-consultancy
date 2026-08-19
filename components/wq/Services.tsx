import { StackHead } from "@/components/wq/Page";
import { ServiceIndex, type Service } from "@/components/wq/ServiceIndex";
import { getDictionary } from "@/lib/dictionaries";
import { capabilities } from "@/lib/wq-content";

/**
 * 02 / Services — the reference's index section, on our own capabilities.
 *
 * The plates are stand-in photography, not our work: the reference carries
 * this section on pictures we do not have yet. They are deliberately generic
 * scenes rather than product shots, so nothing here can be mistaken for a
 * screenshot of something we built.
 *
 * The section keeps the id `capabilities`: it is the same six disciplines the
 * outgoing capabilities band listed, and the header menu and the sitemap both
 * link to that anchor.
 */
export async function Services() {
  const t = await getDictionary();
  const services: Service[] = capabilities(t).map((c, i) => ({
    id: c.num,
    number: c.num,
    title: c.name,
    bullets: c.bullets,
    image: `/wq/plates/0${i + 1}.jpg`,
  }));

  return (
    <section
      id="services"
      aria-label={t.aria.capabilities}
      className="wq-wrap wq-sec-b"
    >
      <StackHead top={t.home.servicesTop} bottom={t.home.servicesBottom} />
      <ServiceIndex services={services} eyebrow={t.home.servicesEyebrow} />
    </section>
  );
}

import { StackHead } from "@/components/wq/Page";
import { ServiceIndex, type Service } from "@/components/wq/ServiceIndex";
import { getDictionary } from "@/lib/dictionaries";
import { capabilities } from "@/lib/wq-content";

/**
 * 02 / Services — the reference's index section, on our own capabilities.
 *
 * Plates are generated placeholders and look it: flat, ruled, and stamped
 * PLACEHOLDER. The reference carries this section on photography we do not
 * have, and dressing the gap in stock imagery would misrepresent finished work.
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
    image: `/wq/dummy/0${i + 1}.svg`,
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

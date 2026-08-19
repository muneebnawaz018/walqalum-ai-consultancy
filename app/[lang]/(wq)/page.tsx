import { Hero } from "@/components/wq/Hero";
import { Process } from "@/components/wq/Process";
import {
  Insights,
  Marquee,
  Positioning,
  SelectedWork,
} from "@/components/wq/Sections";
import { Services } from "@/components/wq/Services";
import { Stats } from "@/components/wq/Stats";
import { getDictionary } from "@/lib/dictionaries";
import { stats, steps } from "@/lib/wq-content";

/**
 * The home page, in the design's own order.
 *
 * The four interactive bands — hero, capabilities, process, stats — are client
 * components, so their copy is resolved here and handed down as props. The rest
 * render on the server and read the dictionary themselves.
 */
export default async function Home() {
  const t = await getDictionary();

  return (
    <>
      <Hero t={t.home} actions={t.actions} aria={t.aria.intro} />
      <Marquee />
      <Positioning />
      <Services />
      <Process
        rows={steps(t)}
        eyebrow={t.home.processEyebrow}
        title={t.home.processTitle}
        aria={t.aria.process}
      />
      <SelectedWork />
      <Stats rows={stats(t)} aria={t.aria.stats} />
      <Insights />
    </>
  );
}

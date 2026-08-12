import { Capabilities } from "@/components/wq/Capabilities";
import { Hero } from "@/components/wq/Hero";
import { Process } from "@/components/wq/Process";
import {
  CallToAction,
  Insights,
  Marquee,
  Positioning,
  SelectedWork,
} from "@/components/wq/Sections";
import { Stats } from "@/components/wq/Stats";

/** The home page, in the design's own order. */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Positioning />
      <Capabilities />
      <Process />
      <SelectedWork />
      <Stats />
      <Insights />
      <CallToAction />
    </>
  );
}

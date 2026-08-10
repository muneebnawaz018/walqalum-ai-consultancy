import type { Metadata } from "next";
import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { About } from "@/components/nb/About";

export const metadata: Metadata = { title: "About — WalQalum", description: "Eight years, three countries, one standard. The people accountable for the work." };

export default function AboutPage() {
  return (
    <>
      <Chrome route="about" />
      <main id="main">
        <About />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

import type { Metadata } from "next";
import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { Work } from "@/components/nb/Work";

export const metadata: Metadata = { title: "Work — WalQalum", description: "Problems worth solving, solved. Selected work across healthcare, finance, education and industry." };

export default function WorkPage() {
  return (
    <>
      <Chrome route="work" />
      <main id="main">
        <Work />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

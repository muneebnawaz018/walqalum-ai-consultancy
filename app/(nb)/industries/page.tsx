import type { Metadata } from "next";
import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { Industries } from "@/components/nb/Industries";

export const metadata: Metadata = {
  title: "Industries — WalQalum",
  description: "Healthcare, finance, education and manufacturing — four sectors where we already know the constraints.",
};

export default function IndustriesPage() {
  return (
    <>
      <Chrome route="industries" />
      <main id="main">
        <Industries />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

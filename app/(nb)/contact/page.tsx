import type { Metadata } from "next";
import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { Contact } from "@/components/nb/Contact";

export const metadata: Metadata = { title: "Contact — WalQalum", description: "Tell us what you're building. We reply within one business day." };

export default function ContactPage() {
  return (
    <>
      <Chrome route="contact" />
      <main id="main">
        <Contact />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

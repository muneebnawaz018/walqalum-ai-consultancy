import type { Metadata } from "next";
import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { Footer } from "@/components/nb/Footer";
import { Legal } from "@/components/nb/Legal";

export const metadata: Metadata = {
  title: "Privacy — WalQalum",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Chrome />
      <main id="main">
        <Legal doc="privacy" />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

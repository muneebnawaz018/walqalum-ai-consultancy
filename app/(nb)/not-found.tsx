import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { NotFound } from "@/components/nb/NotFound";

export default function NotFoundPage() {
  return (
    <>
      <Chrome />
      <main id="main">
        <NotFound />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

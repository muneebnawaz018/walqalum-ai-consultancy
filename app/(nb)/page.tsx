import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { Home } from "@/components/nb/Home";

export default function HomePage() {
  return (
    <>
      <Chrome route="home" />
      <main id="main">
        <Home />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

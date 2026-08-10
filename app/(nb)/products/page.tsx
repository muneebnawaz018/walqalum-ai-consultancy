import type { Metadata } from "next";
import { Behaviour } from "@/components/nb/Behaviour";
import { Chrome } from "@/components/nb/Chrome";
import { CtaBand, Footer } from "@/components/nb/Footer";
import { Products } from "@/components/nb/Products";

export const metadata: Metadata = {
  title: "Products — WalQalum",
  description: "Software we stand behind — tools we built for ourselves, then made for everyone.",
};

export default function ProductsPage() {
  return (
    <>
      <Chrome route="products" />
      <main id="main">
        <Products />
        <CtaBand />
      </main>
      <Footer />
      <Behaviour />
    </>
  );
}

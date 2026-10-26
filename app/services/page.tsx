import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/sections/services/hero";
import ServicesList from "@/components/sections/services/services-list";
import WhyUs from "@/components/sections/services/why-us";
import Process from "@/components/sections/services/process";
import CTA from "@/components/sections/services/cta";

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ServicesList />
        <WhyUs />
        <Process />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
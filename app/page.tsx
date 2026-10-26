import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/sections/home/hero";
import AboutPreview from "@/components/sections/home/about-preview";
import WhyIratera from "@/components/sections/home/why-iratera";
import CoreValues from "@/components/sections/home/core-values";
import ProgramsPreview from "@/components/sections/home/programs-preview";
import FinalCta from "@/components/sections/home/final-cta";
import ScrollRefresh from "@/components/motion/scroll-refresh";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AboutPreview />
        <WhyIratera />
        <CoreValues />
        <ProgramsPreview />
        <FinalCta />
      </main>

      <ScrollRefresh />

      <Footer />
    </>
  );
}
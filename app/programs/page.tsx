import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/sections/programs/hero";
import Categories from "@/components/sections/programs/categories";
import FeaturedPrograms from "@/components/sections/programs/featured-programs";
import Process from "@/components/sections/programs/process";
import Audience from "@/components/sections/programs/audience";
import CTA from "@/components/sections/programs/cta";

export default function ProgramsPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Categories />
        <FeaturedPrograms />
        <Process />
        <Audience />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
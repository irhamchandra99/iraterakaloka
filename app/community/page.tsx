import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/sections/community/hero";
import Values from "@/components/sections/community/values";
import Communities from "@/components/sections/community/communities";
import Activities from "@/components/sections/community/activities";
import Testimonials from "@/components/sections/community/testimonials";
import CTA from "@/components/sections/community/cta";

export default function CommunityPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Values />
        <Communities />
        <Activities />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/sections/about/hero";
import Story from "@/components/sections/about/story";
import VisionMission from "@/components/sections/about/vision-mission";
import FounderMessage from "@/components/sections/about/founder-message";
import Team from "@/components/sections/about/team";
import CoreValues from "@/components/sections/about/core-values";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Story />
        <VisionMission />
        <FounderMessage />
        <CoreValues />
        <Team/>
      </main>

      <Footer />
    </>
  );
}
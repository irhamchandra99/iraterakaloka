import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollRefresh from "@/components/motion/scroll-refresh";

import Hero from "@/components/sections/about/hero";
import Story from "@/components/sections/about/story";
import CoreValues from "@/components/sections/about/core-values";
import VisionMission from "@/components/sections/about/vision-mission";
import FounderMessage from "@/components/sections/about/founder-message";
import Closing from "@/components/sections/about/closing";

// The story behind Iratera, told as six connected scenes.
export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Story />
        <CoreValues />
        <VisionMission />
        <FounderMessage />
        <Closing />
      </main>

      <ScrollRefresh />

      <Footer />
    </>
  );
}

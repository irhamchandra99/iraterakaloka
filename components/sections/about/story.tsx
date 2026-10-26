import Container from "@/components/shared/container";
import { StoryScene } from "@/components/motion/about-scenes";
import Eyebrow from "@/components/ui/eyebrow";

// Scene 02: the story unfolds inside a maroon window that opens up.
export default function Story() {
  return (
    <StoryScene className="relative overflow-hidden bg-maroon text-cream lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center">
      <div id="story" className="absolute left-0 top-0 scroll-mt-20" />

      {/* Gold road that continues the hero ribbon down the story */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 800"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-[3%] top-0 hidden w-24 lg:block"
      >
        <path
          data-story-road
          d="M60 0 C 110 160, 10 280, 60 420 S 110 660, 60 800"
          fill="none"
          stroke="#FFCA18"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <Container>
        <div className="grid w-full gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Eyebrow tone="light">Our Story</Eyebrow>
            <h2 className="mt-6 font-display text-heading-xl font-bold">
              Every Meaningful Journey Begins With{" "}
              <span className="text-gold">A Safe Space.</span>
            </h2>
          </div>

          <div
            data-story-text
            className="space-y-7 text-lead text-cream/90 lg:col-span-6 lg:col-start-7"
          >
            <p>
              Iratera Kaloka lahir dari keyakinan bahwa pertumbuhan tidak
              selalu dimulai dari jawaban, tetapi dari keberanian untuk
              mengenal diri sendiri.
            </p>
            <p>
              Kami melihat semakin banyak individu, komunitas, maupun
              organisasi yang membutuhkan ruang belajar, refleksi, dan
              pendampingan yang tidak menghakimi. Dari kebutuhan itulah Iratera
              hadir sebagai ruang yang menghubungkan pembelajaran, kesehatan
              mental, dan pengembangan manusia dalam satu perjalanan yang utuh.
            </p>
            <p>
              Bagi kami, setiap perjalanan memiliki cerita, dan setiap cerita
              layak ditemani dengan penuh empati, profesionalitas, serta harapan
              akan perubahan yang berkelanjutan.
            </p>
          </div>
        </div>
      </Container>
    </StoryScene>
  );
}

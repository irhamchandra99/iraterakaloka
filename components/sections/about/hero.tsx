import Image from "next/image";
import Container from "@/components/shared/container";
import { AboutHeroScene } from "@/components/motion/about-scenes";
import ArrowButton from "@/components/ui/arrow-button";
import Eyebrow from "@/components/ui/eyebrow";

// Scene 01: the introduction.
export default function Hero() {
  return (
    <AboutHeroScene className="relative overflow-hidden bg-cream">
      {/* Shows the intro immediately when JavaScript is unavailable */}
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>[data-about-intro] :is([data-ah-title],[data-ah-fade],[data-ah-art]){visibility:visible!important;animation:none!important}</style>",
        }}
      />
      <Container>
        <div className="flex flex-col pb-16 pt-10 md:pt-14 lg:min-h-[calc(100svh-5rem)] lg:pb-12 lg:pt-10">
          <div data-ah-fade>
            <Eyebrow>About Iratera Kaloka</Eyebrow>
          </div>

          {/* Oversized two-line headline: the second line sits to the right */}
          <h1
            data-ah-title
            className="mt-6 font-display text-[clamp(2.75rem,1rem+5.6vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-ink"
          >
            <span data-ah-line="1" className="block">
              <span data-ah-in className="inline-block">
                Growing Together,
              </span>
            </span>
            <span
              data-ah-line="2"
              className="block text-maroon lg:text-right"
            >
              <span data-ah-in className="inline-block">
                Growing <span className="mark-gold">Mindfully.</span>
              </span>
            </span>
          </h1>

          <div className="mt-12 grid flex-1 items-end gap-12 lg:mt-6 lg:grid-cols-12 lg:gap-8">
            <div data-ah-copy className="lg:col-span-5 lg:pb-10">
              <p data-ah-fade className="text-lead text-ink/75">
                Iratera Kaloka hadir sebagai ruang bertumbuh yang mendampingi
                individu, komunitas, dan organisasi melalui pendekatan yang
                mindful, profesional, dan berdampak.
              </p>
              <div data-ah-fade className="mt-8">
                <ArrowButton href="#story" variant="secondary">
                  Explore Our Story
                </ArrowButton>
              </div>
            </div>

            {/* Illustration inside a maroon ring with a gold road ribbon */}
            <div
              data-ah-art
              className="relative mx-auto w-full max-w-[36rem] lg:col-span-7 lg:col-start-6 lg:mr-0 lg:max-w-[40rem]"
            >
              <div
                aria-hidden="true"
                data-ah-ring
                className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-maroon/25"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 400 120"
                className="absolute -left-6 bottom-[4%] w-[92%] overflow-visible"
              >
                <path
                  data-ah-ribbon
                  d="M4 96 C 90 120, 140 40, 220 60 S 340 110, 396 30"
                  fill="none"
                  stroke="#FFCA18"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              </svg>
              <span
                aria-hidden="true"
                data-ah-dot
                className="absolute right-[10%] top-[6%] h-5 w-5 rounded-full bg-maroon"
              />

              <div data-ah-walkers className="relative">
                <Image
                  src="/illustrations/about-story.webp"
                  alt="Ilustrasi tiga anak muda berjalan bersama menyusuri jalan setapak"
                  width={1536}
                  height={1024}
                  priority
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AboutHeroScene>
  );
}

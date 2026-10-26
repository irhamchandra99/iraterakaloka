import Image from "next/image";
import Container from "@/components/shared/container";
import { ClosingScene } from "@/components/motion/about-scenes";
import ArrowButton from "@/components/ui/arrow-button";
import Eyebrow from "@/components/ui/eyebrow";

// Scene 06: a cream arch rises out of the maroon and opens into the CTA.
// Copy reused from the Programs page CTA; links go to existing pages.
export default function Closing() {
  return (
    <ClosingScene className="relative bg-maroon">
      <div data-cl-arch className="relative overflow-hidden bg-cream">
        <Container>
          <div className="grid items-center gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Eyebrow>Let&apos;s Grow Together</Eyebrow>
              <h2 className="mt-6 font-display text-heading-xl font-bold text-ink">
                <span data-cl-line="1" className="block">
                  Ready to Start
                </span>
                <span data-cl-line="2" className="block text-maroon">
                  Your Growth Journey?
                </span>
              </h2>
              <p className="mt-8 max-w-xl text-lead text-ink/75">
                Baik Anda seorang individu, komunitas, institusi, maupun
                organisasi, Iratera siap menjadi mitra dalam menghadirkan
                pengalaman belajar yang bermakna, kolaboratif, dan berdampak.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ArrowButton href="/programs">Explore Programs</ArrowButton>
                <ArrowButton href="/community" variant="secondary">
                  Join Community
                </ArrowButton>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <svg
                aria-hidden="true"
                viewBox="0 0 400 140"
                className="absolute -bottom-2 left-0 w-full overflow-visible"
              >
                <path
                  data-cl-ribbon
                  d="M0 120 C 120 140, 180 60, 260 80 S 360 120, 400 70"
                  fill="none"
                  stroke="#FFCA18"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              </svg>
              <div data-cl-walkers className="relative">
                <Image
                  src="/illustrations/about-story.webp"
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </ClosingScene>
  );
}

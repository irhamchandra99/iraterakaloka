import Image from "next/image";
import Container from "@/components/shared/container";
import { CtaScene } from "@/components/motion/home-scenes";
import ArrowButton from "@/components/ui/arrow-button";
import Eyebrow from "@/components/ui/eyebrow";

// Copy reused from the Community page CTA.
export default function FinalCta() {
  return (
    <CtaScene className="relative overflow-hidden bg-maroon py-24 text-cream md:py-32">
      <div
        aria-hidden="true"
        data-cta-ring
        className="absolute -right-40 -top-40 hidden h-80 w-80 rounded-full border-[28px] border-gold lg:block"
      />

      <Container>
        <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">Join Our Community</Eyebrow>
            <h2 className="mt-6 font-display text-heading-xl font-bold">
              <span data-cta-line="1" className="block">
                Grow Together,
              </span>
              <span data-cta-line="2" className="block">
                Make A{" "}
                <span data-cta-gold className="inline-block text-gold">
                  Meaningful Impact.
                </span>
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-lead text-cream/85">
              Jadilah bagian dari komunitas Iratera dan temukan ruang yang aman
              untuk belajar, berbagi, berkolaborasi, serta bertumbuh bersama
              individu yang memiliki semangat yang sama.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ArrowButton href="/community" variant="gold">
                Join Community
              </ArrowButton>
              <ArrowButton href="/programs" variant="outline-light">
                Explore Programs
              </ArrowButton>
            </div>
          </div>

          {/* Closing composition: the conversation scene on a cream disc */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-[4%] rounded-full bg-cream"
            />
            <span
              aria-hidden="true"
              data-cta-spark
              className="absolute left-[6%] top-[10%] h-4 w-4 rounded-full bg-gold"
            />
            <span
              aria-hidden="true"
              data-cta-spark
              className="absolute right-[4%] top-[22%] h-6 w-6 rounded-full border-4 border-gold"
            />
            <span
              aria-hidden="true"
              data-cta-spark
              className="absolute bottom-[8%] left-[16%] h-2.5 w-10 rounded-full bg-gold"
            />
            <div data-cta-art className="relative">
              <Image
                src="/illustrations/contact.webp"
                alt="Ilustrasi dua anak muda saling bertukar pesan dan ide"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </CtaScene>
  );
}

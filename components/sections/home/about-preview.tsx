import Image from "next/image";
import Container from "@/components/shared/container";
import { AboutScene } from "@/components/motion/home-scenes";
import ArrowButton from "@/components/ui/arrow-button";
import Eyebrow from "@/components/ui/eyebrow";

const pillars = [
  {
    title: "Self Growth",
    description: "Membantu individu mengenali dan mengembangkan potensi dirinya.",
  },
  {
    title: "Mental Wellness",
    description: "Menumbuhkan kesadaran dan kesehatan mental yang berkelanjutan.",
  },
  {
    title: "Community",
    description: "Membangun ruang kolaborasi dan pertumbuhan bersama.",
  },
];

export default function AboutPreview() {
  return (
    <AboutScene className="overflow-x-clip py-24 md:py-32">
      {/* Revealed through the hero portal on desktop */}
      <div data-about-reveal>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Eyebrow>About Iratera</Eyebrow>
              <h2 className="mt-6 font-display text-heading-xl font-bold text-ink">
                A Space For
                <span data-about-shift className="block text-maroon">
                  Conscious Growth
                </span>
              </h2>

              {/* Journey stage: on desktop the illustration follows the trail.
                  Fixed aspect ratio keeps the trail geometry width-independent. */}
              <div
                data-about-stage
                className="relative mt-12 lg:aspect-[5/6]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
                >
                  <path
                    data-about-trail
                    d="M35 35.8 C 78 38, 88 58, 62 68 S 18 84, 40 98"
                    fill="none"
                    stroke="#880A18"
                    strokeOpacity="0.35"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Milestones, positioned on the trail by JS */}
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    aria-hidden="true"
                    data-about-milestone
                    className="absolute hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-maroon bg-gold"
                  />
                ))}

                <div
                  data-about-traveler
                  className="relative mx-auto w-full max-w-lg lg:absolute lg:left-0 lg:top-0 lg:mx-0 lg:w-[70%] lg:max-w-none"
                >
                  <Image
                    src="/illustrations/about-story.webp"
                    alt="Ilustrasi tiga anak muda berjalan bersama menyusuri jalan setapak"
                    width={1536}
                    height={1024}
                    sizes="(min-width: 1280px) 380px, (min-width: 1024px) 30vw, 32rem"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
              <p className="text-lead text-ink/75">
                Iratera Kaloka merupakan ruang belajar, bertumbuh, dan
                berkolaborasi yang berfokus pada pengembangan diri, kesehatan
                mental, serta pemberdayaan manusia secara holistik.
              </p>

              <ol className="mt-10 border-t border-maroon/15">
                {pillars.map((pillar, index) => (
                  <li
                    key={pillar.title}
                    data-about-item
                    className="grid grid-cols-[3rem_1fr] gap-4 border-b border-maroon/15 py-6"
                  >
                    <span className="pt-1 font-display text-lg font-bold text-maroon">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 leading-7 text-ink/75">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <ArrowButton href="/about" variant="secondary" className="mt-10">
                Learn More
              </ArrowButton>
            </div>
          </div>
        </Container>
      </div>
    </AboutScene>
  );
}

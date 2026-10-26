import Image from "next/image";
import Container from "@/components/shared/container";
import HeroIntro from "@/components/motion/hero-intro";
import ArrowButton from "@/components/ui/arrow-button";
import Eyebrow from "@/components/ui/eyebrow";

const stats = [
  { value: "500+", label: "Community Members" },
  { value: "25+", label: "Programs" },
  { value: "10+", label: "Collaborators" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Container>
        <HeroIntro className="flex flex-col pb-12 pt-10 md:pt-14 lg:min-h-[calc(100svh-5rem)] lg:pb-14 lg:pt-8">
          <div className="grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-6">
            {/* Copy */}
            <div data-hero-copy className="relative z-10 lg:col-span-7">
              <div data-hero-fade>
                <Eyebrow>Growing Up With Iratera</Eyebrow>
              </div>

              <h1
                data-hero-title
                className="mt-7 font-display text-display font-bold text-ink"
              >
                <span className="block">Empowering</span>
                <span className="block text-maroon">Human Growth</span>
                <span className="block">
                  <span className="mr-[0.25em] align-[0.35em] font-[family-name:var(--font-body)] text-[0.32em] font-semibold uppercase tracking-[0.2em] text-ink/75">
                    through
                  </span>
                  <span className="mark-gold">Mindful</span>
                </span>
                <span className="block">
                  <span className="mark-gold">Learning.</span>
                </span>
              </h1>

              <p
                data-hero-fade
                className="mt-8 max-w-[34rem] text-lead text-ink/75"
              >
                Iratera Kaloka hadir sebagai ruang bertumbuh untuk membantu
                individu menemukan potensi diri, menjaga kesehatan mental,
                serta berkembang secara sadar dan bermakna.
              </p>

              <div
                data-hero-fade
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <ArrowButton href="/programs">Explore Programs</ArrowButton>
                <ArrowButton href="/community" variant="secondary">
                  Join Community
                </ArrowButton>
              </div>
            </div>

            {/* Illustration */}
            <div
              data-hero-art
              className="relative mx-auto w-full max-w-[40rem] lg:col-span-5 lg:-mr-10 lg:max-w-none xl:-mr-24"
            >
              {/* Depth layers: each moves at its own rate on scroll */}
              <div
                aria-hidden="true"
                data-hero-arch
                className="absolute inset-x-[8%] bottom-[2%] top-[14%] origin-bottom rounded-t-full bg-sand"
              />
              <div
                aria-hidden="true"
                data-hero-depth="far"
                className="absolute left-[6%] top-[12%] h-3 w-3 rounded-full bg-maroon"
              />
              <div
                aria-hidden="true"
                data-hero-depth="mid"
                className="absolute bottom-[24%] left-[16%] h-2.5 w-10 rounded-full bg-gold"
              />
              <div
                aria-hidden="true"
                data-hero-depth="near"
                className="absolute -right-1 bottom-[34%] h-7 w-7 rounded-full border-4 border-gold"
              />
              {/* The sun is the portal: it grows to fill the hero on scroll */}
              <div
                aria-hidden="true"
                data-hero-sun
                className="pointer-events-none absolute right-[8%] top-[4%] h-12 w-12 sm:h-16 sm:w-16"
              >
                <div data-hero-sun-dot className="h-full w-full rounded-full bg-gold" />
              </div>
              <svg
                aria-hidden="true"
                data-hero-trail
                viewBox="0 0 200 60"
                className="absolute -left-2 bottom-[6%] w-[42%] text-maroon"
              >
                <path
                  d="M2 52 C 60 52, 70 12, 128 14 S 188 32, 198 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="1 9"
                />
              </svg>

              <div data-hero-parallax className="relative z-[1]">
                <div data-hero-float>
                  <Image
                    src="/illustrations/hero-community.webp"
                    alt="Ilustrasi empat anak muda berdiskusi dan bertukar ide di sekitar meja"
                    width={1536}
                    height={1024}
                    priority
                    sizes="(min-width: 1280px) 640px, (min-width: 1024px) 48vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div data-hero-stats>
            <dl
              data-hero-fade
              className="mt-12 grid grid-cols-3 border-y border-maroon/15 lg:mt-10"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse gap-1 px-2 py-5 sm:px-6 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-maroon/15"
                >
                  <dt className="text-xs text-ink/75 sm:text-sm">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold text-maroon sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </HeroIntro>
      </Container>
    </section>
  );
}

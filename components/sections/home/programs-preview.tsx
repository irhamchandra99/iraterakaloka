import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import { ProgramsScene } from "@/components/motion/home-scenes";
import ArrowButton from "@/components/ui/arrow-button";
import Eyebrow from "@/components/ui/eyebrow";

// Illustrations are existing assets chosen to set each program's scene.
const programs = [
  {
    title: "Self Development",
    description:
      "Program pengembangan diri untuk membantu individu memahami dan mengembangkan potensinya.",
    image: "/illustrations/programs.webp",
    alt: "Ilustrasi sekelompok anak muda belajar bersama di depan papan tulis",
    shape: "bg-gold",
  },
  {
    title: "Mental Wellness",
    description:
      "Program yang berfokus pada kesehatan mental, kesadaran diri, dan keseimbangan hidup.",
    image: "/illustrations/services.webp",
    alt: "Ilustrasi dua orang berbincang santai di kursi",
    shape: "bg-sand",
  },
  {
    title: "Learning & Community",
    description:
      "Ruang belajar, berbagi pengalaman, dan bertumbuh bersama komunitas.",
    image: "/illustrations/community.webp",
    alt: "Ilustrasi komunitas anak muda berdiskusi bersama",
    shape: "bg-maroon/15",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon";

export default function ProgramsPreview() {
  return (
    <ProgramsScene className="overflow-x-clip bg-sand py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Programs</Eyebrow>
            <h2 className="mt-6 font-display text-heading-xl font-bold text-ink">
              Explore Our
              <span className="block text-maroon">Growth Journey</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="leading-8 text-ink/75">
              Temukan berbagai program yang dirancang untuk mendukung
              perjalanan pertumbuhan personal, kesehatan mental, dan
              pengembangan komunitas.
            </p>
            <ArrowButton href="/programs" className="mt-6">
              Explore Programs
            </ArrowButton>
          </div>
        </div>

        {/* Program scenes: a vertical list by default; a horizontal,
            pinned sequence on large screens with motion (programs-rail). */}
        <div
          data-programs-track
          className="relative mt-16 grid gap-6 lg:gap-8"
        >
          {programs.map((program, index) => (
            <Link
              key={program.title}
              href="/programs"
              data-program-item
              className={`group grid items-center gap-6 overflow-hidden rounded-2xl bg-cream p-6 md:grid-cols-2 md:gap-10 md:p-10 ${focusRing}`}
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  data-program-shape
                  className={`absolute inset-[6%] rounded-full ${program.shape}`}
                />
                <div data-program-art className="relative">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    width={1536}
                    height={1024}
                    sizes="(min-width: 1024px) 28rem, (min-width: 768px) 45vw, 90vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div data-program-copy>
                <span className="font-display text-5xl font-bold text-maroon md:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-heading-lg font-bold text-ink">
                  {program.title}
                </h3>
                <p className="mt-4 max-w-md leading-8 text-ink/75">
                  {program.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-maroon">
                  Learn More
                  <ArrowRight
                    aria-hidden="true"
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress line, shown only in horizontal mode */}
        <div
          aria-hidden="true"
          data-programs-progress-wrap
          className="mt-8 hidden h-1 overflow-hidden rounded-full bg-maroon/15"
        >
          <div
            data-programs-progress
            className="h-full w-full origin-left bg-maroon"
          />
        </div>
      </Container>
    </ProgramsScene>
  );
}

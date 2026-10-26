import Image from "next/image";
import Container from "@/components/shared/container";
import { JourneyScene } from "@/components/motion/about-scenes";
import Eyebrow from "@/components/ui/eyebrow";

// Scene 03: a conceptual journey through the existing values (not a history).
const values = [
  {
    number: "01",
    title: "Mindful Growth",
    description:
      "Kami percaya pertumbuhan yang sehat dimulai dari kesadaran diri.",
  },
  {
    number: "02",
    title: "Safe & Supportive Space",
    description:
      "Kami menciptakan ruang yang aman, empatik, dan non-judgmental.",
  },
  {
    number: "03",
    title: "Credible & Responsible",
    description:
      "Setiap program dan layanan dijalankan secara profesional, bertanggung jawab, dan berbasis keilmuan.",
  },
  {
    number: "04",
    title: "Meaningful Collaboration",
    description:
      "Kami tumbuh bersama melalui kolaborasi yang bermakna dan saling memberdayakan.",
  },
  {
    number: "05",
    title: "Impactful Journey",
    description:
      "Setiap ruang yang kami hadirkan bertujuan memberi dampak nyata dan berkelanjutan.",
  },
];

export default function CoreValues() {
  return (
    <JourneyScene className="relative overflow-x-clip bg-cream py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Our Values</Eyebrow>
          <h2 className="mt-6 font-display text-heading-xl font-bold text-ink">
            The Principles That{" "}
            <span className="text-maroon">Shape Every Journey</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lead text-ink/75">
            Nilai-nilai ini menjadi fondasi dalam setiap program, layanan,
            maupun kolaborasi yang kami bangun bersama.
          </p>
        </div>

        {/* Route: values alternate sides; on desktop the walkers follow a
            path drawn between them. The path is built from measured stops. */}
        <div data-aj-route className="relative mt-16 lg:mt-24">
          <svg
            aria-hidden="true"
            data-aj-svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible"
          >
            <path
              data-aj-path
              fill="none"
              stroke="#880A18"
              strokeOpacity="0.3"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div
            data-aj-walker
            className="relative mx-auto mb-10 w-full max-w-xs lg:absolute lg:right-[6%] lg:top-0 lg:z-10 lg:mb-0 lg:w-[20%] lg:max-w-none"
          >
            <Image
              src="/illustrations/about-story.webp"
              alt=""
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 20vw, 20rem"
              className="h-auto w-full"
            />
          </div>

          <ol className="relative">
            {values.map((value, index) => (
              <li
                key={value.number}
                data-aj-stop
                className={`relative border-t border-maroon/15 py-8 lg:flex lg:min-h-[52vh] lg:items-center lg:border-t-0 lg:py-0 ${
                  index % 2 === 0 ? "" : "lg:justify-end"
                }`}
              >
                <span
                  aria-hidden="true"
                  data-aj-marker
                  className="absolute hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-maroon bg-gold"
                />
                <div data-aj-card className="lg:w-[46%]">
                  <span
                    data-aj-number
                    className="block font-display text-6xl font-bold leading-none text-maroon md:text-7xl"
                  >
                    {value.number}
                  </span>
                  <h3 className="mt-4 font-display text-heading-lg font-bold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-3 max-w-md text-lead text-ink/75">
                    {value.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </JourneyScene>
  );
}

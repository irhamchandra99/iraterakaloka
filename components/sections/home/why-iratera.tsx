import Container from "@/components/shared/container";
import { WhyScene } from "@/components/motion/home-scenes";
import Eyebrow from "@/components/ui/eyebrow";

const reasons = [
  {
    title: "Personal Growth",
    description:
      "Membantu individu memahami diri, mengembangkan potensi, dan bertumbuh secara sadar.",
  },
  {
    title: "Mental Wellness",
    description:
      "Menciptakan ruang aman untuk menjaga kesehatan mental dan keseimbangan hidup.",
  },
  {
    title: "Meaningful Community",
    description:
      "Membangun hubungan, kolaborasi, dan pertumbuhan bersama yang bermakna.",
  },
];

export default function WhyIratera() {
  return (
    <WhyScene className="relative overflow-x-clip bg-sand py-24 md:py-32">
      {/* Outlined background layer (decorative, repeats the heading words) */}
      <p
        aria-hidden="true"
        data-why-ghost
        className="pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap font-display text-[clamp(6rem,18vw,16rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(136,10,24,0.14)]"
      >
        Growing Together
      </p>

      <Container>
        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow>Why Iratera</Eyebrow>
            <h2
              data-why-heading
              className="mt-6 font-display text-heading-xl font-bold text-ink"
            >
              <span className="block">
                <span data-why-word="growing" className="inline-block">
                  Growing
                </span>{" "}
                <span data-why-word="together" className="inline-block">
                  Together
                </span>
              </span>
              <span className="block">
                <span data-why-word="in-a" className="inline-block">
                  In A
                </span>{" "}
                <span
                  data-why-word="conscious"
                  className="inline-block text-maroon"
                >
                  Conscious Way
                </span>
              </span>
            </h2>
          </div>

          <p
            data-why-statement
            className="border-l-4 border-gold pl-6 text-lead text-ink/80 lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            Di tengah dunia yang bergerak cepat, kami percaya bahwa setiap
            individu berhak untuk bertumbuh secara sadar, sehat, dan bermakna.
          </p>
        </div>

        <div
          data-why-columns
          className="relative mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8"
        >
          {reasons.map((reason, index) => (
            <article
              key={reason.title}
              data-why-col
              className="border-t-2 border-maroon pt-6 md:[&:nth-child(2)]:mt-16"
            >
              <span className="font-display text-sm font-bold tracking-[0.2em] text-maroon">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">
                {reason.title}
              </h3>
              <p className="mt-3 leading-7 text-ink/75">{reason.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </WhyScene>
  );
}

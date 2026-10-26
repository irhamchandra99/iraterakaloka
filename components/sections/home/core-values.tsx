import Container from "@/components/shared/container";
import { ValuesScene } from "@/components/motion/home-scenes";
import Eyebrow from "@/components/ui/eyebrow";

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
    <ValuesScene className="overflow-x-clip py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Nilai Iratera</Eyebrow>
              <h2 className="mt-6 font-display text-heading-lg font-bold text-ink">
                The Values That{" "}
                <span className="text-maroon">Guide Our Journey</span>
              </h2>
              <p className="mt-6 leading-8 text-ink/75">
                Setiap program, layanan, dan ruang yang kami hadirkan dibangun
                di atas nilai-nilai yang menjadi fondasi perjalanan Iratera
                Kaloka.
              </p>

              {/* Progress rail, shown only while the sequence is pinned */}
              <div
                aria-hidden="true"
                data-values-rail
                className="relative mt-10 hidden h-1 max-w-xs rounded-full bg-maroon/15"
              >
                <div
                  data-values-progress
                  className="h-full w-full origin-left rounded-full bg-gold"
                />
                <span
                  data-values-orb
                  className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-maroon bg-gold"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ol data-values-list className="border-t border-maroon/15">
              {values.map((value) => (
                <li
                  key={value.number}
                  data-value-item
                  className="group grid gap-3 border-b border-maroon/15 py-8 sm:grid-cols-[5.5rem_1fr] sm:gap-6"
                >
                  <span
                    data-value-number
                    className="font-display text-4xl font-bold text-maroon md:text-5xl"
                  >
                    {value.number}
                  </span>
                  <div>
                    <h3
                      data-value-title
                      className="font-display text-2xl font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none md:text-3xl"
                    >
                      {value.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-7 text-ink/75">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </ValuesScene>
  );
}

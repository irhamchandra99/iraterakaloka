import Container from "@/components/shared/container";

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
    <section className="py-32 bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Nilai Iratera
          </p>

          <h2 className="heading text-5xl md:text-6xl">
            The Values That{" "}
            <span className="text-[#880A18]">
              Guide Our Journey
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-black/60">
            Setiap program, layanan, dan ruang yang kami hadirkan dibangun di
            atas nilai-nilai yang menjadi fondasi perjalanan Iratera Kaloka.
          </p>
        </div>

        <div className="mt-24">
          {values.map((value) => (
            <div
              key={value.number}
              className="group py-8 border-b border-black/10"
            >
              <div className="grid gap-6 md:grid-cols-[1.3fr_0.9fr] md:items-start">

                <div className="flex items-center gap-8">
                  <span className="heading w-16 text-4xl md:text-5xl text-[#880A18] transition duration-300 group-hover:text-[#FFCA18]">
                    {value.number}
                  </span>

                  <h3 className="heading text-2xl md:text-4xl transition duration-300 group-hover:translate-x-2">
                    {value.title}
                  </h3>
                </div>

                <p className="max-w-xl pl-24 text-black/60 leading-8 md:pl-0">
                  {value.description}
                </p>

              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
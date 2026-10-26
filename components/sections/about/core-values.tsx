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
    <section className="bg-white py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Our Values
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            The Principles That
            <span className="text-[#880A18]"> Shape Every Journey</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Nilai-nilai ini menjadi fondasi dalam setiap program, layanan,
            maupun kolaborasi yang kami bangun bersama.
          </p>
        </div>

        <div className="mt-24">
          {values.map((value, index) => (
            <div
              key={value.number}
              className={`grid gap-8 border-t border-black/10 py-12 md:grid-cols-[120px_1fr] ${
                index === values.length - 1 ? "border-b" : ""
              }`}
            >
              <div>
                <p className="heading text-5xl text-[#FFCA18]">
                  {value.number}
                </p>
              </div>

              <div>
                <h3 className="heading text-3xl md:text-4xl">
                  {value.title}
                </h3>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-black/65">
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
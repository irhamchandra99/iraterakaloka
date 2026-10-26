import Container from "@/components/shared/container";

const process = [
  {
    number: "01",
    title: "Initial Consultation",
    description:
      "Kami memulai dengan memahami kebutuhan, tantangan, serta tujuan yang ingin dicapai oleh individu maupun organisasi.",
  },
  {
    number: "02",
    title: "Needs Assessment",
    description:
      "Tim Iratera melakukan analisis untuk merancang pendekatan dan solusi yang paling sesuai dengan konteks mitra.",
  },
  {
    number: "03",
    title: "Program Design",
    description:
      "Kami menyusun program yang relevan, terstruktur, dan berbasis pendekatan ilmiah serta pengalaman praktis.",
  },
  {
    number: "04",
    title: "Implementation",
    description:
      "Program dijalankan secara profesional melalui workshop, pelatihan, mentoring, atau bentuk layanan lainnya.",
  },
  {
    number: "05",
    title: "Evaluation & Follow-Up",
    description:
      "Kami melakukan evaluasi serta memberikan rekomendasi lanjutan agar dampak program dapat berkelanjutan.",
  },
];

export default function Process() {
  return (
    <section className="bg-white py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Our Workflow
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            How We
            <span className="text-[#880A18]"> Work Together</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Kami percaya bahwa kolaborasi yang baik dimulai dari proses
            yang jelas, transparan, dan berorientasi pada hasil.
          </p>
        </div>

        <div className="mt-20">
          {process.map((step, index) => (
            <div key={step.number}>
              <div className="grid gap-8 py-12 md:grid-cols-[120px_1fr]">
                <div>
                  <p className="heading text-5xl text-[#FFCA18]">
                    {step.number}
                  </p>
                </div>

                <div>
                  <h3 className="heading text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-5 max-w-3xl leading-8 text-black/65">
                    {step.description}
                  </p>
                </div>
              </div>

              {index !== process.length - 1 && (
                <div className="ml-[58px] h-16 w-px bg-[#880A18]/20" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
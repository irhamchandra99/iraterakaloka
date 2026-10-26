import Container from "@/components/shared/container";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Kenali kebutuhan, tantangan, dan tujuan yang ingin dicapai melalui berbagai program Iratera.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Temukan program yang paling sesuai dan terhubung dengan mentor maupun komunitas yang relevan.",
  },
  {
    number: "03",
    title: "Experience",
    description:
      "Ikuti proses pembelajaran yang interaktif, reflektif, dan berbasis pengalaman nyata.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Bawa setiap pembelajaran menjadi perubahan yang berdampak bagi diri sendiri maupun lingkungan.",
  },
];

export default function Process() {
  return (
    <section className="bg-[#FFF9EF] py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Our Process
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            How Every
            <span className="text-[#880A18]"> Journey Begins</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Setiap program Iratera dirancang agar peserta tidak hanya
            memperoleh pengetahuan, tetapi juga mengalami proses
            bertumbuh yang utuh dan bermakna.
          </p>
        </div>

        <div className="mt-20">
          {steps.map((step, index) => (
            <div key={step.number}>
              <div className="grid gap-8 py-12 md:grid-cols-[120px_1fr]">
                {/* Number */}
                <div>
                  <p className="heading text-5xl text-[#FFCA18]">
                    {step.number}
                  </p>
                </div>

                {/* Content */}
                <div>
                  <h3 className="heading text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-5 max-w-2xl leading-8 text-black/65">
                    {step.description}
                  </p>
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div className="ml-[58px] h-16 w-px bg-[#880A18]/20" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
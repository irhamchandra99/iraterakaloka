import Container from "@/components/shared/container";

const values = [
  {
    number: "01",
    title: "Inclusive Space",
    description:
      "Kami membangun komunitas yang terbuka bagi siapa saja untuk belajar, berbagi, dan berkembang tanpa rasa takut untuk menjadi diri sendiri.",
  },
  {
    number: "02",
    title: "Open Dialogue",
    description:
      "Setiap perspektif dihargai. Kami percaya diskusi yang sehat membuka ruang bagi pemahaman dan pertumbuhan bersama.",
  },
  {
    number: "03",
    title: "Continuous Growth",
    description:
      "Komunitas menjadi tempat untuk terus belajar, mengeksplorasi potensi, dan mengembangkan kapasitas diri secara berkelanjutan.",
  },
  {
    number: "04",
    title: "Mutual Support",
    description:
      "Kami saling mendukung, menguatkan, dan bertumbuh bersama melalui hubungan yang bermakna dan kolaboratif.",
  },
];

export default function Values() {
  return (
    <section className="bg-white py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Community Values
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            A Community Built On
            <span className="text-[#880A18]"> Shared Values</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Lebih dari sekadar tempat berkumpul, Iratera adalah ruang
            untuk saling belajar, bertumbuh, dan menciptakan dampak
            bersama melalui hubungan yang penuh makna.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.number}
              className="rounded-[32px] border border-black/5 bg-[#FCFAF7] p-10 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="heading text-5xl text-[#FFCA18]">
                {value.number}
              </p>

              <h3 className="heading mt-6 text-3xl">
                {value.title}
              </h3>

              <p className="mt-5 leading-8 text-black/65">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
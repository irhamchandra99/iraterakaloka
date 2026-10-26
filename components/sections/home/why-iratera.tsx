import Container from "@/components/shared/container";

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
    <section className="bg-[#FFF9EF] py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Why Iratera
          </p>

          <h2 className="heading text-5xl md:text-6xl">
            Growing Together In A
            <span className="text-[#880A18]">
              {" "}Conscious Way
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-black/70">
            Di tengah dunia yang bergerak cepat,
            kami percaya bahwa setiap individu
            berhak untuk bertumbuh secara sadar,
            sehat, dan bermakna.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-10 shadow-sm transition hover:-translate-y-2"
            >
              <div className="mb-6 h-2 w-16 rounded-full bg-[#FFCA18]" />

              <h3 className="heading text-3xl">
                {item.title}
              </h3>

              <p className="mt-5 leading-8 text-black/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
import Container from "@/components/shared/container";

const categories = [
  {
    title: "Personal Growth",
    description:
      "Program pengembangan diri, mental wellness, refleksi, dan self-awareness.",
    icon: "🌱",
  },
  {
    title: "Education",
    description:
      "Workshop, seminar, bootcamp, dan pembelajaran berbasis praktik.",
    icon: "🎓",
  },
  {
    title: "Community",
    description:
      "Ruang kolaborasi, diskusi, volunteering, dan aktivitas komunitas.",
    icon: "🤝",
  },
  {
    title: "Organization",
    description:
      "Pelatihan, konsultasi, dan pengembangan SDM untuk institusi maupun organisasi.",
    icon: "🏢",
  },
];

export default function Categories() {
  return (
    <section className="py-28 bg-[#FCFAF7]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.25em] font-semibold text-[#880A18]">
            Program Categories
          </p>

          <h2 className="heading mt-4 text-5xl">
            Explore Our
            <span className="text-[#880A18]"> Programs</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-black/60">
            Setiap program dirancang untuk menjawab kebutuhan individu,
            komunitas, maupun organisasi melalui pendekatan yang
            kolaboratif dan bermakna.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFCA18] hover:shadow-xl"
            >
              <div className="text-5xl">{item.icon}</div>

              <h3 className="heading mt-8 text-2xl">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-black/60">
                {item.description}
              </p>

              <div className="mt-8 text-sm font-semibold text-[#880A18] opacity-0 transition-all group-hover:opacity-100">
                Explore →
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
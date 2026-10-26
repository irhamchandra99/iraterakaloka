import Container from "@/components/shared/container";

const missions = [
  "Menyediakan ruang belajar, refleksi, dan pengembangan diri yang aman serta bermakna.",
  "Mengembangkan program berbasis psikologi, pendidikan, dan pengembangan manusia.",
  "Membangun komunitas yang saling mendukung dalam proses bertumbuh.",
  "Berkolaborasi dengan individu maupun organisasi untuk menciptakan dampak yang berkelanjutan.",
];

export default function VisionMission() {
  return (
    <section className="bg-[#FFFCF6] py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Our Direction
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            Vision &
            <span className="text-[#880A18]"> Mission</span>
          </h2>
        </div>

        {/* Vision */}

        <div className="mx-auto mt-20 max-w-5xl rounded-[36px] bg-white p-10 shadow-sm md:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#880A18]">
            Vision
          </p>

          <h3 className="heading mt-6 text-3xl leading-relaxed md:text-5xl">
            "Menjadi ruang bertumbuh yang
            menginspirasi individu, komunitas,
            dan organisasi untuk berkembang
            secara sadar, sehat, dan berdampak."
          </h3>
        </div>

        {/* Mission */}

        <div className="mt-20 grid gap-6">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="flex gap-8 rounded-[30px] border border-black/5 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="heading min-w-[70px] text-5xl text-[#FFCA18]">
                {String(index + 1).padStart(2, "0")}
              </div>

              <p className="max-w-3xl text-lg leading-8 text-black/70">
                {mission}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
import Container from "@/components/shared/container";

const audiences = [
  {
    icon: "🎓",
    title: "Students",
    description:
      "Mahasiswa dan pelajar yang ingin mengembangkan kapasitas diri, kepemimpinan, serta kesiapan menghadapi dunia nyata.",
  },
  {
    icon: "💼",
    title: "Professionals",
    description:
      "Individu yang ingin meningkatkan keterampilan, kesejahteraan diri, dan kualitas kolaborasi di lingkungan kerja.",
  },
  {
    icon: "🤝",
    title: "Communities",
    description:
      "Komunitas yang ingin membangun ruang belajar bersama, memperkuat relasi, dan menciptakan dampak sosial.",
  },
  {
    icon: "🏢",
    title: "Organizations",
    description:
      "Sekolah, kampus, perusahaan, maupun institusi yang membutuhkan program pengembangan SDM dan organisasi.",
  },
];

export default function Audience() {
  return (
    <section className="bg-white py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Who Can Join
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            Our Programs Are
            <span className="text-[#880A18]"> Designed For</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Iratera menghadirkan program yang dapat disesuaikan dengan
            kebutuhan individu, komunitas, maupun organisasi dari
            berbagai latar belakang.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="rounded-[32px] border border-black/5 bg-[#FFFDF8] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="heading mt-8 text-2xl">
                {item.title}
              </h3>

              <p className="mt-5 leading-8 text-black/65">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
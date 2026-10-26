import Link from "next/link";
import Container from "@/components/shared/container";

const programs = [
  {
    title: "Self Development",
    description:
      "Program pengembangan diri untuk membantu individu memahami dan mengembangkan potensinya.",
  },
  {
    title: "Mental Wellness",
    description:
      "Program yang berfokus pada kesehatan mental, kesadaran diri, dan keseimbangan hidup.",
  },
  {
    title: "Learning & Community",
    description:
      "Ruang belajar, berbagi pengalaman, dan bertumbuh bersama komunitas.",
  },
];

export default function ProgramsPreview() {
  return (
    <section className="bg-[#FFF9EF] py-32">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Programs
          </p>

          <h2 className="heading text-5xl md:text-6xl">
            Explore Our
            <span className="text-[#880A18]">
              {" "}Growth Journey
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-black/60">
            Temukan berbagai program yang dirancang untuk
            mendukung perjalanan pertumbuhan personal,
            kesehatan mental, dan pengembangan komunitas.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.title}
              className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <h3 className="heading text-3xl">
                {program.title}
              </h3>

              <p className="mt-5 leading-8 text-black/60">
                {program.description}
              </p>

              <Link
                href="/programs"
                className="mt-8 inline-block font-semibold text-[#880A18]"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
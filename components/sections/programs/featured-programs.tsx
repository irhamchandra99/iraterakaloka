import Container from "@/components/shared/container";
import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "Workshop & Training",
    description:
      "Program pembelajaran interaktif untuk meningkatkan pengetahuan, keterampilan, dan kapasitas individu maupun organisasi.",
    image: "/images/programs/workshop.jpg",
  },
  {
    title: "Community Gathering",
    description:
      "Ruang aman untuk berdiskusi, berbagi pengalaman, membangun relasi, dan bertumbuh bersama komunitas.",
    image: "/images/programs/community.jpg",
  },
  {
    title: "Consultation & Mentoring",
    description:
      "Pendampingan profesional bagi individu, institusi, maupun organisasi dalam menghadapi tantangan dan pengembangan diri.",
    image: "/images/programs/consultation.jpg",
  },
];

export default function FeaturedPrograms() {
  return (
    <section
      id="featured-programs"
      className="bg-white py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Featured Programs
          </p>

          <h2 className="heading mt-4 text-5xl">
            Programs Designed for
            <span className="text-[#880A18]"> Meaningful Growth</span>
          </h2>
        </div>

        <div className="mt-20 space-y-28">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className={`grid items-center gap-16 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden rounded-[32px] shadow-xl">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={700}
                  height={500}
                  className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div>
                <span className="rounded-full bg-[#FFCA18]/20 px-4 py-2 text-sm font-semibold text-[#880A18]">
                  Featured
                </span>

                <h3 className="heading mt-6 text-4xl">
                  {program.title}
                </h3>

                <p className="mt-6 leading-8 text-black/60">
                  {program.description}
                </p>

                <Link
                  href="/contact"
                  className="mt-10 inline-flex rounded-full bg-[#880A18] px-7 py-4 font-semibold text-white transition hover:bg-[#6E0814]"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
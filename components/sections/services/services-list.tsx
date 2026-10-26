import Container from "@/components/shared/container";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Workshop & Training",
    description:
      "Program pelatihan yang dirancang untuk meningkatkan kapasitas individu, komunitas, maupun organisasi melalui pembelajaran yang interaktif dan berbasis praktik.",
    image: "/images/services/workshop.jpg",
    audience: "Individuals • Communities • Organizations",
  },
  {
    title: "Consultation",
    description:
      "Pendampingan profesional untuk membantu individu maupun institusi menemukan solusi, strategi, dan arah pengembangan yang tepat.",
    image: "/images/services/consultation.jpg",
    audience: "Individuals • Schools • Companies",
  },
  {
    title: "Facilitation",
    description:
      "Memfasilitasi diskusi, forum, FGD, hingga kegiatan kolaboratif agar proses berjalan lebih efektif, inklusif, dan bermakna.",
    image: "/images/services/facilitation.jpg",
    audience: "Communities • Organizations",
  },
  {
    title: "Organizational Development",
    description:
      "Mendukung organisasi dalam membangun budaya kerja, kepemimpinan, serta pengembangan SDM yang berkelanjutan.",
    image: "/images/services/organization.jpg",
    audience: "Companies • NGOs • Institutions",
  },
];

export default function ServicesList() {
  return (
    <section id="services" className="bg-white py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Our Services
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            Solutions Designed For
            <span className="text-[#880A18]"> Meaningful Growth</span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-black/60">
            Setiap layanan kami dirancang secara fleksibel agar dapat
            disesuaikan dengan kebutuhan individu maupun organisasi.
          </p>
        </div>

        <div className="mt-24 space-y-28">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`grid items-center gap-16 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden rounded-[32px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={700}
                  height={500}
                  className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#880A18]">
                  {service.audience}
                </p>

                <h3 className="heading mt-4 text-4xl">
                  {service.title}
                </h3>

                <p className="mt-6 leading-8 text-black/65">
                  {service.description}
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-[#880A18] transition hover:gap-4"
                >
                  Discuss This Service →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
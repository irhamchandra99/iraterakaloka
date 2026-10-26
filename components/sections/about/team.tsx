import Container from "@/components/shared/container";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import Link from "next/link";

const team = [
  {
    name: "Anisah",
    role: "Founder",
    image: "/images/founder.png",
    description:
      "Berkomitmen membangun ruang bertumbuh yang aman, reflektif, dan berdampak bagi setiap individu.",
    instagram: "#", // Linked to Instagram profile
    linkedin: "#",
  },
  {
    name: "Nama Co-Founder",
    role: "Co-Founder",
    image: "/images/co-founder.png",
    description:
      "Mengembangkan kolaborasi serta program yang mendorong pertumbuhan individu maupun komunitas.",
    instagram: "nisachandra", // Linked to Instagram profile
    linkedin: "#",
  },
  {
    name: "Nama Tim",
    role: "Program Lead",
    image: "/images/team-3.png",
    description:
      "Berfokus pada pengembangan pengalaman belajar yang relevan, inklusif, dan bermakna.",
    instagram: "#", // Linked to Instagram profile
    linkedin: "#",
  },
];

export default function Team() {
  return (
    <section className="py-28 md:py-36 bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Meet The Team
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            People Behind
            <span className="text-[#880A18]"> Iratera Kaloka</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Di balik setiap perjalanan Iratera terdapat orang-orang yang
            memiliki visi yang sama untuk menghadirkan ruang bertumbuh
            yang aman, profesional, dan berdampak.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-[32px] border border-black/5 bg-[#FFFDF8] p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={180}
                height={180}
                className="mx-auto h-44 w-44 rounded-full object-cover"
              />

              <h3 className="heading mt-8 text-3xl">
                {member.name}
              </h3>

              <p className="mt-2 font-medium text-[#880A18]">
                {member.role}
              </p>

              <p className="mt-6 text-black/65 leading-8">
                {member.description}
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href={member.instagram}
                  className="rounded-full border p-3 transition hover:bg-[#880A18] hover:text-white"
                >
                  <FaInstagram size={20} />
                </Link>

                <Link
                  href={member.linkedin}
                  className="rounded-full border p-3 transition hover:bg-[#880A18] hover:text-white"
                >
                  <FaLinkedinIn size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
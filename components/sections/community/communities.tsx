import Container from "@/components/shared/container";
import Image from "next/image";
import Link from "next/link";

const communities = [
  {
    title: "Psychology Circle",
    description:
      "Ruang belajar dan diskusi seputar kesehatan mental, pengembangan diri, serta kesejahteraan psikologis.",
    image: "/images/community/psychology.jpg",
  },
  {
    title: "Creative Space",
    description:
      "Komunitas bagi individu kreatif untuk saling berbagi ide, berkolaborasi, dan menciptakan karya yang berdampak.",
    image: "/images/community/creative.jpg",
  },
  {
    title: "Youth Leadership",
    description:
      "Program komunitas yang membantu generasi muda mengembangkan kepemimpinan, komunikasi, dan kemampuan berkolaborasi.",
    image: "/images/community/leadership.jpg",
  },
];

export default function Communities() {
  return (
    <section
      id="communities"
      className="bg-[#FCFAF7] py-28 md:py-36"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Our Communities
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            Find Your
            <span className="text-[#880A18]"> Place To Grow</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Setiap komunitas di Iratera dibangun untuk menghadirkan ruang
            belajar yang aman, kolaboratif, dan penuh makna.
          </p>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Featured */}
          <div className="overflow-hidden rounded-[36px] bg-white shadow-lg">
            <Image
              src={communities[0].image}
              alt={communities[0].title}
              width={900}
              height={700}
              className="h-[420px] w-full object-cover"
            />

            <div className="p-10">
              <h3 className="heading text-4xl">
                {communities[0].title}
              </h3>

              <p className="mt-5 leading-8 text-black/65">
                {communities[0].description}
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex font-semibold text-[#880A18]"
              >
                Join Community →
              </Link>
            </div>
          </div>

          {/* Others */}
          <div className="space-y-8">
            {communities.slice(1).map((community) => (
              <div
                key={community.title}
                className="flex gap-6 rounded-[28px] bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <Image
                  src={community.image}
                  alt={community.title}
                  width={180}
                  height={180}
                  className="h-36 w-36 rounded-2xl object-cover"
                />

                <div>
                  <h3 className="heading text-2xl">
                    {community.title}
                  </h3>

                  <p className="mt-3 text-black/60 leading-7">
                    {community.description}
                  </p>

                  <Link
                    href="/contact"
                    className="mt-5 inline-flex text-sm font-semibold text-[#880A18]"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
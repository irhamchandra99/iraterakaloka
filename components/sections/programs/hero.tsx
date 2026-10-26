import Container from "@/components/shared/container";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FCFAF7] py-28 lg:py-36">
      {/* Background Decoration */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#FFCA18]/10 blur-3xl" />

      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left */}
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
              Programs
            </p>

            <h1 className="heading text-5xl leading-tight md:text-6xl lg:text-7xl">
              Learning
              <br />
              Experiences
              <br />
              That Create
              <span className="text-[#880A18]"> Real Impact.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60">
              Iratera menghadirkan berbagai program yang dirancang untuk
              mendukung pertumbuhan individu, komunitas, institusi, dan
              organisasi melalui pendekatan yang kolaboratif, reflektif,
              dan berbasis keilmuan.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#featured-programs"
                className="rounded-full bg-[#880A18] px-8 py-4 font-semibold text-white transition hover:bg-[#6E0814]"
              >
                Explore Programs
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-[#880A18] px-8 py-4 font-semibold text-[#880A18] transition hover:bg-[#880A18] hover:text-white"
              >
                Collaborate With Us
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#FFCA18]/20 blur-3xl" />

            <div className="overflow-hidden rounded-[40px] shadow-2xl">
              <Image
                src="/images/programs/program-hero.jpg"
                alt="Iratera Programs"
                width={700}
                height={800}
                className="h-[600px] w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
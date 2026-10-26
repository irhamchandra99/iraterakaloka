import Container from "@/components/shared/container";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-[#880A18] py-28 text-white md:py-36">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFCA18]">
            Let's Grow Together
          </p>

          <h2 className="heading text-4xl leading-tight md:text-6xl">
            Ready to Start
            <br />
            Your Growth Journey?
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80">
            Baik Anda seorang individu, komunitas, institusi, maupun organisasi,
            Iratera siap menjadi mitra dalam menghadirkan pengalaman belajar yang
            bermakna, kolaboratif, dan berdampak.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[#FFCA18] px-8 py-4 font-semibold text-[#880A18] transition hover:scale-105"
            >
              Contact Us
            </Link>

            <Link
              href="/collaboration"
              className="rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#880A18]"
            >
              Collaboration
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
import Container from "@/components/shared/container";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-[#880A18] py-28 text-white md:py-36">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFCA18]">
            Join Our Community
          </p>

          <h2 className="heading text-4xl leading-tight md:text-6xl">
            Grow Together,
            <br />
            Make A
            <span className="text-[#FFCA18]"> Meaningful Impact.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80">
            Jadilah bagian dari komunitas Iratera dan temukan ruang yang
            aman untuk belajar, berbagi, berkolaborasi, serta bertumbuh
            bersama individu yang memiliki semangat yang sama.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/contact"
              className="rounded-full bg-[#FFCA18] px-8 py-4 font-semibold text-[#880A18] transition duration-300 hover:scale-105"
            >
              Join Our Community
            </Link>

            <Link
              href="/programs"
              className="rounded-full border border-white px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-[#880A18]"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
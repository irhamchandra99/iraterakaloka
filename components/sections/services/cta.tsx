import Container from "@/components/shared/container";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-[#880A18] py-28 text-white md:py-36">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFCA18]">
            Let&apos;s Collaborate
          </p>

          <h2 className="heading text-4xl leading-tight md:text-6xl">
            Let&apos;s Build
            <br />
            Meaningful Impact
            <span className="text-[#FFCA18]"> Together.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80">
            Apakah Anda sedang merancang workshop, pelatihan, konsultasi,
            atau program pengembangan organisasi? Mari berdiskusi dan
            temukan solusi yang paling sesuai dengan kebutuhan Anda.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/contact"
              className="rounded-full bg-[#FFCA18] px-8 py-4 font-semibold text-[#880A18] transition duration-300 hover:scale-105"
            >
              Schedule a Consultation
            </Link>

            <Link
              href="/collaboration"
              className="rounded-full border border-white px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-[#880A18]"
            >
              Become Our Partner
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
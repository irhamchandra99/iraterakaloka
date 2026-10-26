import Container from "@/components/shared/container";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#FFF9EF] pt-44 pb-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-6 text-sm font-bold uppercase tracking-[0.35em] text-[#880A18]">
            About Iratera Kaloka
          </p>

          <h1 className="heading text-5xl leading-tight md:text-7xl">
            Growing Together,
            <br />
            <span className="text-[#880A18]">
              Growing Mindfully.
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-black/65 md:text-xl">
            Iratera Kaloka hadir sebagai ruang bertumbuh
            yang mendampingi individu, komunitas,
            dan organisasi melalui pendekatan yang
            mindful, profesional, dan berdampak.
          </p>

          <div className="mt-14">
            <Link
              href="#story"
              className="inline-flex items-center gap-2 rounded-full border border-[#880A18] px-8 py-4 text-[#880A18] transition hover:bg-[#880A18] hover:text-white"
            >
              Explore Our Story
              <span>↓</span>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-24">
          <div className="flex h-[420px] items-center justify-center rounded-[40px] bg-[#F3EFE8]">
            <p className="text-black/40">
              Image / Illustration Placeholder
            </p>
          </div>
        </div>

      </Container>
    </section>
  );
}
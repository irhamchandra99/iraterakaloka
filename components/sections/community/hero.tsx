import Container from "@/components/shared/container";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FCFAF7] py-28 lg:py-36">
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#FFCA18]/10 blur-3xl" />

      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
              Community
            </p>

            <h1 className="heading text-5xl leading-tight md:text-6xl lg:text-7xl">
              Growing
              <br />
              Better
              <br />
              <span className="text-[#880A18]">
                Together.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60">
              Iratera percaya bahwa pertumbuhan terbaik terjadi ketika
              kita belajar, berbagi, dan saling mendukung dalam sebuah
              komunitas yang aman serta bermakna.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#communities"
                className="rounded-full bg-[#880A18] px-8 py-4 font-semibold text-white transition hover:bg-[#6E0814]"
              >
                Explore Community
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-[#880A18] px-8 py-4 font-semibold text-[#880A18] transition hover:bg-[#880A18] hover:text-white"
              >
                Join Us
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[40px] shadow-2xl">
            <Image
              src="/images/community/community-hero.jpg"
              alt="Iratera Community"
              width={700}
              height={800}
              className="h-[600px] w-full object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
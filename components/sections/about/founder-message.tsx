import Container from "@/components/shared/container";
import Image from "next/image";

export default function FounderMessage() {
  return (
    <section className="bg-[#FFF9EF] py-28 md:py-36">
      <Container>
        <div className="grid gap-20 lg:grid-cols-[420px_1fr] lg:items-center">

          {/* Left */}

          <div className="text-center">
            <Image
              src="/images/founder.png"
              alt="Founder Iratera Kaloka"
              width={320}
              height={320}
              className="mx-auto h-80 w-80 rounded-full object-cover"
              priority
            />

            <blockquote className="heading mt-10 text-3xl leading-relaxed">
              "Growing begins when
              <br />
              we dare to understand
              <br />
              ourselves."
            </blockquote>

            <p className="mt-6 text-[#880A18] font-semibold">
              — Founder, Iratera Kaloka
            </p>
          </div>

          {/* Right */}

          <div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
              From The Founder
            </p>

            <h2 className="heading text-4xl md:text-6xl">
              A Letter
              <span className="text-[#880A18]">
                {" "}To Every Journey
              </span>
            </h2>

            <div className="mt-10 space-y-8 text-lg leading-9 text-black/70">

              <p>
                Iratera Kaloka lahir dari keyakinan bahwa setiap
                individu memiliki potensi untuk bertumbuh ketika
                mereka menemukan ruang yang aman, suportif, dan
                penuh makna.
              </p>

              <p>
                Kami tidak ingin sekadar menghadirkan program,
                tetapi membangun pengalaman belajar yang mampu
                membantu seseorang mengenal dirinya, menemukan
                arah, dan berkembang secara berkelanjutan.
              </p>

              <p>
                Semoga setiap langkah yang Anda ambil bersama
                Iratera menjadi awal dari perjalanan yang
                membawa dampak, bukan hanya bagi diri sendiri,
                tetapi juga bagi lingkungan di sekitar.
              </p>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
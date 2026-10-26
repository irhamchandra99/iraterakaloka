import Container from "@/components/shared/container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FEFCF8]">
      {/* background glow */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFCA18]/20 blur-3xl" />

      <Container>
        <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center text-center">

          {/* badge */}
          {/* <div className="mb-8 rounded-full border border-[#880A18]/20 bg-white px-5 py-2">
            <span className="text-sm font-medium tracking-widest text-[#880A18] uppercase">
              Growing Up With Iratera
            </span>
          </div> */}

          {/* title */}
          <h1 className="heading max-w-5xl text-5xl leading-tight font-semibold md:text-7xl lg:text-8xl">
            Empowering
            <span className="text-[#880A18]"> Human Growth </span>
            Through
            <span className="text-[#FFCA18]">
              {" "}
              Mindful Learning
            </span>
          </h1>

          {/* subtitle */}
          <p className="mt-8 max-w-2xl text-lg leading-8 text-black/60 md:text-xl">
            Iratera Kaloka hadir sebagai ruang bertumbuh untuk
            membantu individu menemukan potensi diri, menjaga
            kesehatan mental, serta berkembang secara sadar dan
            bermakna.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <button className="rounded-full bg-[#880A18] px-8 py-4 font-semibold text-white transition hover:scale-105">
              Explore Programs
            </button>

            <button className="rounded-full border border-[#880A18]/20 bg-white px-8 py-4 font-semibold transition hover:bg-[#FFF9EF]">
              Join Community
            </button>

          </div>

          {/* stats */}
          <div className="mt-16 grid grid-cols-3 gap-10">

            <div>
              <h3 className="heading text-4xl text-[#880A18]">
                500+
              </h3>
              <p className="mt-2 text-sm text-black/80">
                Community Members
              </p>
            </div>

            <div>
              <h3 className="heading text-4xl text-[#880A18]">
                25+
              </h3>
              <p className="mt-2 text-sm text-black/80">
                Programs
              </p>
            </div>

            <div>
              <h3 className="heading text-4xl text-[#880A18]">
                10+
              </h3>
              <p className="mt-2 text-sm text-black/80">
                Collaborators
              </p>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
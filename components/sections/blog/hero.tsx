import Container from "@/components/shared/container";

export default function Hero() {
  return (
    <section className="bg-[#FCFAF7] py-32 md:py-40">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Insights
          </p>

          <h1 className="heading text-5xl leading-tight md:text-7xl">
            Ideas,
            <br />
            Reflections &
            <span className="text-[#880A18]"> Insights.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Ruang untuk berbagi pengetahuan, perspektif, dan refleksi
            seputar pengembangan diri, kesehatan mental, pendidikan,
            serta kehidupan manusia.
          </p>
        </div>
      </Container>
    </section>
  );
}
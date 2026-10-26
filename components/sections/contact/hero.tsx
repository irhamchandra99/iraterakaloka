import Container from "@/components/shared/container";

export default function Hero() {
  return (
    <section className="bg-[#FCFAF7] py-32 md:py-40">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Contact
          </p>

          <h1 className="heading text-5xl leading-tight md:text-7xl">
            Let&apos;s Start
            <br />
            A Conversation.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Kami terbuka untuk diskusi, kolaborasi, maupun pertanyaan
            mengenai program dan layanan Iratera. Hubungi kami, dan mari
            mulai menciptakan dampak bersama.
          </p>
        </div>
      </Container>
    </section>
  );
}
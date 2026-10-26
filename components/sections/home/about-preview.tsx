import Link from "next/link";
import Container from "@/components/shared/container";

export default function AboutPreview() {
  return (
    <section className="py-32">
      <Container>

        {/* heading */}
        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            About Iratera
          </p>

          <h2 className="heading text-5xl md:text-6xl">
            A Space For
            <span className="text-[#880A18]">
              {" "}Conscious Growth
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-black/60">
            Iratera Kaloka merupakan ruang belajar,
            bertumbuh, dan berkolaborasi yang berfokus
            pada pengembangan diri, kesehatan mental,
            serta pemberdayaan manusia secara holistik.
          </p>

          <Link
            href="/about"
            className="mt-10 inline-flex rounded-full bg-[#880A18] px-8 py-4 font-semibold text-white transition hover:scale-105"
          >
            Learn More
          </Link>
        </div>

        {/* cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="heading text-3xl">
              Self Growth
            </h3>

            <p className="mt-4 text-black/60">
              Membantu individu mengenali dan
              mengembangkan potensi dirinya.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="heading text-3xl">
              Mental Wellness
            </h3>

            <p className="mt-4 text-black/60">
              Menumbuhkan kesadaran dan kesehatan
              mental yang berkelanjutan.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="heading text-3xl">
              Community
            </h3>

            <p className="mt-4 text-black/60">
              Membangun ruang kolaborasi dan
              pertumbuhan bersama.
            </p>
          </div>

        </div>

      </Container>
    </section>
  );
}
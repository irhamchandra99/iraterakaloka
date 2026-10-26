import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Container from "@/components/shared/container";

// Halaman sementara. Ganti dengan section di components/sections/collaboration
// saat konten final tersedia.
const partnershipAreas = [
  {
    title: "Institutional Partnership",
    description:
      "Kolaborasi dengan sekolah, kampus, dan lembaga untuk merancang program pengembangan manusia yang berkelanjutan.",
  },
  {
    title: "Community Collaboration",
    description:
      "Bersama komunitas, kami membangun ruang belajar dan kegiatan yang memberi dampak nyata bagi masyarakat.",
  },
  {
    title: "Corporate Program",
    description:
      "Program pelatihan dan pendampingan untuk organisasi yang ingin menumbuhkan budaya kerja yang bermakna.",
  },
];

export default function CollaborationPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#FFF9EF] py-28 lg:py-36">
          <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-[#FFCA18]/10 blur-3xl" />

          <Container>
            <div className="relative max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
                Collaboration
              </p>

              <h1 className="heading text-5xl leading-tight md:text-6xl lg:text-7xl">
                Growing Together
                <br />
                <span className="text-[#880A18]">Through Partnership.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-black/60">
                Iratera Kaloka membuka peluang kolaborasi dengan individu,
                komunitas, institusi, dan organisasi untuk menciptakan dampak
                yang bermakna dan berkelanjutan.
              </p>
            </div>
          </Container>
        </section>

        {/* Partnership areas */}
        <section className="bg-white py-24 md:py-32">
          <Container>
            <div className="grid gap-8 md:grid-cols-3">
              {partnershipAreas.map((area) => (
                <div
                  key={area.title}
                  className="rounded-[32px] border border-black/5 bg-[#FCFAF7] p-8 transition hover:border-[#FFCA18]"
                >
                  <h2 className="heading text-2xl text-[#880A18]">
                    {area.title}
                  </h2>
                  <p className="mt-4 leading-7 text-black/60">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-[#880A18] py-24 text-white md:py-32">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="heading text-4xl leading-tight md:text-5xl">
                Let&apos;s Build Meaningful Impact
                <span className="text-[#FFCA18]"> Together.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Ceritakan ide kolaborasi Anda, dan mari kita diskusikan
                bentuk kerja sama yang paling sesuai.
              </p>

              <Link
                href="/contact"
                className="mt-10 inline-block rounded-full bg-[#FFCA18] px-8 py-4 font-semibold text-[#880A18] transition duration-300 hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

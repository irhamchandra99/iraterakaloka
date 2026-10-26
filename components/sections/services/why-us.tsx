import Container from "@/components/shared/container";

const reasons = [
  {
    number: "01",
    title: "Human-Centered",
    description:
      "Setiap layanan dirancang dengan menempatkan manusia sebagai pusat dari setiap proses belajar, bertumbuh, dan berkolaborasi.",
  },
  {
    number: "02",
    title: "Evidence-Based",
    description:
      "Program kami disusun berdasarkan pendekatan ilmiah, pengalaman praktis, dan kebutuhan nyata setiap mitra.",
  },
  {
    number: "03",
    title: "Collaborative",
    description:
      "Kami tidak sekadar memberikan pelatihan, tetapi menjadi partner yang mendampingi proses perubahan bersama.",
  },
  {
    number: "04",
    title: "Impact-Oriented",
    description:
      "Kami percaya keberhasilan bukan hanya pada terlaksananya program, tetapi pada dampak yang berkelanjutan.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-[#FFF9EF] py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Why Iratera
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            More Than A
            <span className="text-[#880A18]"> Service Provider</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Kami percaya bahwa perubahan yang bermakna lahir dari
            kolaborasi, kepercayaan, dan proses yang dirancang secara
            profesional.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="rounded-[32px] bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="heading text-5xl text-[#FFCA18]">
                {reason.number}
              </p>

              <h3 className="heading mt-6 text-3xl">
                {reason.title}
              </h3>

              <p className="mt-5 leading-8 text-black/65">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
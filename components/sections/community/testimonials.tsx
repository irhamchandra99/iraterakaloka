import Container from "@/components/shared/container";

const testimonials = [
  {
    quote:
      "Bergabung dengan komunitas Iratera membuat saya lebih berani mengenal diri sendiri dan menemukan lingkungan yang benar-benar suportif.",
    name: "Nama Anggota",
    role: "Community Member",
  },
  {
    quote:
      "Setiap kegiatan selalu memberikan perspektif baru. Bukan hanya belajar, tetapi juga bertemu orang-orang yang saling menginspirasi.",
    name: "Nama Anggota",
    role: "Workshop Participant",
  },
  {
    quote:
      "Iratera menjadi ruang yang aman untuk berdiskusi, bertumbuh, dan membangun relasi yang bermakna bersama banyak orang.",
    name: "Nama Anggota",
    role: "Volunteer",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#FCFAF7] py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Community Stories
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            What Our
            <span className="text-[#880A18]"> Members Say</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Setiap perjalanan di Iratera membawa cerita yang berbeda.
            Berikut beberapa pengalaman dari mereka yang pernah bertumbuh
            bersama komunitas kami.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.quote}
              className="rounded-[32px] bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-6xl leading-none text-[#FFCA18]">
                “
              </div>

              <p className="mt-6 leading-8 text-black/70">
                {item.quote}
              </p>

              <div className="mt-10 border-t border-black/10 pt-6">
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-black/50">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
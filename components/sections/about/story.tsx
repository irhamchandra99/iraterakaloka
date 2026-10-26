import Container from "@/components/shared/container";

export default function Story() {
  return (
    <section
      id="story"
      className="bg-white py-28 md:py-36"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
              Our Story
            </p>

            <h2 className="heading text-4xl leading-tight md:text-6xl">
              Every Meaningful Journey
              <br />
              Begins With
              <span className="text-[#880A18]">
                {" "}A Safe Space.
              </span>
            </h2>
          </div>

          {/* Right */}
          <div className="space-y-8 text-lg leading-9 text-black/70">
            <p>
              Iratera Kaloka lahir dari keyakinan bahwa
              pertumbuhan tidak selalu dimulai dari jawaban,
              tetapi dari keberanian untuk mengenal diri sendiri.
            </p>

            <p>
              Kami melihat semakin banyak individu,
              komunitas, maupun organisasi yang membutuhkan
              ruang belajar, refleksi, dan pendampingan yang
              tidak menghakimi. Dari kebutuhan itulah Iratera
              hadir sebagai ruang yang menghubungkan
              pembelajaran, kesehatan mental, dan
              pengembangan manusia dalam satu perjalanan
              yang utuh.
            </p>

            <p>
              Bagi kami, setiap perjalanan memiliki cerita,
              dan setiap cerita layak ditemani dengan penuh
              empati, profesionalitas, serta harapan akan
              perubahan yang berkelanjutan.
            </p>
          </div>

        </div>

        {/* Image */}

        <div className="mt-20 flex h-[520px] items-center justify-center rounded-[40px] bg-[#F3EFE8]">
          <p className="text-black/40">
            About Story Image
          </p>
        </div>
      </Container>
    </section>
  );
}
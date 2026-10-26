import Image from "next/image";
import Container from "@/components/shared/container";
import { PeopleScene } from "@/components/motion/about-scenes";
import Eyebrow from "@/components/ui/eyebrow";

/*
 * Scene 05: people & community. Uses only existing content: the team
 * introduction, the founder's letter and quote. The former team grid with
 * placeholder names ("Nama Co-Founder", "Nama Tim") is not shown.
 */
export default function FounderMessage() {
  return (
    <PeopleScene className="relative overflow-x-clip bg-maroon py-24 text-cream md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Collage */}
          <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
            <div
              aria-hidden="true"
              data-pp-disc
              className="absolute inset-[4%] rounded-full bg-cream"
            />
            <span
              aria-hidden="true"
              data-pp-accent="1"
              className="absolute -left-2 top-[12%] h-6 w-6 rounded-full bg-gold"
            />
            <span
              aria-hidden="true"
              data-pp-accent="2"
              className="absolute right-[2%] top-[4%] h-14 w-14 rounded-full border-[6px] border-gold"
            />
            <div data-pp-community className="relative">
              <Image
                src="/illustrations/community.webp"
                alt="Ilustrasi komunitas anak muda berkumpul dan berdiskusi"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 46vw, 90vw"
                className="h-auto w-full"
              />
            </div>
            <figure
              data-pp-founder
              className="absolute -bottom-10 right-[4%] w-[34%] overflow-hidden rounded-t-full border-4 border-gold bg-gold"
            >
              <Image
                src="/images/founder.png"
                alt="Founder Iratera Kaloka"
                width={1080}
                height={1350}
                sizes="(min-width: 1024px) 16vw, 34vw"
                className="aspect-[4/5] h-auto w-full object-cover"
              />
            </figure>
          </div>

          {/* Letter */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow tone="light">People &amp; Community</Eyebrow>
            <p className="mt-6 text-lead text-cream/85">
              Di balik setiap perjalanan Iratera terdapat orang-orang yang
              memiliki visi yang sama untuk menghadirkan ruang bertumbuh yang
              aman, profesional, dan berdampak.
            </p>

            <h2 className="mt-10 font-display text-heading-lg font-bold">
              A Letter <span className="text-gold">To Every Journey</span>
            </h2>

            <div className="mt-6 space-y-5 leading-8 text-cream/85">
              <p>
                Iratera Kaloka lahir dari keyakinan bahwa setiap individu
                memiliki potensi untuk bertumbuh ketika mereka menemukan ruang
                yang aman, suportif, dan penuh makna.
              </p>
              <p>
                Kami tidak ingin sekadar menghadirkan program, tetapi membangun
                pengalaman belajar yang mampu membantu seseorang mengenal
                dirinya, menemukan arah, dan berkembang secara berkelanjutan.
              </p>
              <p>
                Semoga setiap langkah yang Anda ambil bersama Iratera menjadi
                awal dari perjalanan yang membawa dampak, bukan hanya bagi diri
                sendiri, tetapi juga bagi lingkungan di sekitar.
              </p>
            </div>

            <blockquote className="mt-10 border-l-4 border-gold pl-6">
              <p className="font-display text-2xl font-bold leading-snug md:text-3xl">
                <span data-pp-quote="1" className="block">
                  &ldquo;Growing begins when
                </span>
                <span data-pp-quote="2" className="block">
                  we dare to understand
                </span>
                <span data-pp-quote="3" className="block text-gold">
                  ourselves.&rdquo;
                </span>
              </p>
              <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-cream/80">
                Anisah &mdash; Founder, Iratera Kaloka
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </PeopleScene>
  );
}

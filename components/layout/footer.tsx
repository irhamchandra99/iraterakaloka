import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <Container>
        <div className="py-16 md:py-20">

          {/* TOP GRID */}
          <div className="grid gap-12 md:grid-cols-3">

            {/* LEFT: OPT-IN */}
            <div>
              <h3 className="text-2xl font-semibold leading-snug">
                Join Iraterakaloka Journey
              </h3>

              <p className="mt-3 text-white/60 leading-7">
                Dapatkan insight tentang growth, mental wellness,
                dan program terbaru dari Iratera.
              </p>

              {/* EMAIL FORM */}
              <div className="mt-6 flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-full bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/40"
                />

                <button className="rounded-full bg-[#FFCA18] px-5 py-3 text-sm font-semibold text-black hover:bg-[#ffd84d] transition">
                  Join
                </button>
              </div>

              {/* SOCIALS */}
              <div className="mt-6 flex items-center gap-4 text-white/70">
                {/* Instagram */}
                <a href="#">
                  <Image
                    src="/logos/instagram.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                </a>

                {/* WhatsApp */}
                <a href="#">
                  <Image
                    src="/logos/whatsapp.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                  />
                </a>

                {/* LinkedIn */}
                <a href="#">
                  <Image
                    src="/logos/linkedin.svg"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                  />
                </a>

                {/* Email */}
                <a href="#">
                  <Image
                    src="/logos/email.svg"
                    alt="Email"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </div>

            {/* MIDDLE: BRAND */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/logos/iratera-logo.png"
                alt="Iratera"
                width={160}
                height={60}
              />

              <p className="mt-6 text-white/60 leading-7 max-w-xs">
                Growing Up With Iratera.
                A space for mindful growth,
                meaningful collaboration,
                and impactful journey.
              </p>

              <Link
                href="/about"
                className="mt-6 text-sm text-[#FFCA18] hover:underline"
              >
                Learn More About Us
              </Link>
            </div>

            {/* RIGHT: CONTACT */}
            <div className="text-right">
              <h3 className="text-2xl font-semibold">
                Contact
              </h3>

              <div className="mt-4 space-y-2 text-white/60">
                <p>+62 851-8929-3929</p>
                <p>iraterakaloka@gmail.com</p>
                <p>Indonesia</p>
              </div>

              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center rounded-full bg-[#880A18] px-5 py-3 text-sm font-semibold text-white hover:bg-[#a10d1e] transition"
                >
                  Contact Us
                </a>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="mt-16 border-t border-white/10 pt-6 flex flex-col gap-3 md:flex-row md:justify-between text-white/40 text-sm">
            <p>© 2026 Iratera Kaloka</p>

            <div className="flex gap-6">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Sitemap</Link>
              <Link href="#">Terms</Link>
            </div>
          </div>

        </div>
      </Container>
    </footer>
  );
}
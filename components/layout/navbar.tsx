import Link from "next/link";
import Container from "@/components/shared/container";
import Image from "next/image";
import MobileMenu from "./mobile-menu";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Services", href: "/services" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Menu mobile menambahkan Home secara eksplisit
const mobileNavItems = [{ label: "Home", href: "/" }, ...navItems];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#880A18]";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FEFCF8]/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">

          <Link
            href="/"
            aria-label="Iratera Kaloka - Beranda"
            className={`rounded-lg ${focusRing}`}
          >
            <Image
              src="/logos/iratera-icon.png.png"
              alt="Iratera Kaloka"
              width={140}
              height={44}
              priority
            />
          </Link>

          <nav aria-label="Navigasi utama" className="hidden gap-10 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded text-sm font-medium transition hover:text-[#880A18] ${focusRing}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Disembunyikan di layar sangat kecil agar tidak overflow */}
            <button
              className={`hidden rounded-full bg-[#FFCA18] px-5 py-3 text-sm font-semibold transition hover:scale-105 sm:inline-flex ${focusRing}`}
            >
              Join Community
            </button>

            <MobileMenu items={mobileNavItems} />
          </div>

        </div>
      </Container>
    </header>
  );
}
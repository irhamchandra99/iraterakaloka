import Link from "next/link";
import Container from "@/components/shared/container";
import Image from "next/image";

export default function Navbar() {
  const navItems = [
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Services", href: "/services" },
    { label: "Community", href: "/community" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FEFCF8]/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">

          <Image
            src="/logos/iratera-icon.png.png"
            alt="Iratera Kaloka"
            width={140}
            height={44}
            priority
          />

          <nav className="hidden gap-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition hover:text-[#880A18]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button className="rounded-full bg-[#FFCA18] px-5 py-3 text-sm font-semibold transition hover:scale-105">
            Join Community
          </button>

        </div>
      </Container>
    </header>
  );
}
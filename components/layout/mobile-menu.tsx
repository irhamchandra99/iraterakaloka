"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };

// Menu mobile: satu-satunya bagian Navbar yang butuh state di client.
export default function MobileMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Simpan path saat menu dibuka. Jika route berubah, nilainya tidak lagi
  // sama dengan pathname sehingga menu otomatis tertutup tanpa effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  function close() {
    setOpenedAt(null);
  }

  // Escape menutup menu dari mana pun fokus berada, lalu fokus kembali
  // ke tombol hamburger.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenedAt(null);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpenedAt(open ? null : pathname)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-[#880A18] transition hover:bg-[#FFCA18]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#880A18]"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        id="mobile-navigation"
        aria-label="Navigasi mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-black/5 bg-[#FEFCF8] shadow-lg"
      >
        <ul className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition hover:bg-[#FFCA18]/20 hover:text-[#880A18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#880A18] ${
                    active ? "bg-[#FCFAF7] text-[#880A18]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

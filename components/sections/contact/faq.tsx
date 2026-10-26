"use client";

import { useState } from "react";
import Container from "@/components/shared/container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Bagaimana cara mendaftar program Iratera?",
    answer:
      "Anda dapat melihat program yang sedang dibuka pada halaman Programs, kemudian mengikuti petunjuk pendaftaran yang tersedia atau menghubungi kami melalui halaman Contact.",
  },
  {
    question: "Apakah Iratera melayani workshop untuk institusi atau perusahaan?",
    answer:
      "Ya. Kami menyediakan berbagai layanan seperti workshop, training, konsultasi, dan program pengembangan yang dapat disesuaikan dengan kebutuhan organisasi maupun institusi.",
  },
  {
    question: "Apakah kegiatan Iratera dilakukan secara online atau offline?",
    answer:
      "Keduanya. Kami menyelenggarakan program secara online, offline, maupun hybrid sesuai kebutuhan peserta dan mitra.",
  },
  {
    question: "Bagaimana cara berkolaborasi dengan Iratera?",
    answer:
      "Silakan hubungi kami melalui formulir kontak atau WhatsApp. Tim kami akan berdiskusi mengenai kebutuhan dan bentuk kolaborasi yang paling sesuai.",
  },
  {
    question: "Berapa lama tim Iratera merespons pesan?",
    answer:
      "Kami berusaha memberikan respons dalam 1–2 hari kerja. Untuk kebutuhan yang mendesak, Anda dapat menghubungi kami melalui WhatsApp.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="bg-white py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Frequently Asked Questions
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            Have
            <span className="text-[#880A18]"> Questions?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Berikut beberapa pertanyaan yang paling sering kami terima.
            Jika Anda masih memiliki pertanyaan lain, jangan ragu untuk
            menghubungi kami.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-4xl space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-[24px] border border-black/10 bg-[#FCFAF7]"
            >
              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="flex w-full items-center justify-between p-7 text-left"
              >
                <span className="text-lg font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  size={22}
                  className={`transition duration-300 ${
                    active === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  active === index
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-7 pb-7 leading-8 text-black/60">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
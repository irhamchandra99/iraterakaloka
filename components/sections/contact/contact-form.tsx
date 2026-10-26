"use client";

import Container from "@/components/shared/container";
import { MessageCircle } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="bg-[#FCFAF7] py-28 md:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.5fr_0.8fr]">
          {/* Form */}
          <div className="rounded-[36px] bg-white p-10 shadow-sm md:p-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
              Send Message
            </p>

            <h2 className="heading text-4xl md:text-5xl">
              Let&apos;s Talk
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-black/60">
              Ceritakan kebutuhan, ide, atau rencana kolaborasi Anda.
              Tim Iratera akan menghubungi Anda sesegera mungkin.
            </p>

            <form className="mt-12 space-y-6">
              <div>
                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none transition focus:border-[#880A18]"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none transition focus:border-[#880A18]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Phone
                  </label>

                  <input
                    type="text"
                    placeholder="+62..."
                    className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none transition focus:border-[#880A18]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none transition focus:border-[#880A18]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none transition focus:border-[#880A18]"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-[#880A18] px-8 py-4 font-semibold text-white transition duration-300 hover:bg-[#6E0814]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col justify-between rounded-[36px] bg-[#880A18] p-10 text-white">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFCA18] text-[#880A18]">
                <MessageCircle size={32} />
              </div>

              <h3 className="heading mt-8 text-3xl">
                Need a Faster Response?
              </h3>

              <p className="mt-6 leading-8 text-white/80">
                Untuk pertanyaan cepat atau diskusi awal, Anda juga dapat
                menghubungi kami melalui WhatsApp.
              </p>
            </div>

            <div className="mt-12">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#FFCA18] px-8 py-4 font-semibold text-[#880A18] transition hover:scale-[1.02]"
              >
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
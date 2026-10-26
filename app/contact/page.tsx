import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/sections/contact/hero";
import ContactInfo from "@/components/sections/contact/contact-info";
import ContactForm from "@/components/sections/contact/contact-form";
import FAQ from "@/components/sections/contact/faq";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ContactInfo />
        <ContactForm />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
import Container from "@/components/shared/container";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@iratera.id",
    description: "Kirim pertanyaan atau proposal kolaborasi kepada kami.",
  },
  {
    icon: Phone,
    title: "WhatsApp",
    value: "+62 812-3456-7890",
    description: "Hubungi kami untuk informasi lebih lanjut.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Yogyakarta, Indonesia",
    description: "Terbuka untuk kolaborasi online maupun offline.",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Mon – Fri • 09.00 – 17.00 WIB",
    description: "Kami akan merespons secepat mungkin pada jam kerja.",
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-white py-28 md:py-36">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[30px] border border-black/5 bg-[#FCFAF7] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#880A18] text-white">
                  <Icon size={26} />
                </div>

                <h3 className="heading mt-8 text-2xl">
                  {item.title}
                </h3>

                <p className="mt-4 font-semibold text-[#880A18]">
                  {item.value}
                </p>

                <p className="mt-4 leading-7 text-black/60">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
import Container from "@/components/shared/container";

const activities = [
  {
    title: "Monthly Sharing Session",
    category: "Discussion",
    description:
      "Sesi diskusi rutin untuk berbagi pengalaman, wawasan, dan refleksi bersama anggota komunitas.",
  },
  {
    title: "Workshop & Learning Class",
    category: "Learning",
    description:
      "Kegiatan pembelajaran interaktif bersama praktisi dan fasilitator untuk meningkatkan pengetahuan serta keterampilan.",
  },
  {
    title: "Community Gathering",
    category: "Networking",
    description:
      "Membangun hubungan yang lebih dekat melalui aktivitas santai, networking, dan kolaborasi lintas komunitas.",
  },
  {
    title: "Social Impact Project",
    category: "Impact",
    description:
      "Program kolaboratif yang mendorong anggota komunitas menciptakan dampak nyata bagi lingkungan sekitar.",
  },
];

export default function Activities() {
  return (
    <section className="bg-white py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Community Activities
          </p>

          <h2 className="heading text-4xl md:text-6xl">
            Learn,
            <span className="text-[#880A18]"> Connect & Grow</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Komunitas Iratera menghadirkan berbagai aktivitas yang dirancang
            untuk memperluas wawasan, memperkuat relasi, dan menciptakan
            pengalaman belajar yang bermakna.
          </p>
        </div>

        <div className="mt-20 space-y-10">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              className="grid gap-8 border-b border-black/10 pb-10 md:grid-cols-[120px_1fr]"
            >
              <div>
                <p className="heading text-5xl text-[#FFCA18]">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
              </div>

              <div>
                <span className="rounded-full bg-[#880A18]/10 px-4 py-2 text-sm font-semibold text-[#880A18]">
                  {activity.category}
                </span>

                <h3 className="heading mt-5 text-3xl">
                  {activity.title}
                </h3>

                <p className="mt-5 max-w-3xl leading-8 text-black/65">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
import Container from "@/components/shared/container";
import { VisionMissionScene } from "@/components/motion/about-scenes";
import Eyebrow from "@/components/ui/eyebrow";

const missions = [
  "Menyediakan ruang belajar, refleksi, dan pengembangan diri yang aman serta bermakna.",
  "Mengembangkan program berbasis psikologi, pendidikan, dan pengembangan manusia.",
  "Membangun komunitas yang saling mendukung dalam proses bertumbuh.",
  "Berkolaborasi dengan individu maupun organisasi untuk menciptakan dampak yang berkelanjutan.",
];

// Scene 04: Vision takes the stage, then gives way to Mission.
export default function VisionMission() {
  return (
    <VisionMissionScene className="relative overflow-hidden bg-sand py-24 md:py-32">
      <div
        aria-hidden="true"
        data-vm-disc
        className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-maroon md:h-96 md:w-96"
      />
      <div
        aria-hidden="true"
        data-vm-ring
        className="absolute -bottom-20 left-[8%] hidden h-56 w-56 rounded-full border-[20px] border-gold lg:block"
      />

      <Container>
        <div className="relative">
          <Eyebrow>Our Direction</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
            Vision &amp; <span className="text-maroon">Mission</span>
          </h2>

          <div data-vm-stage className="mt-12 grid gap-16">
            <div data-vm-vision className="lg:pr-[14%]">
              <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-maroon">
                Vision
              </h3>
              <p
                data-vm-quote
                className="mt-6 font-display text-heading-xl font-bold text-ink"
              >
                &ldquo;Menjadi ruang bertumbuh yang menginspirasi individu,
                komunitas, dan organisasi untuk berkembang secara sadar, sehat,
                dan berdampak.&rdquo;
              </p>
            </div>

            <div data-vm-mission className="lg:ml-[38%]">
              <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-maroon">
                Mission
              </h3>
              <ol className="mt-6 border-t border-maroon/20">
                {missions.map((mission, index) => (
                  <li
                    key={mission}
                    data-vm-item
                    className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-maroon/20 py-5"
                  >
                    <span className="font-display text-2xl font-bold text-maroon">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lead text-ink/80">{mission}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </VisionMissionScene>
  );
}

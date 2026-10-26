"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Scroll reveal for a selected block. With `stagger`, only descendants marked
 * data-reveal-item animate; otherwise the whole block fades up once.
 * No-op for reduced motion; content is never hidden by CSS.
 */
export default function Reveal({
  children,
  className,
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const targets = stagger
          ? root.querySelectorAll<HTMLElement>("[data-reveal-item]")
          : [root];

        if (!targets.length) return;

        gsap.from(targets, {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

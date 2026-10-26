"use client";

import { useRef } from "react";
import {
  DESKTOP_MOTION,
  gsap,
  headerOffset,
  MOTION_OK,
  SplitText,
  useGSAP,
} from "@/lib/gsap";

// Shows hero content immediately when JavaScript is unavailable.
const NO_SCRIPT_STYLE =
  "<style>[data-hero-intro] [data-hero-title],[data-hero-intro] [data-hero-fade],[data-hero-intro] [data-hero-art]{visibility:visible!important;animation:none!important}</style>";

/**
 * Scene 01 (arrival) and the hero half of Scene 02 (portal).
 *
 * Targets, each transformed by only one timeline per property:
 * - data-hero-title: headline; lines split for the entrance, scaled on scroll
 * - data-hero-fade: eyebrow, intro, CTAs, stats (entrance)
 * - data-hero-copy / data-hero-stats: wrappers moved on scroll
 * - data-hero-art: illustration column (entrance transform only)
 * - data-hero-parallax: travels on scroll; data-hero-float floats inside it
 * - data-hero-arch, data-hero-sun-dot: drawn in on entrance
 * - data-hero-sun: grows into the portal on scroll
 * - data-hero-depth, data-hero-trail: depth layers (trail's path enters)
 */
export default function HeroIntro({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = <T extends Element = HTMLElement>(selector: string) =>
        root.querySelector<T>(selector);

      const hero = root.closest("section") ?? root;
      const title = q("[data-hero-title]");
      const fades = root.querySelectorAll<HTMLElement>("[data-hero-fade]");
      const copy = q("[data-hero-copy]");
      const stats = q("[data-hero-stats]");
      const art = q("[data-hero-art]");
      const parallax = q("[data-hero-parallax]");
      const float = q("[data-hero-float]");
      const arch = q("[data-hero-arch]");
      const sun = q("[data-hero-sun]");
      const sunDot = q("[data-hero-sun-dot]");
      const trail = q<SVGElement>("[data-hero-trail]");
      const depth = (layer: string) => q(`[data-hero-depth="${layer}"]`);

      const mm = gsap.matchMedia();

      /* ---------- Scene 01: arrival (time-based, once on load) ---------- */
      mm.add(MOTION_OK, () => {
        if (!title) return;

        gsap.set(title, { visibility: "visible" });

        // autoSplit re-splits after font load/resize; returning the timeline
        // lets SplitText keep its progress when it re-splits.
        const split = SplitText.create(title, {
          type: "lines",
          autoSplit: true,
          onSplit(self) {
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            // Lines rise from a tilt, one after another.
            tl.from(self.lines, {
              yPercent: 110,
              rotation: 4,
              transformOrigin: "0% 100%",
              autoAlpha: 0,
              duration: 1.2,
              stagger: 0.11,
            });

            // The world assembles: the art column lands (its own transform;
            // scroll moves the inner parallax wrapper), the arch grows up.
            if (art) {
              tl.from(
                art,
                { y: 90, scale: 0.82, rotation: -4, autoAlpha: 0, duration: 1.4 },
                0.3
              );
            }
            if (arch) {
              tl.from(arch, { scaleY: 0, duration: 1.1, ease: "expo.inOut" }, 0.45);
            }
            if (sunDot) {
              tl.from(sunDot, { scale: 0, duration: 0.9, ease: "back.out(2)" }, 0.9);
            }
            const trailPath = trail?.querySelector("path");
            if (trailPath) {
              tl.from(trailPath, { autoAlpha: 0, x: -40, duration: 1 }, 0.9);
            }

            // Eyebrow, intro, CTAs and stats land last.
            if (fades.length) {
              tl.from(
                fades,
                { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 },
                0.75
              );
            }

            return tl;
          },
        });

        return () => split.revert();
      });

      // Gentle float on desktop only (continuous decoration).
      mm.add(DESKTOP_MOTION, () => {
        if (!float) return;
        gsap.to(float, {
          y: -12,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
        });
      });

      /* ---------- Scene 01 → 02: transformation and portal (desktop) ---------- */
      mm.add(DESKTOP_MOTION, () => {
        if (!title || !copy || !parallax || !art || !sun) return;

        // Scale needed for the sun to cover the whole hero from where it is.
        // Uses layout size (offsetWidth) so the current scale doesn't matter.
        const portalScale = () => {
          const s = sun.getBoundingClientRect();
          const h = hero.getBoundingClientRect();
          const cx = s.left + s.width / 2;
          const cy = s.top + s.height / 2;
          const far = Math.max(
            Math.hypot(cx - h.left, cy - h.top),
            Math.hypot(cx - h.right, cy - h.top),
            Math.hypot(cx - h.left, cy - h.bottom),
            Math.hypot(cx - h.right, cy - h.bottom)
          );
          return (far / (sun.offsetWidth / 2)) * 1.05;
        };

        // If the hero is taller than the space under the header, let the
        // visitor scroll to its bottom first (stats stay visible), then pin.
        const overflow = () =>
          Math.max(0, hero.offsetHeight - (window.innerHeight - headerOffset()));
        const start = () =>
          overflow() > 0 ? "bottom bottom" : `top ${headerOffset()}px`;

        const tl = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: {
            trigger: hero,
            start,
            end: () => `+=${window.innerHeight * 1.8}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Beat 1 (0 → 1): the composition transforms.
        // Headline shrinks while the copy slides back under the header line
        // (by the measured overflow), so it stays fully readable when pinned.
        tl.to(title, { scale: 0.72, transformOrigin: "0% 0%", ease: "power2.inOut" }, 0)
          .to(copy, { y: overflow, ease: "power2.inOut" }, 0);
        if (stats) tl.to(stats, { y: 60, autoAlpha: 0, duration: 0.6 }, 0);

        // Illustration travels on an arc: x and y use different eases.
        tl.to(parallax, { x: () => -art.offsetWidth * 0.42, ease: "power1.inOut" }, 0)
          .to(parallax, { y: () => -art.offsetHeight * 0.24, ease: "sine.out", duration: 0.5 }, 0)
          .to(parallax, { y: () => art.offsetHeight * 0.04, ease: "sine.in", duration: 0.5 }, 0.5)
          .to(parallax, { scale: 1.2, rotation: -3, ease: "power1.inOut" }, 0);

        // Depth layers drift at different speeds and directions.
        const far = depth("far");
        const mid = depth("mid");
        const near = depth("near");
        if (far) tl.to(far, { x: -60, y: -40 }, 0);
        if (mid) tl.to(mid, { x: 140, y: 70, rotation: 25 }, 0);
        if (near) tl.to(near, { x: -260, y: -200, scale: 1.8 }, 0);
        if (trail) tl.to(trail, { x: 160, autoAlpha: 0, duration: 0.7 }, 0);
        if (arch) tl.to(arch, { scaleY: 0.82, transformOrigin: "50% 100%" }, 0);

        // Beat 2 (1 → 2): the sun becomes the portal and fills the hero.
        tl.set(art, { zIndex: 20 }, 1)
          .set(sun, { zIndex: 3 }, 1)
          .to(sun, { scale: portalScale, ease: "power2.in", duration: 1 }, 1)
          .to(copy, { autoAlpha: 0.15, scale: 0.96, transformOrigin: "0% 50%", duration: 0.6 }, 1)
          .to(parallax, { autoAlpha: 0, duration: 0.5 }, 1.35)
          .set(copy, { pointerEvents: "none" }, 1.5);

        [far, mid, near].forEach((el) => {
          if (el) tl.to(el, { autoAlpha: 0, duration: 0.4 }, 1);
        });
      });

      /* ---------- Tablet and mobile: lighter, unpinned handoff ---------- */
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        if (!title || !parallax) return;

        const tl = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: {
            trigger: hero,
            start: () => `top ${headerOffset()}px`,
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(title, { scale: 0.9, transformOrigin: "0% 0%" }, 0)
          .to(parallax, { y: -60, scale: 1.08, rotation: -2 }, 0);
        if (sun) tl.to(sun, { scale: 2.4, x: -30, y: 40 }, 0);
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} data-hero-intro className={className}>
      <noscript dangerouslySetInnerHTML={{ __html: NO_SCRIPT_STYLE }} />
      {children}
    </div>
  );
}

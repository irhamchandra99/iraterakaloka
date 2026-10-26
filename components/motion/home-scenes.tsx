"use client";

import { useRef } from "react";
import {
  DESKTOP_MOTION,
  gsap,
  headerOffset,
  MOTION_OK,
  useGSAP,
} from "@/lib/gsap";

/*
 * Homepage scenes 02–06. Each scene renders its <section>, keeps the content
 * server-rendered (children), and targets elements by data attributes.
 * Story timelines are scrubbed (bidirectional) and live inside
 * gsap.matchMedia(), so they are reverted on breakpoint change, unmount and
 * reduced motion. Content is only ever dimmed with opacity, never hidden with
 * visibility, so it stays reachable for keyboard and screen-reader users.
 */

type SceneProps = {
  children: React.ReactNode;
  className?: string;
};

type Setup = (root: HTMLElement, mm: gsap.MatchMedia) => void;

const TABLET_UP_MOTION = `(min-width: 768px) and ${MOTION_OK}`;

function useScene(setup: Setup) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      setup(root, gsap.matchMedia());
    },
    { scope: ref }
  );

  return ref;
}

const one = <T extends Element = HTMLElement>(root: Element, selector: string) =>
  root.querySelector<T>(selector);

const all = <T extends Element = HTMLElement>(root: Element, selector: string) =>
  Array.from(root.querySelectorAll<T>(selector));

/* ------------------------------------------------------------------------ */
/* Scene 02 (second half) + Scene 03: portal reveal and illustrated journey  */
/* ------------------------------------------------------------------------ */
export function AboutScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(DESKTOP_MOTION, () => {
      const reveal = one(root, "[data-about-reveal]");
      const stage = one(root, "[data-about-stage]");
      const traveler = one(root, "[data-about-traveler]");
      const trail = one<SVGPathElement>(root, "[data-about-trail]");
      const shift = one(root, "[data-about-shift]");
      const items = all(root, "[data-about-item]");
      const milestones = all(root, "[data-about-milestone]");

      /* Portal, part 2: the hero ends fully gold; this section continues the
         gold and a cream circle opens from its top edge to reveal About. */
      if (reveal) {
        root.classList.add("about-portal");

        gsap.fromTo(
          reveal,
          { clipPath: "circle(0% at 50% 0%)" },
          {
            clipPath: "circle(125% at 50% 0%)",
            ease: "power1.in",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "top 15%",
              scrub: true,
            },
          }
        );
      }

      if (!stage || !traveler || !trail) {
        return () => root.classList.remove("about-portal");
      }

      /* Journey: the walkers follow the trail (feet on the line) through
         several states while the trail draws itself and milestones light. */
      const length = trail.getTotalLength();
      gsap.set(trail, { strokeDasharray: length, strokeDashoffset: length });

      // Place milestones on the trail (viewBox units are percentages of the
      // stage because the SVG fills it with preserveAspectRatio="none").
      const stops = [0.36, 0.68, 1];
      milestones.forEach((dot, index) => {
        const point = trail.getPointAtLength(length * stops[index]);
        gsap.set(dot, {
          display: "block",
          left: `${point.x}%`,
          top: `${point.y}%`,
          scale: 0,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top 70%",
          end: "bottom 45%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        traveler,
        {
          motionPath: {
            path: trail,
            align: trail,
            alignOrigin: [0.5, 0.92],
          },
          duration: 1,
        },
        0
      )
        // Several deliberate states: lean in, stride, turn back, arrive.
        .fromTo(
          traveler,
          { rotation: -6, scale: 0.8 },
          { rotation: 5, scale: 1.02, duration: 0.36, ease: "sine.inOut" },
          0
        )
        .to(traveler, { rotation: -4, scale: 0.9, duration: 0.32, ease: "sine.inOut" }, 0.36)
        .to(traveler, { rotation: 0, scale: 1.08, duration: 0.32, ease: "sine.inOut" }, 0.68)
        .to(trail, { strokeDashoffset: 0, duration: 1 }, 0);

      // Typography reacts: the heading leans toward the walkers' path.
      if (shift) {
        tl.fromTo(shift, { xPercent: 0 }, { xPercent: 18, duration: 0.5, ease: "sine.out" }, 0)
          .to(shift, { xPercent: 0, duration: 0.5, ease: "sine.in" }, 0.5);
      }

      // Each milestone pops as the walkers reach it; its pillar comes forward.
      stops.forEach((stop, index) => {
        const dot = milestones[index];
        const item = items[index];
        if (dot) {
          tl.to(dot, { scale: 1, duration: 0.08, ease: "back.out(3)" }, stop - 0.08);
        }
        if (item) {
          tl.fromTo(
            item,
            { opacity: 0.3, x: 40 },
            { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" },
            Math.max(0, stop - 0.24)
          );
        }
      });

      return () => root.classList.remove("about-portal");
    });

    // Smaller screens: the illustration swings in with the scroll instead.
    mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
      const traveler = one(root, "[data-about-traveler]");
      if (!traveler) return;
      gsap.fromTo(
        traveler,
        { xPercent: -18, rotation: -6, scale: 0.88 },
        {
          xPercent: 0,
          rotation: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: traveler,
            start: "top bottom",
            end: "center 55%",
            scrub: true,
          },
        }
      );
    });
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Scene 04a: typography takeover — "Growing Together In A Conscious Way"    */
/* ------------------------------------------------------------------------ */
export function WhyScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(
      { wide: "(min-width: 768px)", motion: MOTION_OK },
      (context) => {
        const { wide, motion } = context.conditions ?? {};
        if (!motion) return;

        const heading = one(root, "[data-why-heading]");
        const word = (key: string) => one(root, `[data-why-word="${key}"]`);
        const statement = one(root, "[data-why-statement]");
        const ghost = one(root, "[data-why-ghost]");
        if (!heading) return;

        // Words start far apart and oversized, then lock into the sentence.
        const spread = wide ? 1 : 0.45;
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: heading,
            start: "top bottom",
            end: "top 30%",
            scrub: true,
          },
        });

        tl.fromTo(
          word("growing"),
          { xPercent: -70 * spread, scale: 1.35, transformOrigin: "0% 100%" },
          { xPercent: 0, scale: 1 },
          0
        )
          .fromTo(
            word("together"),
            { xPercent: 90 * spread, scale: 1.6, transformOrigin: "100% 100%" },
            { xPercent: 0, scale: 1 },
            0
          )
          .fromTo(word("in-a"), { xPercent: -40 * spread, opacity: 0.2 }, { xPercent: 0, opacity: 1 }, 0.15)
          .fromTo(
            word("conscious"),
            { scale: 0.45, transformOrigin: "0% 75%", opacity: 0.2 },
            { scale: 1, opacity: 1 },
            0.2
          );

        if (statement) {
          tl.fromTo(statement, { x: 80 * spread, opacity: 0.3 }, { x: 0, opacity: 1 }, 0.35);
        }

        // Outlined layer travels against the scroll across the whole section.
        if (ghost) {
          gsap.fromTo(
            ghost,
            { xPercent: 10 },
            {
              xPercent: -45,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      }
    );

    // Three columns at three depths (side-by-side layouts only).
    mm.add(TABLET_UP_MOTION, () => {
      const grid = one(root, "[data-why-columns]");
      const cols = all(root, "[data-why-col]");
      if (!grid || cols.length === 0) return;

      const offsets = [
        [80, -20],
        [200, -60],
        [40, -10],
      ];

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: grid,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      cols.forEach((col, index) => {
        const [from, to] = offsets[index % offsets.length];
        tl.fromTo(col, { y: from }, { y: to }, 0);
      });
    });
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Scene 04b: pinned values — each value takes over the stage in turn      */
/* ------------------------------------------------------------------------ */
export function ValuesScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(`(min-height: 640px) and ${DESKTOP_MOTION}`, () => {
      const items = all(root, "[data-value-item]");
      const progress = one(root, "[data-values-progress]");
      const orb = one(root, "[data-values-orb]");
      if (items.length < 2) return;

      // Stack the values in one cell and enlarge them (CSS in globals.css).
      // Added only here so the list stays a normal list without JS, on small
      // screens and with reduced motion.
      root.classList.add("values-stage");

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: root,
          start: () => `top ${headerOffset()}px`,
          end: () => `+=${window.innerHeight * 0.75 * (items.length - 1)}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(items.slice(1), { opacity: 0, yPercent: 60 });

      // Hold so the first value is readable before it moves.
      tl.to({}, { duration: 0.8 });

      items.slice(1).forEach((item, index) => {
        const previous = items[index];
        const number = one(item, "[data-value-number]");
        const title = one(item, "[data-value-title]");
        const previousNumber = one(previous, "[data-value-number]");
        const previousTitle = one(previous, "[data-value-title]");

        // Outgoing: the title shrinks away upward, its number flies off.
        tl.to(previous, { opacity: 0, yPercent: -60, duration: 0.45 });
        if (previousTitle) {
          tl.to(previousTitle, { scale: 0.8, transformOrigin: "0% 50%", duration: 0.45 }, "<");
        }
        if (previousNumber) {
          tl.to(previousNumber, { yPercent: -120, rotation: -8, duration: 0.45 }, "<");
        }

        // Incoming: oversized title settles, number rises from below.
        tl.fromTo(
          item,
          { opacity: 0, yPercent: 60 },
          { opacity: 1, yPercent: 0, duration: 0.45 },
          ">-0.25"
        );
        if (title) {
          tl.fromTo(title, { scale: 1.25, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.45 }, "<");
        }
        if (number) {
          tl.fromTo(number, { yPercent: 120, rotation: 8 }, { yPercent: 0, rotation: 0, duration: 0.45 }, "<");
        }

        // Rest: the value stays fully readable for most of each step.
        tl.to({}, { duration: 1 });
      });

      if (progress) {
        tl.fromTo(
          progress,
          { scaleX: 1 / items.length },
          { scaleX: 1, ease: "none", duration: tl.duration() },
          0
        );
      }

      // The gold orb rides the progress rail (transform only).
      const rail = orb?.parentElement;
      if (orb && rail) {
        tl.fromTo(
          orb,
          { x: () => rail.offsetWidth / items.length },
          { x: () => rail.offsetWidth, ease: "none", duration: tl.duration() },
          0
        );
      }

      return () => root.classList.remove("values-stage");
    });
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Scene 05: program universe — each program is its own illustrated scene   */
/* ------------------------------------------------------------------------ */
export function ProgramsScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(DESKTOP_MOTION, () => {
      const track = one(root, "[data-programs-track]");
      const progress = one(root, "[data-programs-progress]");
      const panels = all(root, "[data-program-item]");
      if (!track || panels.length === 0) return;

      root.classList.add("programs-rail");

      // Measured, not hard-coded: the track starts and ends flush with the
      // container's content box (clientWidth includes its padding).
      const distance = () => {
        const parent = track.parentElement;
        if (!parent) return 0;
        const style = getComputedStyle(parent);
        const content =
          parent.clientWidth -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight);
        return Math.max(0, track.scrollWidth - content);
      };

      // Only pin when the whole section fits under the header; otherwise
      // keep the normal vertical layout instead of cutting content off.
      const fits = root.offsetHeight <= window.innerHeight - headerOffset();
      if (distance() <= 0 || !fits) {
        root.classList.remove("programs-rail");
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: () => `top ${headerOffset()}px`,
          end: () => `+=${distance() * 1.2}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -distance(), duration: 1 }, 0);
      if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);

      // Each panel grows into focus at the centre and recedes after; its
      // background shape blooms and the illustration slides across it.
      panels.forEach((panel) => {
        const shape = one(panel, "[data-program-shape]");
        const art = one(panel, "[data-program-art]");
        const copy = one(panel, "[data-program-copy]");

        const focus = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });

        focus
          .fromTo(panel, { scale: 0.82, opacity: 0.45 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
          .to(panel, { scale: 0.82, opacity: 0.45, duration: 0.5, ease: "power2.in" }, 0.5);
        if (shape) {
          focus
            .fromTo(shape, { scale: 0.3, rotation: -30 }, { scale: 1.15, rotation: 0, duration: 0.5 }, 0)
            .to(shape, { scale: 0.6, rotation: 20, duration: 0.5 }, 0.5);
        }
        if (art) focus.fromTo(art, { xPercent: 22 }, { xPercent: -22, duration: 1 }, 0);
        if (copy) focus.fromTo(copy, { xPercent: -12 }, { xPercent: 12, duration: 1 }, 0);
      });

      // Keyboard: bring a focused, off-screen program into view by scrolling
      // the page to the matching progress instead of scrolling the track.
      const st = tl.scrollTrigger;
      const onFocus = (event: FocusEvent) => {
        const panel = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-program-item]"
        );
        const max = distance();
        if (!panel || !st || max <= 0) return;
        const center = panel.offsetLeft + panel.offsetWidth / 2;
        const parentWidth = track.parentElement?.clientWidth ?? 0;
        const ratio = Math.min(1, Math.max(0, (center - parentWidth / 2) / max));
        window.scrollTo({ top: st.start + ratio * (st.end - st.start) });
      };

      track.addEventListener("focusin", onFocus);

      return () => {
        track.removeEventListener("focusin", onFocus);
        root.classList.remove("programs-rail");
      };
    });

    // Smaller screens: vertical panels; the shape blooms as each scrolls in.
    mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
      all(root, "[data-program-item]").forEach((panel) => {
        const shape = one(panel, "[data-program-shape]");
        if (!shape) return;
        gsap.fromTo(
          shape,
          { scale: 0.4 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "center 60%",
              scrub: true,
            },
          }
        );
      });
    });
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Scene 06: finale — a maroon disc grows into the CTA and the story lands   */
/* ------------------------------------------------------------------------ */
export function CtaScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(
      { wide: "(min-width: 1024px)", motion: MOTION_OK },
      (context) => {
        const { wide, motion } = context.conditions ?? {};
        if (!motion) return;

        const lineOne = one(root, '[data-cta-line="1"]');
        const lineTwo = one(root, '[data-cta-line="2"]');
        const gold = one(root, "[data-cta-gold]");
        const ring = one(root, "[data-cta-ring]");
        const art = one(root, "[data-cta-art]");
        const sparks = all(root, "[data-cta-spark]");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          },
        });

        // Echo of the hero portal: this time a maroon disc becomes the scene.
        tl.fromTo(
          root,
          { clipPath: "circle(6% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)", ease: "power2.in" },
          0
        );

        const reach = wide ? 1 : 0.4;
        if (lineOne) tl.fromTo(lineOne, { xPercent: -45 * reach }, { xPercent: 0, ease: "power2.out" }, 0);
        if (lineTwo) tl.fromTo(lineTwo, { xPercent: 45 * reach }, { xPercent: 0, ease: "power2.out" }, 0);
        if (gold) {
          tl.fromTo(
            gold,
            { scale: 1.5, transformOrigin: "0% 80%" },
            { scale: 1, ease: "power3.out" },
            0.1
          );
        }

        // Illustration and accents converge into the final composition.
        if (art) {
          tl.fromTo(
            art,
            { xPercent: 40, yPercent: 30, rotation: 8, scale: 0.7 },
            { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, ease: "power2.out" },
            0.1
          );
        }
        if (ring) tl.fromTo(ring, { y: 240, scale: 0.4 }, { y: 0, scale: 1, ease: "power2.out" }, 0);
        sparks.forEach((spark, index) => {
          const dx = (index % 2 === 0 ? -1 : 1) * (120 + index * 40);
          tl.fromTo(
            spark,
            { x: dx, y: 140 + index * 30, scale: 0 },
            { x: 0, y: 0, scale: 1, ease: "power2.out" },
            0.2
          );
        });
      }
    );
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

"use client";

import { useRef } from "react";
import {
  DESKTOP_MOTION,
  gsap,
  headerOffset,
  MOTION_OK,
  ScrollTrigger,
  SplitText,
  useGSAP,
} from "@/lib/gsap";

/*
 * About page scenes 01–06. Same rules as the homepage scenes: each scene
 * renders its <section> around server-rendered children, targets elements by
 * data attributes, scrubs its story timelines (bidirectional) inside
 * gsap.matchMedia(), and never hides content with visibility (opacity only),
 * so everything stays reachable with keyboards and screen readers.
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

// True when a section fits under the sticky header, so it can be pinned
// without cutting content off. 2px tolerance: sections sized with
// calc(100svh - 5rem) sit exactly against the 1px header border.
const fitsViewport = (el: HTMLElement) =>
  el.offsetHeight <= window.innerHeight - headerOffset() + 2;

// Prepare a path to be "drawn" with stroke-dashoffset; returns its length.
const prepareDraw = (path: SVGPathElement) => {
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  return length;
};

/* ------------------------------------------------------------------------ */
/* Scene 01: introduction                                                   */
/* ------------------------------------------------------------------------ */
export function AboutHeroScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    const title = one(root, "[data-ah-title]");
    const ins = all(root, "[data-ah-in]");
    const fades = all(root, "[data-ah-fade]");
    const art = one(root, "[data-ah-art]");
    const ring = one(root, "[data-ah-ring]");
    const ribbon = one<SVGPathElement>(root, "[data-ah-ribbon]");
    const dot = one(root, "[data-ah-dot]");
    const walkers = one(root, "[data-ah-walkers]");
    const copy = one(root, "[data-ah-copy]");
    const lineOne = one(root, '[data-ah-line="1"]');
    const lineTwo = one(root, '[data-ah-line="2"]');

    // Entrance (time-based, once): the two lines arrive from opposite sides,
    // the ring and road appear, the walkers step in, then the copy.
    mm.add(MOTION_OK, () => {
      if (title) gsap.set(title, { visibility: "visible" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      ins.forEach((line, index) => {
        tl.from(
          line,
          {
            xPercent: index === 0 ? -30 : 30,
            rotation: index === 0 ? -3 : 3,
            autoAlpha: 0,
            duration: 1.3,
          },
          index * 0.15
        );
      });

      if (art) tl.from(art, { y: 70, autoAlpha: 0, duration: 1.3 }, 0.35);
      if (ring) tl.from(ring, { autoAlpha: 0, duration: 1 }, 0.5);
      if (ribbon) {
        prepareDraw(ribbon);
        tl.to(ribbon, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 0.55);
      }
      if (dot) tl.from(dot, { scale: 0, duration: 0.8, ease: "back.out(2.5)" }, 1);
      if (fades.length) {
        tl.from(fades, { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.6);
      }
    });

    // Scroll (desktop): the headline pulls apart and grows while the walkers
    // step down toward the story below. Wrappers differ from entrance targets.
    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: root,
          start: () => `top ${headerOffset()}px`,
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (lineOne) tl.to(lineOne, { xPercent: -22 }, 0);
      if (lineTwo) {
        tl.to(lineTwo, { xPercent: 8, scale: 1.14, transformOrigin: "100% 50%" }, 0);
      }
      if (copy) tl.to(copy, { y: -80, opacity: 0.3 }, 0);
      if (walkers) {
        tl.to(walkers, { y: () => root.offsetHeight * 0.32, scale: 1.12, rotation: 3 }, 0);
      }
      if (ring) tl.to(ring, { scale: 1.6, opacity: 0 }, 0);
      if (ribbon) tl.to(ribbon, { x: 120 }, 0);
      if (dot) tl.to(dot, { y: 160, x: -60 }, 0);
    });
  });

  return (
    <section ref={ref} data-about-intro className={className}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Scene 02: the story unfolds in a maroon window, read word by word        */
/* ------------------------------------------------------------------------ */
export function StoryScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(DESKTOP_MOTION, () => {
      const text = one(root, "[data-story-text]");
      const road = one<SVGPathElement>(root, "[data-story-road]");
      const heading = one(root, "h2");
      if (!text) return;

      // Words (not lines) so the highlight survives any re-wrap on resize.
      const split = SplitText.create(all(text, "p"), { type: "words" });
      const pin = fitsViewport(root);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: pin
          ? {
              trigger: root,
              start: () => `top ${headerOffset()}px`,
              end: () => `+=${window.innerHeight * 1.6}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            }
          : {
              trigger: root,
              start: "top 85%",
              end: "bottom 60%",
              scrub: true,
            },
      });

      // The window: a small maroon frame (where the hero illustration was)
      // opens to the full section. clip-path runs only in this one beat.
      tl.fromTo(
        root,
        { clipPath: "inset(30% 6% 22% 50% round 2.5rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 0rem)", ease: "power2.inOut", duration: 0.35 },
        0
      );
      if (heading) {
        tl.fromTo(heading, { y: 60, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.3 }, 0.1);
      }

      // Then the story is read: words light up in order.
      tl.fromTo(
        split.words,
        { opacity: 0.18 },
        { opacity: 1, duration: 0.6, stagger: { amount: 0.55 } },
        0.38
      );

      if (road) {
        prepareDraw(road);
        tl.to(road, { strokeDashoffset: 0, duration: 1 }, 0);
      }

      return () => split.revert();
    });
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Scene 03: the walkers follow a route through the five values             */
/* ------------------------------------------------------------------------ */
export function JourneyScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(DESKTOP_MOTION, () => {
      const route = one(root, "[data-aj-route]");
      const svg = one<SVGSVGElement>(root, "[data-aj-svg]");
      const path = one<SVGPathElement>(root, "[data-aj-path]");
      const walker = one(root, "[data-aj-walker]");
      const stops = all(root, "[data-aj-stop]");
      if (!route || !svg || !path || !walker || stops.length === 0) return;

      let length = 0;
      let stopProgress: number[] = [];

      // Build the route from the real positions of the values: the path
      // passes beside each value on the side opposite its text. Rebuilt on
      // every refresh (resize, fonts), before ScrollTrigger re-measures.
      const build = () => {
        const box = route.getBoundingClientRect();
        const w = box.width;
        const h = box.height;
        const points = stops.map((stop, index) => {
          const r = stop.getBoundingClientRect();
          // 84% / 16% match the walker's static centre (right-[6%], w-[20%]).
          return { x: index % 2 === 0 ? w * 0.84 : w * 0.16, y: r.top - box.top + r.height / 2 };
        });

        // Start where the walker's feet already are, so nothing jumps when
        // the scene begins.
        const feet = walker.offsetHeight * 0.88;
        let d = `M${points[0].x} ${feet} L${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          const a = points[i - 1];
          const b = points[i];
          const mid = (b.y - a.y) / 2;
          d += ` C${a.x} ${a.y + mid}, ${b.x} ${b.y - mid}, ${b.x} ${b.y}`;
        }
        const last = points[points.length - 1];
        d += ` L${last.x} ${h}`;

        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        path.setAttribute("d", d);
        svg.style.display = "block";

        // Markers sit on the route beside each value.
        stops.forEach((stop, index) => {
          const marker = one(stop, "[data-aj-marker]");
          if (!marker) return;
          gsap.set(marker, {
            display: "block",
            left: points[index].x,
            top: stop.offsetHeight / 2,
          });
        });

        // Progress along the path at which the walker reaches each value.
        length = path.getTotalLength();
        const samples = 240;
        stopProgress = points.map((point) => {
          for (let s = 0; s <= samples; s++) {
            if (path.getPointAtLength((length * s) / samples).y >= point.y) {
              return s / samples;
            }
          }
          return 1;
        });
        gsap.set(path, { strokeDasharray: length });
      };

      build();
      ScrollTrigger.addEventListener("refreshInit", build);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: route,
          start: "top 55%",
          end: "bottom 55%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        walker,
        {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.88] },
          duration: 1,
        },
        0
      ).fromTo(
        path,
        { strokeDashoffset: () => length },
        { strokeDashoffset: 0, duration: 1 },
        0
      );

      // Turn the walkers to face the next side of the route.
      stopProgress.forEach((progress, index) => {
        if (index === 0) return;
        tl.to(
          walker,
          { rotation: index % 2 === 0 ? 4 : -4, duration: 0.06 },
          Math.max(0, progress - 0.1)
        );
      });

      // Each value lights up when the walkers arrive beside it.
      stops.forEach((stop, index) => {
        const at = stopProgress[index] ?? index / stops.length;
        const card = one(stop, "[data-aj-card]");
        const number = one(stop, "[data-aj-number]");
        const marker = one(stop, "[data-aj-marker]");
        const from = index % 2 === 0 ? -40 : 40;

        if (card) {
          tl.fromTo(card, { opacity: 0.25, x: from }, { opacity: 1, x: 0, duration: 0.08 }, Math.max(0, at - 0.08));
        }
        if (number) {
          tl.fromTo(
            number,
            { scale: 0.5, transformOrigin: "0% 100%" },
            { scale: 1, duration: 0.08, ease: "back.out(2)" },
            Math.max(0, at - 0.06)
          );
        }
        if (marker) {
          tl.fromTo(marker, { scale: 0 }, { scale: 1, duration: 0.04, ease: "back.out(3)" }, Math.max(0, at - 0.03));
        }
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", build);
        path.removeAttribute("d");
        svg.style.display = "";
      };
    });
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Scene 04: Vision fills the stage word by word, then becomes Mission      */
/* ------------------------------------------------------------------------ */
export function VisionMissionScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(DESKTOP_MOTION, () => {
      const vision = one(root, "[data-vm-vision]");
      const mission = one(root, "[data-vm-mission]");
      const quote = one(root, "[data-vm-quote]");
      const items = all(root, "[data-vm-item]");
      const disc = one(root, "[data-vm-disc]");
      const ring = one(root, "[data-vm-ring]");
      if (!vision || !mission || !quote) return;

      // Overlay Vision and Mission in one stage (CSS in globals.css). Added
      // only here, so the default layout is a plain readable sequence.
      root.classList.add("vm-stage");
      if (!fitsViewport(root)) {
        root.classList.remove("vm-stage");
        return;
      }

      const split = SplitText.create(quote, { type: "words" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: () => `top ${headerOffset()}px`,
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Beat A: the vision is spoken word by word; the disc drifts in.
      tl.fromTo(split.words, { opacity: 0.15 }, { opacity: 1, duration: 1, stagger: { amount: 0.8 } }, 0);
      if (disc) tl.fromTo(disc, { xPercent: 40, scale: 0.7 }, { xPercent: 0, scale: 1, duration: 1 }, 0);

      // Hold, then beat B: Vision recedes to the corner, Mission arrives.
      tl.to({}, { duration: 0.3 });
      tl.addLabel("mission");
      tl.to(
        vision,
        { scale: 0.48, opacity: 0.35, transformOrigin: "0% 0%", ease: "power2.inOut", duration: 0.7 },
        "mission"
      ).fromTo(
        mission,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
        "mission+=0.2"
      );
      items.forEach((item, index) => {
        tl.fromTo(
          item,
          { opacity: 0, x: 80 },
          { opacity: 1, x: 0, ease: "power2.out", duration: 0.35 },
          `mission+=${0.3 + index * 0.15}`
        );
      });
      if (disc) {
        // Away from the mission text: the disc rises off the top-right edge.
        tl.to(disc, { yPercent: -75, xPercent: 45, scale: 0.8, ease: "power2.inOut", duration: 1 }, "mission");
      }
      if (ring) tl.fromTo(ring, { y: 120 }, { y: -80, ease: "power2.inOut", duration: 1 }, "mission");
      tl.to({}, { duration: 0.4 });

      return () => {
        split.revert();
        root.classList.remove("vm-stage");
      };
    });
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Scene 05: people & community — collage layers and the founder's words    */
/* ------------------------------------------------------------------------ */
export function PeopleScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    // Layered collage parallax (side-by-side or wide layouts).
    mm.add(TABLET_UP_MOTION, () => {
      const layers: [string, gsap.TweenVars, gsap.TweenVars][] = [
        ["[data-pp-disc]", { y: 60, scale: 0.9 }, { y: -40, scale: 1.04 }],
        ["[data-pp-community]", { y: 90, rotation: -3 }, { y: -70, rotation: 1 }],
        ["[data-pp-founder]", { y: 180, rotation: 6 }, { y: -40, rotation: -2 }],
        ['[data-pp-accent="1"]', { y: 160, x: -40 }, { y: -120, x: 20 }],
        ['[data-pp-accent="2"]', { y: -60, scale: 0.5 }, { y: 80, scale: 1.2 }],
      ];

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      layers.forEach(([selector, from, to]) => {
        const el = one(root, selector);
        if (el) tl.fromTo(el, from, to, 0);
      });
    });

    // The founder's quote assembles line by line from alternating sides.
    mm.add(MOTION_OK, () => {
      const lines = all(root, "[data-pp-quote]");
      const quote = lines[0]?.closest("blockquote");
      if (!quote) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: quote,
          start: "top 95%",
          end: "top 45%",
          scrub: true,
        },
      });

      lines.forEach((line, index) => {
        const last = index === lines.length - 1;
        tl.fromTo(
          line,
          last
            ? { scale: 0.7, opacity: 0.3, transformOrigin: "0% 50%" }
            : { xPercent: index % 2 === 0 ? -25 : 25, opacity: 0.3 },
          last ? { scale: 1, opacity: 1 } : { xPercent: 0, opacity: 1 },
          index * 0.15
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
/* Scene 06: closing — a cream arch rises out of the maroon and opens       */
/* ------------------------------------------------------------------------ */
export function ClosingScene({ children, className }: SceneProps) {
  const ref = useScene((root, mm) => {
    mm.add(
      { desktop: "(min-width: 1024px)", motion: MOTION_OK },
      (context) => {
        const { desktop, motion } = context.conditions ?? {};
        if (!motion) return;

        const arch = one(root, "[data-cl-arch]");
        const lineOne = one(root, '[data-cl-line="1"]');
        const lineTwo = one(root, '[data-cl-line="2"]');
        const walkers = one(root, "[data-cl-walkers]");
        const ribbon = one<SVGPathElement>(root, "[data-cl-ribbon]");
        if (!arch) return;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          },
        });

        // A doorway: narrow arch at the bottom that opens to the full panel.
        tl.fromTo(
          arch,
          {
            clipPath: desktop
              ? "inset(45% 24% 0% 24% round 999px 999px 0px 0px)"
              : "inset(25% 8% 0% 8% round 999px 999px 0px 0px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
            ease: "power2.inOut",
          },
          0
        );

        // Oversized words settle into the final message.
        if (lineOne) {
          tl.fromTo(
            lineOne,
            { scale: desktop ? 1.35 : 1.1, transformOrigin: "0% 100%" },
            { scale: 1, ease: "power3.out" },
            0.1
          );
        }
        if (lineTwo) {
          tl.fromTo(lineTwo, { xPercent: desktop ? 18 : 6 }, { xPercent: 0, ease: "power3.out" }, 0.15);
        }

        // The walkers arrive on an arc and the road is laid under them.
        if (walkers && desktop) {
          tl.fromTo(walkers, { xPercent: 45 }, { xPercent: 0, ease: "power1.out" }, 0.1)
            .fromTo(walkers, { yPercent: -35 }, { yPercent: 0, ease: "sine.out" }, 0.1)
            .fromTo(walkers, { rotation: 8, scale: 0.75 }, { rotation: 0, scale: 1 }, 0.1);
        }
        if (ribbon) {
          prepareDraw(ribbon);
          tl.to(ribbon, { strokeDashoffset: 0, ease: "power2.inOut" }, 0.2);
        }
      }
    );
  });

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

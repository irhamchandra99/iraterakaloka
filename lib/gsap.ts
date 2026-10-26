"use client";

// Register GSAP plugins once. Import from here only in Client Components.
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, MotionPathPlugin);

export { gsap, MotionPathPlugin, ScrollTrigger, SplitText, useGSAP };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = `(min-width: 1024px) and ${MOTION_OK}`;

// Height of the sticky site header, so pinned scenes start below it.
export const headerOffset = () =>
  document.querySelector("header")?.getBoundingClientRect().height ?? 0;

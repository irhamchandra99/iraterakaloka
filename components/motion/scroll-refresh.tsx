"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Place once, after all scroll scenes on a page. Runs after the scenes'
 * layout effects so pins are measured top-to-bottom, then re-measures once
 * web fonts have loaded (headline heights change with the font).
 */
export default function ScrollRefresh() {
  useEffect(() => {
    let active = true;

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    document.fonts?.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });

    return () => {
      active = false;
    };
  }, []);

  return null;
}

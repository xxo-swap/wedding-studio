"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollWrapper({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // 1️⃣ Initialize Lenis
    const lenis = new Lenis({
      duration: 1,           // easing duration
    easing: (t) => t * (2 - t),          // linear easing
      smooth: true,
      direction: 'vertical', // vertical scroll
    });

    // 2️⃣ RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3️⃣ Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Optional: handle resize
    window.addEventListener('resize', () => lenis.resize());

    // Cleanup
    return () => {
      lenis.destroy();
      window.removeEventListener('resize', () => lenis.resize());
    };
  }, []);

  return (
    <div ref={scrollRef}>
      {children}
    </div>
  );
}

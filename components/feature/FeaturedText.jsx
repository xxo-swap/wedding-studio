"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function FeaturedText() {
  const top = useRef(null);
  const middle = useRef(null);
  const bottom = useRef(null);

  // Center middle span function
  const centerMiddleSpan = (ref, initialOffset = 0) => {
    if (!ref.current) return;
    const spans = ref.current.children;
    const middleWord = spans[Math.floor(spans.length / 2)];
    const centerOfViewport = window.innerWidth / 2;
    const centerOfSpan = middleWord.offsetLeft + middleWord.offsetWidth / 2;
    const offset = centerOfViewport - centerOfSpan + initialOffset;
    gsap.set(ref.current, { x: offset});
  };

  useEffect(() => {
    centerMiddleSpan(top, 50);
    centerMiddleSpan(middle);
    centerMiddleSpan(bottom, -50);

    // Re-center on resize
    const handleResize = () => {
      [top, middle, bottom].forEach(centerMiddleSpan);
    };
    window.addEventListener('resize', handleResize);

    // Horizontal parallax on scroll using ScrollTrigger
    gsap.to(top.current, {
      xPercent: -1, // move left
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: middle.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(bottom.current, {
      xPercent: 1, // move right
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: middle.current,
        start: "top bottom",
        end: "bottom -50%",
        scrub: true,
      }
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-[150vh] flex flex-col items-center justify-center gap-6 overflow-clip">
      
      {/* Top Line */}
      <div ref={top} className="text-5xl uppercase whitespace-nowrap flex gap-4 font-black opacity-60">
        {Array(15).fill("Every couple is different.").map((t, i) => (
          <span key={i} className={i === 7 ? "opacity-100" : "opacity-30"}>{t}</span>
        ))}
      </div>

      {/* Middle Line */}
      <div ref={middle} className="text-5xl uppercase tracking-widest whitespace-nowrap flex gap-4 font-black opacity-80">
        {Array(15).fill("Here are a few moments.").map((t, i) => (
          <span key={i} className={i === 7 ? "opacity-100" : "opacity-30"}>{t}</span>
        ))}
      </div>

      {/* Bottom Line */}
      <div ref={bottom} className="text-5xl uppercase whitespace-nowrap flex gap-4 font-black opacity-60">
        {Array(15).fill("We captured moments that pause time.").map((t, i) => (
          <span key={i} className={i === 7 ? "opacity-100" : "opacity-30"}>{t}</span>
        ))}
      </div>

    </div>
  );
}

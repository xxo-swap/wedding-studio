"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TestimonialText() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    let splitHeading;
    let splitPara;

    document.fonts.ready.then(() => {
      splitHeading = SplitText.create(headingRef.current, {
        type: "chars",
        charsClass: "char"
      });

      splitPara = SplitText.create(paraRef.current, {
        type: "chars",
        charsClass: "char"
      });

      gsap.fromTo(
        splitHeading.chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        splitPara.chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          ease: "power3.out",
          scrollTrigger: {
            trigger: paraRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      splitHeading?.revert();
      splitPara?.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="h-[100vh] flex flex-col items-center justify-center text-center gap-4 overflow-hidden">
      <h1
        ref={headingRef}
        className="text-5xl font-black uppercase tracking-wide whitespace-nowrap"
      >
        Listen to their stories.
      </h1>

      <p
        ref={paraRef}
        className="text-sm font-black uppercase tracking-wide max-w-[90vw]"
      >
        Every wedding leaves a memory behind. Here’s what our couples carried with them.
      </p>
    </section>
  );
}

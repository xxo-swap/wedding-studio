"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TestimonialText() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    let splitHeading;
    let splitPara;

    document.fonts.ready.then(() => {
      splitHeading = SplitText.create(headingRef.current, { type: "chars" });
      splitPara = SplitText.create(paraRef.current, { type: "chars" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",          // 👈 scroll distance
          scrub: true,
          pin: true,
          pinSpacing:true,
          anticipatePin: 1,
        }
      });

      tl.fromTo(
        splitHeading.chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "power2.out"
        }
      );

      tl.fromTo(
        splitPara.chars,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          ease: "power2.out"
        },
        "-=0.3" // slight overlap
      );
    });

    return () => {
      splitHeading?.revert();
      splitPara?.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen flex flex-col items-center justify-center text-center gap-4 overflow-hidden"
    >
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

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function HeroTransition({data}) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[45vh] flex items-center justify-center"
    >
      <div ref={textRef} className="text-center px-6">
        <span className="font-ui text-xs tracking-[0.4em] uppercase text-secondary">
          {data.label}
        </span>

        <h2 className="mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight">
          {data.heading1}{" "}
          <span className="italic text-accent">{data.heading2}</span>
        </h2>

        <div className="mt-8 h-px w-24 mx-auto bg-primary/30" />
      </div>
    </section>
  );
}

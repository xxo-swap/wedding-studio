"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, Flip, ScrollTrigger } from "@/lib/gsap";
import { heroImages } from "@/src/data/weddings";

export default function Hero() {
  const wrapperRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const galleryEl = galleryRef.current;
    const wrapperEl = wrapperRef.current;
    if (!galleryEl || !wrapperEl) return;

    const ctx = gsap.context(() => {
      const items = galleryEl.querySelectorAll("div.relative");

      galleryEl.classList.add("final-layout");
      const state = Flip.getState(items);
      galleryEl.classList.remove("final-layout");

      const flipAnim = Flip.to(state, {
        ease: "expo.inOut",
        simple: true,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: wrapperEl,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          flipAnim.progress(self.progress);
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full max-w-[1440px] mx-auto ">
      <div className="relative h-[200vh]">
        <div ref={wrapperRef} className="sticky top-0 h-screen overflow-hidden w-full">
          <div
            ref={galleryRef}
            className="
              grid
              grid-cols-[repeat(3,23vw)]
              grid-rows-[repeat(4,30vh)]
              gap-[1vh]
              w-full
              h-full
              px-[2vw]
              content-center
              justify-center
              overflow-hidden
              
            "
          >
            {heroImages.map((img, index) => {
              const gridClasses = [
                "row-start-1 row-end-3 col-start-1 col-end-2",
                "row-start-1 row-end-2 col-start-2 col-end-3",
                "row-start-2 row-end-4 col-start-2 col-end-3",
                "row-start-1 row-end-3 col-start-3 col-end-4",
                "row-start-3 row-end-4 col-start-1 col-end-2",
                "row-start-3 row-end-4 col-start-3 col-end-4",
                "row-start-4 row-end-5 col-start-1 col-end-2",
                "row-start-4 row-end-5 col-start-2 col-end-3",
                "row-start-4 row-end-5 col-start-3 col-end-4",
              ];

              return (
                <div
                  key={index}
                  className={`relative overflow-hidden  ${gridClasses[index]}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    loading="eager"
                    fill
                    sizes="33vw"
                    className="object-cover w-full h-full transition-transform duration-500 ease-out hover:scale-105"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

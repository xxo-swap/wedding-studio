"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroImages from "../data";

gsap.registerPlugin(Flip, ScrollTrigger);

export default function Hero() {
  const galleryRef = useRef(null);

  useEffect(() => {
  const galleryEl = galleryRef.current;
  const items = galleryEl.querySelectorAll("div.relative");

  ScrollTrigger.matchMedia({

    // DESKTOP
    "(min-width: 768px)": () => {
      let flipCtx;

      const createFlip = () => {
        flipCtx?.revert();

        flipCtx = gsap.context(() => {
          galleryEl.classList.add("final-layout");
          const state = Flip.getState(items);
          galleryEl.classList.remove("final-layout");

          const flip = Flip.to(state, {
            ease: "expo.inOut",
            simple: true
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: galleryEl,
              start: "center center",
              end: "+=100%",
              scrub: true,
              pin: galleryEl.parentNode
            }
          }).add(flip);
        }, galleryEl);
      };

      createFlip();
      window.addEventListener("resize", createFlip);

      return () => {
        window.removeEventListener("resize", createFlip);
        flipCtx?.revert();
      };
    },

    // MOBILE
    "(max-width: 767px)": () => {
      // Simpler, cheaper animation
      gsap.from(items, {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryEl,
          start: "top 80%",
          end: "bottom top",
          scrub: false
        }
      });
    }

  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);


  return (
    <section className="relative w-full ">
      <div
        ref={galleryRef}
        className="
          max-w-[1440px] mx-auto 
          overflow-hidden
          grid
          grid-cols-[repeat(3, 32.5vw)]
          grid-rows-[repeat(4, 23vh)]
          gap-[1vh]
          w-full
          h-[100vh]
          px-[2vw]
          transition-all
        "
      >
        {heroImages.map((img, index) => {
          const gridClasses = [
            "row-start-1 row-end-3 col-start-1 col-end-2 ", // 1
            "row-start-1 row-end-2 col-start-2 col-end-3", // 2
            "row-start-2 row-end-4 col-start-2 col-end-3", // 3
            "row-start-1 row-end-3 col-start-3 col-end-4", // 4
            "row-start-3 row-end-4 col-start-1 col-end-2", // 5
            "row-start-3 row-end-4 col-start-3 col-end-4", // 6
            "row-start-4 row-end-5 col-start-1 col-end-2", // 7
            "row-start-4 row-end-5 col-start-2 col-end-3", // 8
            "row-start-4 row-end-5 col-start-3 col-end-4", // 9
          ];

          return (
            <div
              key={img.id}
              className={`
                relative
                overflow-hidden
                ${gridClasses[index]}
              `}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

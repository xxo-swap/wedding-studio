"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

function Hero1() {
  const containerRef = useRef(null);
  const imageWrapRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

      // Subtle parallax for the video
      tl.to(imageWrapRef.current, { yPercent: 10, ease: "none" }, 0);
      
      // Text fade and slight lift
      tl.to(heroTextRef.current, { y: -50, opacity: 0, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-black py-20 px-4 md:px-10">
      {/* CINEMATIC CONTAINER 
         aspect-[21/9] or aspect-[2.35/1] creates the wide-screen look.
      */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1440px] mx-auto aspect-[21/9] min-h-[400px] overflow-hidden rounded-sm shadow-2xl"
      >
        Background Video Wrap
        <div ref={imageWrapRef} className="absolute inset-0 z-0 scale-[1.1]">
          <video
            className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-[1.1] sepia-[0.1] blur-[0.5px]"
            src="/heroVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* FILM GRAIN - Moves and hides artifacts */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none opacity-[0.12] mix-blend-screen"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dqcsk8rsc/image/upload/v1664265917/noise_v976nx.gif')` }}
          />

          {/* MESH TEXTURE - Breaks up pixels */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none opacity-[0.15]" 
            style={{
              backgroundImage: `radial-gradient(circle, #fff 0.5px, transparent 0.5px)`,
              backgroundSize: '4px 4px'
            }}
          />

          {/* VIGNETTE - Cinematic framing */}
          <div className="absolute inset-0 z-20 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        {/* Content */}
        <div
          ref={heroTextRef}
          className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6"
        >
          <span className="font-ui text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/50 mb-4 block">
            Gorakhpur • Cinematic 
          </span>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white font-light">
            Moments Deserve
            <br />
            <span className="italic font-normal text-white/90">Forever</span>
          </h1>

          <Link href="https://www.youtube.com/watch?v=sD0WhhtEwsM" className="mt-8 group">
            <button className="px-8 py-3 rounded-full font-ui text-[9px] tracking-[0.3em] uppercase border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
              Watch On Youtube
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero1;
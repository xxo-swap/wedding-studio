"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function Hero() {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          ref={imageRef}
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
          alt="Wedding Hero"
          fill
          priority
          className="object-cover scale-[1.25]"
        />
      </div>

      <div className="absolute inset-0 z-30 flex flex-col items-center pt-20 text-center px-6 ">
        <h1 className="text-6xl font-serif text-primary">
          Some Moments Deserve <br /> to Last Forever
        </h1>

        <Link href="#featured" className="mt-6">
          <button className="px-6 py-2 rounded-full">
            Explore Stories
          </button>
        </Link>
      </div>
    </section>
  );
}

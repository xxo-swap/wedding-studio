"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function TestimonialCouple({ couples = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cursorRef = useRef(null);
  const imageWrapRef = useRef(null);
  const total = couples.length;

  const next = () => setCurrentIndex((i) => (i + 1) % total);
  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    gsap.set(cursorRef.current, {
      x: -100,
      y: -100,
      opacity: 0,
    });
  }, []);

  const handleMove = (e) => {
    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width / 2;

    cursorRef.current.innerText = isLeft ? "←" : "→";

    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 1,
      opacity: 1,
      ease: "power3.out",
      onComplete: () => {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 1,
        });
      }
    });
  };

  const handleClick = (e) => {
    gsap.to(cursorRef.current, {
      scale: 0.8,
      duration: 0.2,
      onComplete: () => gsap.to(cursorRef.current, { scale: 1, duration: 0.2
      })
    });
    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    x < rect.width / 2 ? prev() : next();
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">
      {/* Image Area */}
      <div
        ref={imageWrapRef}
        onMouseMove={handleMove}
        onClick={handleClick}
        // onMouseLeave={() => gsap.to(cursorRef.current, { opacity: 0 })}
        className="relative w-[100vw] h-[70vh] overflow-hidden cursor-none"
      >
        <Image
          src={couples[currentIndex].image}
        // onMouseEnter={() => gsap.to(cursorRef.current, { opacity: 1 })}
          alt={couples[currentIndex].name}
          fill
          className="object-cover"
        />
      </div>

      {/* Text Block */}
      <div className=" flex flex-col items-center justify-center">
        <div className="text-sm uppercase tracking-widest opacity-70">
          {couples[currentIndex].name}
        </div>
        <p className="text-base leading-relaxed opacity-80 italic">
          “{couples[currentIndex].caption}”
        </p>
      </div>

      {/* Floating Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none opacity-0
           border rounded-full w-16 h-16 flex items-center justify-center
           -translate-x-1/2 -translate-y-1/2"
      >
        →
      </div>
    </div>
  );
}

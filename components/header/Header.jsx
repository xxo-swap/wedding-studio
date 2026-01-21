"use client";

import Link from "next/link";
import {  use, useRef } from "react";
import gsap from "gsap";
import { useEffect } from "react";

export default function Header() {
    const headerRef = useRef(null);

    useEffect
    (() => {
      
      gsap.to(headerRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=100",
          scrub: true,
          pin: true,
          pinSpacing: false,
        }
      });

    }, []);

  return (
    <header ref={headerRef} className="relative top-0 left-0 right-0 z-50 pointer-events-auto bg-cyan-800" >
      <div className="max-w-[1440px] h-[50px] px-[20px] mx-auto flex items-center justify-between text-black">
        <Link href="/about" className="">
          About
        </Link>

        <Link href="/" className="cursor-pointer font-semibold tracking-widest">
          Wedding Studio
        </Link>

        <Link href="/contact" className="">
          Contact
        </Link>
      </div>
    </header>
  );
}

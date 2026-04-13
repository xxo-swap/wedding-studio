"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePathname } from "next/navigation";

export default function Header() {
  const headerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!headerRef.current) return;

    // Kill any existing ScrollTriggers before creating new ones
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const ctx = gsap.context(() => {
      const showAnim = gsap
        .from(headerRef.current, {
          yPercent: -100,
          paused: true,
          duration: 0.3,
        })
        .progress(1);

      // Slide header in/out on scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        },
      });

      // Background color + blur on scroll
      gsap.to(headerRef.current, {
        backgroundColor: "rgba(239, 233, 226, 0.8)",
        backdropFilter: "blur(10px)",
        scrollTrigger: {
          start: "top top",
          end: "+=50",
          scrub: true,
          id: "header-bg",
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, [pathname]); // Re-run effect on route change

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-300 border-b border-primary/5"
    >
      <div className="max-w-[1440px] h-[70px] px-6 md:px-12 mx-auto flex items-center justify-between">
        {/* Left nav */}
        <div className="flex-1 flex justify-start space-x-8">
          <Link
            href="/about"
            className="font-ui text-xs uppercase md:tracking-[0.2em] text-primary hover:text-accent transition-colors"
          >
            About
          </Link>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <Link
            href="/"
            className="font-display text-xl md:text-3xl text-primary tracking-tighter"
          >
            <Image
              src="/logo/logo.png"
              width={150}
              height={40}
              alt="Wedding Studio Logo"
              className="ml-2"
            />
          </Link>
        </div>

        {/* Right nav */}
        <div className="flex-1 flex justify-end">
          <Link
            href="/contact"
            className="font-ui text-xs uppercase md:tracking-[0.2em] text-primary hover:text-accent transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

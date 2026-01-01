"use client";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Header() {
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.from(".nav-item", {
      y: -30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: navRef });

  return (
    <header className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-border text-text">
      <nav ref={navRef} className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center min-h-[64px]">
        <Link href="/" className="text-xl font-serif tracking-widest nav-item hover:text-primary transition-colors duration-200">
          Wedding Studio
        </Link>

        <div className="flex gap-8 text-sm uppercase tracking-widest">
          <Link href="/portfolio" className="nav-item hover:text-primary transition-colors duration-200">Portfolio</Link>
          <Link href="/about" className="nav-item hover:text-primary transition-colors duration-200">About</Link>
          <Link href="/contact" className="nav-item hover:text-primary transition-colors duration-200">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

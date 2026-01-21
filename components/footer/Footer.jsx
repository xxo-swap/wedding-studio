"use client";

import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const iconsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(iconsRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3");
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full flex items-center justify-center">
      <div className="w-full max-w-[1400px] px-12 flex flex-col items-center  text-center font-sans">
        
        <h2 ref={titleRef} className="text-3xl font-semibold">
          Preserving your story. Reach out when the moment feels right.
        </h2>


        <div ref={iconsRef} className="flex gap-5 mt-6 text-2xl items-center">
          <a href="https://instagram.com" target="_blank" className="hover:opacity-80">
            <FaInstagram />
          </a>

          <a href="https://wa.me/916386760485" target="_blank" className="hover:opacity-80">
            <FaWhatsapp />
          </a>

          <a href="tel:6386760485" className="flex items-center gap-2 text-sm tracking-wide hover:opacity-80">
            <FaPhoneAlt className="text-xl" />
            6386760485
          </a>
        </div>

      </div>
    </footer>
  );
}

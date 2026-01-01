"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative h-screen w-full bg-surface grid place-items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
        alt="Wedding Hero"
        fill
        className="object-cover"
        priority
      />


      {/* Hero text */}
      <div className="relative z-30 text-center">
        <h1 className="text-6xl font-serif text-primary">Capturing Love Stories</h1>
        <p className="mt-4 text-text tracking-wide">Luxury Wedding Photography</p>
      </div>
    </section>
  );
}

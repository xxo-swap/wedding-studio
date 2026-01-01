"use client";

import Image from "next/image";

export default function Gallery() {
  // Array of external image URLs
const images = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
];


  return (
    <section className="bg-bg grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
      {images.map((src, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-surface"
        >
          <Image
            src={src}
            width={500}
            height={700}
            alt={`Wedding photography ${i + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            priority={i === 0} // first image loads with priority
          />
        </div>
      ))}
    </section>
  );
}

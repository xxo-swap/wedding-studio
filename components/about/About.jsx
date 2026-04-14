"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { TEAM_DATA } from "@/src/data/teamData";

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".team-card").forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-bg text-text overflow-x-hidden">
      
      {/* SECTION 1: ABOUT */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <h2 className="font-display text-4xl md:text-6xl text-primary leading-tight">
            We capture <br /> 
            <span className="italic">real emotions.</span>
          </h2>
          <p className="font-body text-lg text-text/80">
            We love making films. A photo shows a moment, but a video makes you feel it. We focus on natural light and real stories.
          </p>
        </div>
      </section>

      {/* SECTION 2: BIG IMAGE */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000"
          alt="Work"
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover  grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h3 className="font-display text-2xl md:text-5xl text-bg">
            Cinematic films for your big day.
          </h3>
        </div>
      </section>

      {/* SECTION 3: TEAM */}
      <section className="px-6 py-16 md:py-32 bg-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-10">Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_DATA.map((member) => (
              <div key={member.id} className="team-card">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <h4 className="font-display text-xl text-primary">{member.name}</h4>
                <p className="font-ui text-xs uppercase tracking-widest text-text/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT CTA */}
     <section className="pb-32 px-6 text-center">
  <div className="max-w-4xl mx-auto border-t border-primary/10 pt-16">
    <p className="text-xl md:text-2xl text-primary mb-8">
      We woud love to work with you!
    </p>
    
    {/* Wrap the button in a Link component */}
    <Link href="/contact">
      <button className="bg-primary text-bg px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-accent transition-all active:scale-95">
        Contact Us
      </button>
    </Link>
  </div>
</section>
    </main>
  );
}
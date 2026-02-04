"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FeaturedCouple({ couple }) {
  const featureImageRef = useRef(null);
  const outerWrapper = useRef(null);

  useEffect(() => {
    gsap.to(featureImageRef.current, {
      y: -200,
      scrollTrigger: {
        trigger:outerWrapper.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },

    });
  }, []);

  return (
    <div
      id="featured"
      className="relative flex items-center justify-between gap-8 h-[100vh]"
    >
          
     <div ref={outerWrapper} className=" relative w-[60vw] h-[30vh] overflow-hidden">
       <div ref={featureImageRef} className="relative w-[100vw] h-[80vh]" >
        <Image
          src={couple.img}
          alt="Wedding Photo"
          fill
          className="object-cover top left"
        />
      </div>
     </div>

      <div className="flex flex-col gap-4 w-[30vw]">
        <div className="text-sm tracking-wide uppercase">{couple.name}</div>
        <div className="flex justify-end">
          <button className="border px-4 py-2 uppercase tracking-wide text-sm">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

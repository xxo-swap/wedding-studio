// components/PageLoaderWrapper.js
"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageLoaderWrapper({ children, minTime = 0.8 }) {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    // Start fade-out animation after minimum time
    const timeout = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => setLoading(false),
      });
    }, minTime * 1000);

    return () => clearTimeout(timeout);
  }, [minTime]);

  return (
    <>
      {/* Loader */}
      {loading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"></div>)}

      {/* Content */}
      <div
        className={`transition-opacity duration-1200${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}

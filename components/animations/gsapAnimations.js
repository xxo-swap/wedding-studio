// gsapAnimations.js
import gsap from "gsap";

// Animate hero background fade-in
export const heroBgFadeIn = (selector, options = {}) => {
  gsap.fromTo(
    selector,
    { opacity: 0, scale: 1.05 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      ...options,
    }
  );
};

// Animate text appearing
export const heroTextAppear = (selector, options = {}) => {
  gsap.from(selector, {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    ...options,
  });
};

// Optional: subtle pulse effect on hero image
export const heroPulse = (selector, options = {}) => {
  gsap.to(selector, {
    scale: 1.02,
    repeat: -1,
    yoyo: true,
    duration: 1.2,
    ease: "power1.inOut",
    ...options,
  });
};

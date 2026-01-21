"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import collection from "./collection";

export default function ScrollObserver() {
  const containerRef = useRef(null);
  const gallerycontainerRef = useRef(null);
  const galleryRef = useRef(null);
  const titlecontainerRef = useRef(null);

  const currentTitle = useRef(null);
  const isPreviewActive = useRef(false);
  const isTransitioning = useRef(false);

  const config = useRef({
    imageCount: 20,
    radius: 250,
    sensitivity: 500,
    effectFallOff: 200,
    cardMovementAmount: 50,
    lerpFactor: 0.15,
    isMobile: false,
  });

  const parallaxState = {
    targetY: 0,
    targetZ: 0,
    targetX: 0,
    currentX: 0,
    currentY: 0,
    currentZ: 0,
  };

  const rafId = useRef(null);

  useEffect(() => {
    let lastTime = performance.now();
    let previewRotation = 0;
    const cards = [];
    const transformState = [];
    for (let i = 0; i < collection.length; i++) {
      const angle = (i / collection.length) * Math.PI * 2;
      const x = Math.cos(angle) * config.current.radius;
      const y = Math.cos(angle) * config.current.radius;
      const cardIndex = i % collection.length;

      const card = document.createElement("div");
      card.className = "card";
      card.dataset.index = i;
      card.dataset.title = collection[cardIndex].title;

      const img = document.createElement("img");
      img.src = collection[cardIndex].imageUrl;
      card.appendChild(img);

      gsap.set(card, {
        x,
        y,
        rotation: (angle * 180) / Math.PI + 90,
        transformPerspective: 800,
        transformOrigin: "center center",
      });

      galleryRef.current.appendChild(card);
      cards.push(card);
      transformState.push({
        currentRotation: 0,
        targetRotation: 0,
        currentX: 0,
        targetX: 0,
        currentY: 0,
        targetY: 0,
        currentScale: 1,
        targetScale: 1,
        angle,
      });

      card.addEventListener("click", (e) => {
        if (!isPreviewActive.current && !isTransitioning.current) {
          togglePreview(parseInt(card.dataset.index));
          e.stopPropagation();
        }
      });
    }

    function togglePreview(index) {
      const titleText = cards[index].dataset.title;
      const p = document.createElement("p");
      p.className = "title-text";
      p.textContent = titleText;
      titlecontainerRef.current.appendChild(p);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      currentTitle.current = p;

      const splitText = new SplitText(p, {
        type: "words",
        wordsClass: "word",
      });

      const words = splitText.words;

      gsap.set(words, { y: "125%" });
      gsap.to(words, {
        y: "0%",
        ease: "power3.out",
        stagger: 0.05,
      });

      isTransitioning.current = true;

      isPreviewActive.current = true;
      const angle = transformState[index].angle;
      const targetPosition = (Math.PI * 3) / 2;
      let rotationRadians = targetPosition - angle;
      if (rotationRadians > Math.PI) {
        rotationRadians -= Math.PI * 2;
      } else if (rotationRadians < -Math.PI) {
        rotationRadians += Math.PI * 2;
      }

      previewRotation = rotationRadians;

      transformState.forEach((state) => {
        state.currentRotation = state.targetRotation = 0;
        state.currentScale = state.targetScale = 1;
        state.currentX = state.targetX = state.currentY = state.targetY = 0;
      });

      gsap.to(galleryRef.current, {
        onStart: () => {
          cards.forEach((card, i) => {
            gsap.to(card, {
              x: config.current.radius * Math.cos(transformState[i].angle),
              y: config.current.radius * Math.sin(transformState[i].angle),
              rotationY: 0,
              scale: 1,
              duration: 1,
              ease: "power3.inOut",
            });
          });
        },
        scale: 5,
        y: 1300,
        rotation: (previewRotation * 180) / Math.PI + 360,
        duration: 2,
        ease: "power3.inOut",
        onComplete: () => {
          isTransitioning.current = false;
        },
      });
    }

    gsap.to(parallaxState, {
      currentX: 0,
      currentY: 0,
      currentZ: 0,
      duration: 0,
      ease: "power3.inOut",
      onUpdate: () => {
        gsap.set(gallerycontainerRef, {
          rotateX: parallaxState.currentX,
          rotateY: parallaxState.currentY,
          rotateZ: parallaxState.currentZ,
          transformOrigin: "center center",
        });
      },
    });

    function resetGallery() {
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      if (currentTitle.current) {
        const words = currentTitle.current.querySelectorAll(".word");
        gsap.to(words, {
          y: "-125%",
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.04,
          onComplete: () => {
            currentTitle.current.remove();
            currentTitle.current = null;
          },
        });
      }

      transformState.forEach((state) => {
        state.targetRotation = 0;
        state.targetScale = 1;
        state.targetX = 0;
        state.targetY = 0;
      });

      gsap.to(galleryRef.current, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          isPreviewActive.current = false;
          isTransitioning.current = false;
        },
      });
    }

    const viewPortWidth = window.innerWidth;
    let galleryScale = 1;

    if (viewPortWidth < 768) {
      galleryScale = 0.6;
    } else if (viewPortWidth < 1200) {
      galleryScale = 0.8;
    }

    function handleResize() {
      const viewPortWidth = window.innerWidth;

      let galleryScale = 1;

      if (viewPortWidth < 768) {
        galleryScale = 0.6;
      } else if (viewPortWidth < 1200) {
        galleryScale = 0.8;
      }

      config.current.isMobile = viewPortWidth < 1000;

      gsap.to(galleryRef.current, {
        scale: galleryScale,
      });

      if (!isPreviewActive.current) {
        parallaxState.targetX = 0;
        parallaxState.targetY = 0;
        parallaxState.targetZ = 0;
        parallaxState.currentX = 0;
        parallaxState.currentY = 0;
        parallaxState.currentZ = 0;

        transformState.forEach((state) => {
          state.targetRotation = 0;
          state.currentRotation = 0;
          state.targetScale = 1;
          state.currentScale = 1;
          state.targetX = 0;
          state.currentX = 0;
          state.targetY = 0;
          state.currentY = 0;
        });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    document.addEventListener("click", () => {
      if (isPreviewActive.current && !isTransitioning.current) {
        resetGallery();
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (
        isPreviewActive.current ||
        isTransitioning.current ||
        config.current.isMobile
      )
        return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const percentX = (e.clientX - centerX) / centerX;
      const percentY = (e.clientY - centerY) / centerY;

      parallaxState.targetY = percentX * 15;
      parallaxState.targetX = -percentY * 15;
      parallaxState.targetZ = (percentX + percentY) * 5;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.current.sensitivity && !config.current.isMobile) {
          const flipfactor = Math.max(
            0,
            1 - distance / config.current.effectFallOff
          );
          const angle = transformState[i].angle;
          const moveAmount = config.current.cardMovementAmount * flipfactor;

          transformState[i].targetX = moveAmount * Math.cos(angle);
          transformState[i].targetY = moveAmount * Math.sin(angle);
          transformState[i].targetRotation = flipfactor * 180;
          transformState[i].targetScale = 1 + flipfactor * 0.3;
        } else {
          transformState[i].targetX = 0;
          transformState[i].targetY = 0;
          transformState[i].targetRotation = 0;
          transformState[i].targetScale = 1;
        }
      });
    });

    function animate(time) {
      if (document.hidden) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      const delta = Math.min((time - lastTime) / 16.67, 5);
      lastTime = time;

      if (!isPreviewActive.current && !isTransitioning.current) {
        parallaxState.currentX +=
          (parallaxState.targetX - parallaxState.currentX) *
          config.current.lerpFactor *
          delta;

        parallaxState.currentY +=
          (parallaxState.targetY - parallaxState.currentY) *
          config.current.lerpFactor *
          delta;

        parallaxState.currentZ +=
          (parallaxState.targetZ - parallaxState.currentZ) *
          config.current.lerpFactor *
          delta;
      }

      gsap.set(gallerycontainerRef.current, {
        rotateX: parallaxState.currentX,
        rotateY: parallaxState.currentY,
        rotation: parallaxState.currentZ,
      });

      cards.forEach((card, i) => {
        const state = transformState[i];

        state.currentRotation +=
          (state.targetRotation - state.currentRotation) *
          config.current.lerpFactor *
          delta;

        state.currentX +=
          (state.targetX - state.currentX) * config.current.lerpFactor * delta;

        state.currentY +=
          (state.targetY - state.currentY) * config.current.lerpFactor * delta;

        state.currentScale +=
          (state.targetScale - state.currentScale) *
          config.current.lerpFactor *
          delta;

        const angle = state.angle;
        const x = config.current.radius * Math.cos(angle);
        const y = config.current.radius * Math.sin(angle);

        gsap.set(card, {
          x: x + state.currentX,
          y: y + state.currentY,
          rotationY: state.currentRotation,
          scale: state.currentScale,
          rotation: (angle * 180) / Math.PI + 90,
        });
      });

      rafId.current = requestAnimationFrame(animate);
    }

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        lastTime = performance.now();
      }
    });

    rafId.current = requestAnimationFrame(animate);
  }, []);

  return (
    <div>
      <nav className="absolute top-0 left-0 w-full navbar flex items-center justify-between px-8 z-10 py-1">
        <a href="">Shilhoutte Stock</a>
        <p>Download Asset</p>
      </nav>
      <div
        ref={containerRef}
        className="container relative w-[100vw] h-[100vh] overflow-hidden"
      >
        <div
          ref={gallerycontainerRef}
          className="gallery-container relative w-[100vw] h-[100vh] flex items-center justify-center"
        >
          <div
            ref={galleryRef}
            className="gallery relative w-full h-full flex items-center justify-center"
          ></div>
        </div>
        <div
          ref={titlecontainerRef}
          className="title-container fixed bottom-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 h-full w-full "
        ></div>
      </div>
      <footer className="absolute bottom-0 left-0 w-full px-8 flex  justify-between z-10 py-1">
        <p>Experiment 543</p>
        <p>Made By Swapnil</p>
      </footer>
    </div>
  );
}

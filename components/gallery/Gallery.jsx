"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import Observer from "gsap/Observer";

gsap.registerPlugin(Flip, Observer);

export default function Gallery() {
  const images = Array.from({ length: 20 }, (_, i) =>
    `https://picsum.photos/id/${1015 + i}/800/500`
  );

  const previewRef = useRef(null);
  const stripRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    const thumbs = gsap.utils.toArray(".thumb");
    const track = stripRef.current;

    // Set first image as active in preview
    activeRef.current = thumbs[0];
    setPreviewSize(activeRef.current);
    previewRef.current.appendChild(activeRef.current);

    thumbs.forEach((el) => el.addEventListener("click", () => swapImage(el)));

    let x = 0,
      maxX = 0;

    function setBounds() {
      maxX = track.parentElement.offsetWidth - track.scrollWidth;
    }

    setBounds();
    window.addEventListener("resize", setBounds);

    // Draggable horizontal strip
    Observer.create({
      target: ".strip-container",
      type: "wheel,pointer,touch",
      onChangeX(self) {
        x = gsap.utils.clamp(maxX, 0, x + self.deltaX);
        gsap.set(track, { x });
      },
    });

    // Swap function
    function swapImage(el) {
      if (el === activeRef.current) return;

      const state = Flip.getState(".thumb");

      // Set sizes before Flip
      setPreviewSize(el);
      setThumbSize(activeRef.current);

      // Move only the .thumb element
      previewRef.current.appendChild(el);
      stripRef.current.appendChild(activeRef.current);

      activeRef.current = el;

      Flip.from(state, {
        absolute: true,
        duration: 0.6,
        ease: "power3.out",
      });

      setBounds();
    }

    // Helpers
    function setPreviewSize(el) {
      el.style.width = previewRef.current.offsetWidth + "px";
      el.style.height = previewRef.current.offsetHeight + "px";
      el.style.margin = "0";
    }

    function setThumbSize(el) {
      el.style.width = "160px";
      el.style.height = "120px";
      el.style.margin = "0";
    }
  }, []);

  return (
    <section className="p-6">
      {/* PREVIEW */}
      <div
        ref={previewRef}
        className="relative w-full max-w-5xl mx-auto h-[450px] mb-10 overflow-hidden rounded-xl"
      />

      {/* STRIP */}
      <div className="strip-container relative w-full overflow-hidden h-[120px]">
        <div ref={stripRef} className="absolute left-0 top-0 flex gap-4 h-full">
          {images.map((img, i) => (
            <div
              key={i}
              className="strip-thumb w-[160px] h-[120px] shrink-0"
            >
              <div className="thumb relative w-full h-full cursor-pointer overflow-hidden rounded-md">
                <img src={img} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import TestimonialCouple from "./TestimonialCouple";
import TestimonialText from "./TestimonialText";

export default function TestimonialSection({ TestimonialCouples }) {
  return (
   <section className="w-full">
     <div className="max-w-[1440px] mx-auto">
        <TestimonialText />
        <TestimonialCouple couples={TestimonialCouples} />
    </div>
   </section>
  );
}
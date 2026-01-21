import TestimonialCouple from "./TestimonialCouple";
import TestimonialText from "./TestimonialText";

export default function TestimonialSection({ TestimonialCouples }) {
  return (
    <div>
        <TestimonialText />
        <TestimonialCouple couples={TestimonialCouples} />
    </div>
  );
}
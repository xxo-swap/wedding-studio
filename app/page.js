import Hero from "@/components/hero/Hero";
import Gallery from "@/components/gallery/Gallery";
import FeaturedText from "@/components/feature/FeaturedText"
import FeaturedWedding from "@/components/feature/FeaturedCouple"
import FeaturedSection from "@/components/feature/FeaturedSection";
import TestimonialSection from "@/components/testimonial/TestimonialSection";

export default function Home() {

  const FeaturedWeddingCouples = [{
    name: "Rahul + Rakul",
    img: "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?auto=format&fit=crop&w=1200&q=80"
  },
{    name: "John + Jane",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
  },
{    name: "Mike + Anna",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"
  },
{    name: "David + Sarah",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
}
]

  const TestimonialCouples = [{
    name: "Rahul + Rakul",
    image: "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?auto=format&fit=crop&w=1200&q=80",
    caption: "The most beautiful day of our lives!"
  },
{    name: "John + Jane",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    caption: "Absolutely magical!"
  },
{    name: "Mike + Anna",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    caption: "We couldn't have asked for a better experience."
  },
{    name: "David + Sarah",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    caption: "The perfect documentation of our love story."
}]

  return (
    <>
      <Hero />
      <FeaturedSection FeaturedWeddingCouples={FeaturedWeddingCouples} />
      <TestimonialSection TestimonialCouples={TestimonialCouples} />
    </>
    
  );
}

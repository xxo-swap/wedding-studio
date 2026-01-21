import Image from "next/image";
import FeaturedText from "./FeaturedText";
import FeaturedCouple from "./FeaturedCouple";

export default function FeaturedSection({ FeaturedWeddingCouples }) {


  return (
    <div >
        <FeaturedText />
        {
            FeaturedWeddingCouples.map((couple, index) => (
                <FeaturedCouple key={index} couple={couple} />
            ))
        }
    </div>
  );
}

import Hero from "@/components/hero/Hero";
import Gallery from "@/components/gallery/Gallery";
import PageLoaderWrapper from "@/components/animations/PageLoaderWrapper";

export default function Home() {
  return (
    <PageLoaderWrapper minTime={1.2}>
      <Hero />
      <Gallery />
    </PageLoaderWrapper>
  );
}

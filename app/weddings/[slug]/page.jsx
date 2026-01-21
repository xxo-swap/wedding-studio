import Gallery from "@/components/gallery/Gallery";

export async function generateStaticParams() {
  return [
    { slug: "riya-ankit" },
    { slug: "neha-rohan" }
  ];
}

export default function WeddingStory({ params }) {
  return (
    <section className="p-10">
      <Gallery slug={params.slug} />
    </section>
  );
}

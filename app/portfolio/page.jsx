import Gallery from "@/components/gallery/Gallery";

export const metadata = {
  title: "Portfolio | Aarav Studio",
  description: "Explore cinematic wedding photography stories."
};

export default function PortfolioPage() {
  return (
    <main className="bg-bg text-text pt-32">
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="text-4xl font-serif mb-2">Wedding Portfolio</h1>
        <p className="text-primary">
          Handcrafted stories captured with emotion and elegance.
        </p>
      </section>

      <Gallery />
    </main>
  );
}

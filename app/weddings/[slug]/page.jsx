export async function generateStaticParams() {
  return [{slug:"riya-ankit"}, {slug:"neha-rohan"}];
}

export default function WeddingStory({ params }) {
  return (
    <section className="p-10">
      <h1 className="text-4xl">Wedding Story: {params.slug}</h1>
    </section>
  );
}

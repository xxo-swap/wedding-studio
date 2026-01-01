export default function ContactForm() {
  return (
    <form className="grid gap-5 max-w-md w-full bg-surface p-8 border border-border rounded-2xl">
      <input
        placeholder="Name"
        className="p-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        placeholder="Email"
        className="p-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <textarea
        placeholder="Wedding Details"
        className="p-3 bg-bg border border-border rounded-lg text-text h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        className="bg-primary text-bg py-3 rounded-full tracking-widest uppercase hover:opacity-80 transition"
      >
        Send Inquiry
      </button>
    </form>
  );
}

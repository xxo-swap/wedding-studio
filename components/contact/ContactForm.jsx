"use client";

export default function ContactForm() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Start with a hello.
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Share a few details. We will take care of the rest.
        </p>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border-b border-gray-300 focus:border-black outline-none py-2"
          />
          <input
            type="text"
            placeholder="Event"
            className="border-b border-gray-300 focus:border-black outline-none py-2"
          />
          <input
            type="date"
            placeholder="Date"
            className="border-b border-gray-300 focus:border-black outline-none py-2"
          />
          <input
            type="tel"
            placeholder="Contact"
            className="border-b border-gray-300 focus:border-black outline-none py-2"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-black text-white py-3 uppercase tracking-wide hover:opacity-90 transition"
          >
            Done
          </button>
        </form>
      </div>
    </main>
  );
}

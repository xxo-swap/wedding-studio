import Header from "@/components/header/Header";
import "./globals.css";


export const metadata = {
  title: "Luxury Wedding Photographer | Aarav Studios",
  description: "Cinematic wedding photography in Delhi NCR."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <Header/>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

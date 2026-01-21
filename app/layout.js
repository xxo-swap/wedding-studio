import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollWrapper from "@/components/animations/ScrollWrapper";
import "./globals.css";

export const metadata = {
  title: "Luxury Wedding Photographer | Aarav Studios",
  description: "Cinematic wedding photography in Delhi NCR."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white">
        {/* Wrap your app content inside ScrollWrapper */}
        <ScrollWrapper>
          <div className="">
            <Header />
            {children}
            <Footer />
          </div>
        </ScrollWrapper>
      </body>
    </html>
  );
}

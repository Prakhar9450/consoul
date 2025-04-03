import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import GoogleAnalytics from "./components/GoogleAnalytics";


const mulishSans = Mulish({
  variable: "--font-mulish-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consoul",
  description: "consumer | strategy | tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mulishSans.variable} antialiased pt-20 overflow-x-hidden`}>
        <GoogleAnalytics />
        
        {/* Scroll Progress Indicator */}
        
        
        {/* Navbar stays fixed */}
        <Navbar />
      
        
        {/* Main Content */}
        {children}
        
        {/* Mobile CTA Button */}
        <div className="text-center w-full block md:hidden fixed bottom-0 left-0 right-0 z-50">
          <a href="https://cal.com/consoul-solutions">
            <button className="bg-gradient-to-b from-[#6438C3] to-[#4B21A6] w-full text-white px-6 py-3 text-lg font-medium">
              Book a Free Consultation
            </button>
          </a>
        </div>
      </body>
    </html>
  );
}
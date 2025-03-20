"use client";
import Image from "next/image";
import BlogListing from "@/app/components/BlogListing";
import Footer from "@/app/components/Footer";

export default function BlogsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="grid gap-6 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-[#DAC8FF]">
                  Welcome to our blog page.
                </h1>
                <p className="text-lg md:text-xl">
                  Subscribe to our Newsletter and <br /> never miss an update
                </p>
                <div className="flex flex-row gap-2 w-full">
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="p-2 px-4 text-black focus:outline-none rounded-lg flex-grow min-w-0"
                  />
                  <button className="p-2 px-6 rounded-lg bg-white text-[#6438C3] whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex justify-center">
              <Image
                src="/icons/newsletter.svg"
                width={300}
                height={300}
                alt="newsletter"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8 md:mx-40">
          <BlogListing />
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </div>
  );
}

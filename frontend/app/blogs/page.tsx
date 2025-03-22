"use client";
import Image from "next/image";
import BlogListing from "@/app/components/BlogListing";
import Footer from "@/app/components/Footer";

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white py-12 md:py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between">
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#DAC8FF] leading-tight">
              Welcome to our blog page.
            </h1>
            <p className="text-lg md:text-xl mt-4">
              Subscribe to our Newsletter and <br /> never miss an update
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
              <input
                type="text"
                placeholder="Enter your email address"
                className="p-3 px-4 text-black focus:outline-none rounded-lg flex-grow shadow-md"
              />
              <button className="p-3 px-6 rounded-lg bg-white text-[#6438C3] font-semibold shadow-md transition-transform transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/icons/newsletter.svg"
              width={300}
              height={300}
              alt="newsletter"
              className="max-w-full h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow border-b">
        <div className="md:mx-40">
          <BlogListing />
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

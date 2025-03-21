"use client";

import Footer from "@/app/components/Footer";
import SuccessStoryListing from "@/app/components/SuccessStoryListing";

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow border-b">
        <div className="md:mx-40">
          <SuccessStoryListing />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

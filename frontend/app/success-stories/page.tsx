"use client";

import Footer from "@/app/components/Footer";
import SuccessStoryListing from "@/app/components/SuccessStoryListing";
import Lenis from "lenis";
import { useEffect } from "react";

export default function SuccessStoriesPage() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
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

"use client";
import { Hero } from "./pages/Hero";
import { Services } from "./pages/Services";
import { ChooseUs } from "./pages/ChooseUs";
import { SuccessStories } from "./pages/SuccessStories";
import Footer from "./components/Footer";
import { SuccessStoriesComp } from "./components/SuccessStoriesComp";
import { SuccessStoriesMobileComp } from "./components/SuccessStoriesMobileComp";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const servicesRef = useRef(null);
  const chooseUsRef = useRef(null);
  
  // Set up smooth scrolling with Lenis
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
  
  // Create scroll animation for the services section
  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });
  
  // Create scroll animation for the chooseUs section
  const { scrollYProgress: chooseUsScrollProgress } = useScroll({
    target: chooseUsRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress into scale value for Services (from small to normal)
  const servicesScaleValue = useTransform(servicesScrollProgress, [0, 0.3], [0.8, 1]);
  
  // Transform scroll progress into border-radius and size values for ChooseUs
  const chooseUsBorderRadius = useTransform(chooseUsScrollProgress, [0, 0.3], [40, 0]);
  const chooseUsScale = useTransform(chooseUsScrollProgress, [0, 0.3], [0.9, 1]);
  const chooseUsWidth = useTransform(chooseUsScrollProgress, [0, 0.3], ["92%", "100%"]);
  
  return (
    <div className="perspective-wrapper w-full relative">
      {/* Hero section with fixed positioning - adjusted for navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 h-screen pt-20 bg-white">
        <Hero />
      </div>
      
      {/* Content sections that scroll on top of the Hero */}
      <div className="relative z-20 mt-[100vh]"> 
        <div className="bg-white">
          {/* Add motion effects to Services */}
          <motion.div 
            ref={servicesRef}
            style={{ 
              scale: servicesScaleValue,
              opacity: useTransform(servicesScrollProgress, [0, 0.3], [0.5, 1])
            }}
          >
            <Services />
          </motion.div>
          
          {/* Wrapper for ChooseUs with animated background */}
          <motion.div
            ref={chooseUsRef}
            className="relative mx-auto overflow-hidden"
            style={{
              width: chooseUsWidth,
              scale: chooseUsScale,
              borderRadius: chooseUsBorderRadius,
              opacity: useTransform(chooseUsScrollProgress, [0, 0.2], [0.7, 1])
            }}
          >
            <ChooseUs />
          </motion.div>

          <div className="hidden md:block">
            <SuccessStoriesComp />
            <SuccessStories />
          </div>
          <div className="block md:hidden my-10">
            <SuccessStoriesMobileComp />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
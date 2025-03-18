"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadGuide } from "../components/Download-guide";
import { Testimonial } from "../components/Testimonial";
import ExternalLinkButton from "../components/ui/ExternalLinkButton";
import SwipeButton from "../components/ui/SwipeButton";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

export const Services = () => {
  // Define explicit types for our data structure
  type ServicePoint = {
    text: string;
    image: string;
  };

  type ServiceData = {
    title: string;
    points: ServicePoint[];
  };

  // Data arrays with optimized structure for better organization
  const dataDrivenStrategies: ServiceData = {
    title: "Data-driven strategies that drive results",
    points: [
      {
        text: "Hyper-personalised offerings through data segmentation",
        image: "/components/data-driven-1.png",
      },
      {
        text: "Targeted loyalty and gamification programs",
        image: "/components/data-driven-2.png",
      },
      {
        text: "Channel optimisation for timely, targeted messaging",
        image: "/components/data-driven-3.png",
      },
    ]
  };

  const marTechTools: ServiceData = {
    title: "Make the most out of your MarTech tools",
    points: [
      {
        text: "Get mar-tech audit and implementation",
        image: "/components/martech-1.png",
      },
      {
        text: "Identify mar-tech gaps and get tool recommendations",
        image: "/components/martech-2.png",
      },
      {
        text: "Migrate and align tools for smoother operations",
        image: "/components/martech-3.png",
      },
    ]
  };

  const optimizeOperations: ServiceData = {
    title: "Optimize your operations & reduce cost",
    points: [
      {
        text: "Create SOPs for efficient, consistent operations",
        image: "/components/optimize-ops-1.png",
      },
      {
        text: "Get on-demand campaign execution",
        image: "/components/optimize-ops-2.png",
      },
      {
        text: "Experiment and real-time data to boost performance",
        image: "/components/optimize-ops-3.png",
      },
    ]
  };

  // Create a single list of unique logos rather than repeating
  const logoBaseList = [
    "/logos/gitam.svg",
    "/logos/macmerise.svg",
    "/logos/hdfc.svg",
    "/logos/kfc.svg",
    "/logos/westside.svg",
    "/logos/axisbank.svg",
    "/logos/p&g.svg",
    "/logos/lomotif.svg",
    "/logos/yesstyle.svg",
    "/logos/coto.svg",
  ];
  // Only duplicate once instead of three times, reducing the payload
  const logos = [...logoBaseList, ...logoBaseList];

  // State management
  const [activeDataDrivenPoint, setActiveDataDrivenPoint] = useState(0);
  const [activeMarTechPoint, setActiveMarTechPoint] = useState(0);
  const [activeOptimizePoint, setActiveOptimizePoint] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState({
    dataDriven: false,
    marTech: false,
    optimize: false
  });
  const router = useRouter();

  // Create refs for section visibility detection
  const [dataDrivenRef, dataDrivenInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [marTechRef, marTechInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [optimizeRef, optimizeInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [logosRef, logosInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Preload images for each section when they come into view
  useEffect(() => {
    if (dataDrivenInView && !imagesPreloaded.dataDriven) {
      const preloadImages = async () => {
        try {
          const promises = dataDrivenStrategies.points.map(point => {
            return new Promise((resolve) => {
              const img = new window.Image();
              img.src = point.image;
              img.onload = resolve;
            });
          });
          await Promise.all(promises);
          setImagesPreloaded(prev => ({ ...prev, dataDriven: true }));
        } catch (error) {
          console.error("Failed to preload data-driven images", error);
        }
      };
      preloadImages();
    }
  }, [dataDrivenInView, imagesPreloaded.dataDriven]);

  useEffect(() => {
    if (marTechInView && !imagesPreloaded.marTech) {
      const preloadImages = async () => {
        try {
          const promises = marTechTools.points.map(point => {
            return new Promise((resolve) => {
              const img = new window.Image();
              img.src = point.image;
              img.onload = resolve;
            });
          });
          await Promise.all(promises);
          setImagesPreloaded(prev => ({ ...prev, marTech: true }));
        } catch (error) {
          console.error("Failed to preload marTech images", error);
        }
      };
      preloadImages();
    }
  }, [marTechInView, imagesPreloaded.marTech]);

  useEffect(() => {
    if (optimizeInView && !imagesPreloaded.optimize) {
      const preloadImages = async () => {
        try {
          const promises = optimizeOperations.points.map(point => {
            return new Promise((resolve) => {
              const img = new window.Image();
              img.src = point.image;
              img.onload = resolve;
            });
          });
          await Promise.all(promises);
          setImagesPreloaded(prev => ({ ...prev, optimize: true }));
        } catch (error) {
          console.error("Failed to preload optimize images", error);
        }
      };
      preloadImages();
    }
  }, [optimizeInView, imagesPreloaded.optimize]);

  // Create reusable section component to reduce code duplication
  // Define ServiceSectionProps type
  type ServiceSectionProps = {
    bgColor: string;
    data: ServiceData;
    activePoint: number;
    setActivePoint: (index: number) => void;
    inViewRef: (node?: Element | null) => void;
    isInView: boolean;
    imagesLoaded: boolean;
  };

  const ServiceSection = useCallback(({ 
    bgColor, 
    data, 
    activePoint, 
    setActivePoint, 
    inViewRef, 
    isInView,
    imagesLoaded
  }: ServiceSectionProps) => {
    // Background color classes based on the section type
    const getBgClass = () => {
      if (bgColor === "#E5E9FF") return "bg-[#E5E9FF]";
      if (bgColor === "#EBE2FF") return "bg-[#EBE2FF]";
      if (bgColor === "#EED3D3") return "bg-[#EED3D3]";
      return "bg-gray-100";
    };
    
    // Active state background classes
    const getActiveBgClass = () => {
      if (bgColor === "#E5E9FF") return "bg-[#dae0ff]";
      if (bgColor === "#EBE2FF") return "bg-[#e0d2fd]";
      if (bgColor === "#EED3D3") return "bg-[#ebbdbd]";
      return "bg-gray-200";
    };
    
    return (
      <div className="p-10 md:p-0" ref={inViewRef}>
        <div className={`${getBgClass()} px-1 md:px-0 pt-1 md:pt-0 md:bg-white rounded-xl`}>
          <div className="ml-8">
            <div className="text-[#555555] md:text-[#6438C3] font-semibold md:font-extrabold text-xl md:text-3xl flex justify-center m-6 pt-2 md:mt-20">
              {data.title}
            </div>
          </div>

          {/* Points Navigation */}
          <div className="flex justify-center md:my-10 text-base md:text-lg px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-30 text-center px-4 md:px-20">
              {data.points.map((point, pointIndex) => (
                <div
                  key={pointIndex}
                  className={`cursor-pointer px-2 md:px-20 ${
                    activePoint === pointIndex
                      ? `text-[#2A2A2A] md:text-[#6438C3] md:font-bold ${getActiveBgClass()} md:bg-white p-3 md:p-0 rounded-lg`
                      : "md:hover:text-[#6438C3] text-[#555555] p-3 md:p-0"
                  }`}
                  onClick={() => setActivePoint(pointIndex)}
                >
                  {point.text}
                </div>
              ))}
            </div>
          </div>

          {/* Image Display */}
          <div className="flex justify-center">
            <div className={`flex justify-center ${getBgClass()} w-full md:w-[1058px] h-[200px] md:h-[480px] rounded-xl`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePoint}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full flex justify-center"
                >
                  {(isInView || imagesLoaded) && (
                    <Image
                      src={data.points[activePoint].image}
                      alt={`${data.title} - ${data.points[activePoint].text}`}
                      width={1058}
                      height={480}
                      quality={80} // Optimized quality
                      loading={isInView ? "eager" : "lazy"}
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1058 480'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="my-10 md:my-20">
      {/* Header Component */}
      <div className="services-header">
        <div className="font-extrabold text-[#555555] flex justify-center text-2xl md:text-4xl">
          Our Services
        </div>
      </div>

      {/* Data Driven Strategies Section */}
      <ServiceSection
        bgColor="#E5E9FF"
        data={dataDrivenStrategies}
        activePoint={activeDataDrivenPoint}
        setActivePoint={setActiveDataDrivenPoint}
        inViewRef={dataDrivenRef}
        isInView={dataDrivenInView}
        imagesLoaded={imagesPreloaded.dataDriven}
      />

      {/* MarTech Tools Section */}
      <ServiceSection
        bgColor="#EBE2FF"
        data={marTechTools}
        activePoint={activeMarTechPoint}
        setActivePoint={setActiveMarTechPoint}
        inViewRef={marTechRef}
        isInView={marTechInView}
        imagesLoaded={imagesPreloaded.marTech}
      />

      {/* Optimize Operations Section */}
      <ServiceSection
        bgColor="#EED3D3"
        data={optimizeOperations}
        activePoint={activeOptimizePoint}
        setActivePoint={setActiveOptimizePoint}
        inViewRef={optimizeRef}
        isInView={optimizeInView}
        imagesLoaded={imagesPreloaded.optimize}
      />

      {/* Call-to-action Component */}
      <div className="cta-section">
        <div className="flex justify-center">
          <div className="grid md:my-6 md:gap-4 text-base md:text-xl">
            <div className="text-center hidden md:block">
              One-stop solution to keep your customers loyal and increase LTV
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 text-base md:text-xl font-medium gap-4">
              <div className="justify-center hidden md:flex" onClick={() => router.push('/about')}>
                <SwipeButton
                  className="hidden lg:block bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white rounded-lg"
                  firstClass="p-2 md:p-3 px-4 md:px-6 bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white text-lg"
                  firstText="Get in touch"
                  secondClass="p-2 md:p-3 px-4 md:px-6 bg-[#A47EF6] text-white text-lg"
                  secondText="Get in touch"
                />
              </div>
              <div className="flex justify-center md:justify-start">
                <button className="text-[#6438C3] flex items-center hover:underline text-xl" onClick={() => router.push('/services')}>
                  <ExternalLinkButton text="Go to services" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Guide Component */}
      <div className="download-guide-section">
        <div className="flex w-full md:justify-center my-8 md:my-14">
          <DownloadGuide />
        </div>
      </div>

      {/* Testimonial Component */}
      <div className="testimonial-section">
        <Testimonial />
      </div>

      {/* Logo Carousel - Only render when in view */}
      <div className="overflow-hidden w-full mt-6 hidden md:block" ref={logosRef}>
        {logosInView && (
          <motion.div
            className="flex space-x-20"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo}
                className="w-40 h-auto"
                alt={`Partner logo ${index % logoBaseList.length + 1}`}
                height={40}
                width={160}
                loading="lazy"
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
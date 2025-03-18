"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { DownloadGuide } from "../components/Download-guide";
import { Testimonial } from "../components/Testimonial";
import ExternalLinkButton from "../components/ui/ExternalLinkButton";
import SwipeButton from "../components/ui/SwipeButton";
import { useRouter } from "next/navigation";

export const Services = () => {
  // Keep all arrays separate
  const dataDrivenStrategies = [
    {
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
      ],
    },
  ];

  const MarTechTools = [
    {
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
      ],
    },
  ];

  const OptimizeOperations = [
    {
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
      ],
    },
  ];

  const logos = [
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

  // Initialize state for each section separately
  const [activeDataDrivenPoint, setActiveDataDrivenPoint] = useState(0);
  const [activeMarTechPoint, setActiveMarTechPoint] = useState(0);
  const [activeOptimizePoint, setActiveOptimizePoint] = useState(0);
  const router = useRouter();

  return (
    <div className="my-10 md:my-20">
      {/* Header Component */}
      <div className="services-header">
        <div className="font-extrabold text-[#555555] flex justify-center text-2xl md:text-4xl">
          Our Services
        </div>
      </div>

      {/* Data Driven Strategies Section */}
      <div className="p-10 md:p-0">
        <div className=" bg-[#E5E9FF] px-1 md:px-0 pt-1 md:pt-0  md:bg-white rounded-xl">
          <div className="data-driven-section">
            <div className="ml-8">
              {" "}
              <div className="text-[#555555] md:text-[#6438C3] font-semibold md:font-extrabold text-xl md:text-3xl  flex justify-center m-6 pt-2 md:mt-20">
                {dataDrivenStrategies[0].title}
              </div>
            </div>
          </div>

          {/* Points Navigation */}
          <div className="data-points-navigation">
            <div className="flex justify-center  md:my-10 text-base md:text-lg px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-30 text-center px-4 md:px-20">
                {dataDrivenStrategies[0].points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className={`cursor-pointer px-2 md:px-20 ${
                      activeDataDrivenPoint === pointIndex
                        ? "text-[#2A2A2A] md:text-[#6438C3] md:font-bold bg-[#dae0ff] md:bg-white p-3 md:p-0 rounded-lg"
                        : "md:hover:text-[#6438C3] text-[#555555] p-3 md:p-0"
                    }`}
                    onClick={() => setActiveDataDrivenPoint(pointIndex)}
                  >
                    {point.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Display */}
          <div className="data-image-display">
            <div className="flex justify-center">
              <div className="flex justify-center bg-[#E5E9FF] w-full md:w-[1058px] h-[200px] md:h-[480px] rounded-xl">
                <motion.div
                  key={activeDataDrivenPoint}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full flex justify-center"
                >
                  <Image
                    src={
                      dataDrivenStrategies[0].points[activeDataDrivenPoint]
                        .image
                    }
                    alt={dataDrivenStrategies[0].title}
                    width={1058}
                    height={480}
                    quality={100} // Maximum quality
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MarTech Tools Section */}
      <div className="p-10 md:p-0">
        <div className=" bg-[#EBE2FF] px-1 md:px-0 pt-1 md:pt-0  md:bg-white rounded-xl">
          <div className="martech-section">
            <div className="ml-8">
              {" "}
              <div className="text-[#555555] md:text-[#6438C3] font-semibold md:font-extrabold text-xl md:text-3xl  flex justify-center m-6 pt-2 md:mt-20">
                {MarTechTools[0].title}
              </div>
            </div>
          </div>

          {/* Points Navigation */}
          <div className="martech-navigation">
            <div className="flex justify-center  md:my-10 text-base md:text-lg px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-30 text-center px-4 md:px-20">
                {MarTechTools[0].points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className={`cursor-pointer px-2 md:px-20 ${
                      activeMarTechPoint === pointIndex
                        ? "text-[#2A2A2A] md:text-[#6438C3] md:font-bold bg-[#e0d2fd] md:bg-white p-3 md:p-0 rounded-lg"
                        : "md:hover:text-[#6438C3] text-[#555555] p-3 md:p-0"
                    }`}
                    onClick={() => setActiveMarTechPoint(pointIndex)}
                  >
                    {point.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Display */}
          <div className="data-image-display">
            <div className="flex justify-center">
              <div className="flex justify-center bg-[#EBE2FF] w-full md:w-[1058px] h-[200px] md:h-[480px] rounded-xl">
                <motion.div
                  key={activeMarTechPoint}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full flex justify-center"
                >
                  <Image
                    src={MarTechTools[0].points[activeMarTechPoint].image}
                    alt={MarTechTools[0].title}
                    width={1058}
                    height={480}
                    quality={100} // Maximum quality
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimize Operations Section */}
      <div className="p-10 md:p-0">
        <div className=" bg-[#EED3D3] px-1 md:px-0 pt-1 md:pt-0  md:bg-white rounded-xl">
          <div className="OptimizeOperations-section">
            <div className="ml-8">
              {" "}
              <div className="text-[#555555] md:text-[#6438C3] font-semibold md:font-extrabold text-xl md:text-3xl  flex justify-center m-6 pt-2 md:mt-20">
                {OptimizeOperations[0].title}
              </div>
            </div>
          </div>

          {/* Points Navigation */}
          <div className="OptimizeOperations-navigation">
            <div className="flex justify-center  md:my-10 text-base md:text-lg px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-30 text-center px-4 md:px-20">
                {OptimizeOperations[0].points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className={`cursor-pointer px-2 md:px-20 ${
                      activeOptimizePoint === pointIndex
                        ? "text-[#2A2A2A] md:text-[#6438C3] md:font-bold bg-[#ebbdbd] md:bg-white p-3 md:p-0 rounded-lg"
                        : "md:hover:text-[#6438C3] text-[#555555] p-3 md:p-0"
                    }`}
                    onClick={() => setActiveOptimizePoint(pointIndex)}
                  >
                    {point.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Display */}
          <div className="data-image-display">
            <div className="flex justify-center">
              <div className="flex justify-center bg-[#EED3D3] w-full md:w-[1058px] h-[200px] md:h-[480px] rounded-xl">
                <motion.div
                  key={activeOptimizePoint}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full flex justify-center"
                >
                  <Image
                    src={
                      OptimizeOperations[0].points[activeOptimizePoint].image
                    }
                    alt={OptimizeOperations[0].title}
                    width={1058}
                    height={480}
                    quality={100} // Maximum quality
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-action Component */}
      <div className="cta-section">
        <div className="flex justify-center">
          <div className="grid md:my-6 md:gap-4 text-base md:text-xl">
            <div className="text-center hidden md:block">
              One-stop solution to keep your customers loyal and increase LTV
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 text-base md:text-xl font-medium gap-4">
              <div className=" justify-center  hidden md:flex" onClick={()=>router.push('/about')}>
               
                 <SwipeButton
                          className="hidden lg:block bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white rounded-lg"
                          firstClass="p-2 md:p-3 px-4 md:px-6 bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white  text-lg"
                          firstText="Get in touch"
                          secondClass="p-2 md:p-3 px-4 md:px-6 bg-[#A47EF6] text-white text-lg"
                          secondText="Get in touch"
                        ></SwipeButton>
              </div>
              <div className="flex justify-center md:justify-start">
                <button className="text-[#6438C3] flex items-center hover:underline text-xl" onClick={()=>router.push('/services')}>
                <ExternalLinkButton text="Go to services"  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Guide Component */}
      <div className="download-guide-section">
        <div className="flex w-full  md:justify-center my-8 md:my-14">
          <DownloadGuide />
        </div>
      </div>

      {/* Testimonial Component */}
      <div className="testimonial-section">
        <Testimonial />
      </div>

      <div className="overflow-hidden w-full mt-6">
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
              alt="logo"
              height={40}
              width={40}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

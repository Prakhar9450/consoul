"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { DownloadGuide } from "../components/Download-guide";
import { Testimonial } from "../components/Testimonial";

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

  // Initialize state for each section separately
  const [activeDataDrivenPoint, setActiveDataDrivenPoint] = useState(0);
  const [activeMarTechPoint, setActiveMarTechPoint] = useState(0);
  const [activeOptimizePoint, setActiveOptimizePoint] = useState(0);

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
              <div className=" justify-center  hidden md:flex">
                <button className="border p-2 md:p-3 px-4 md:px-6 bg-[#6438C3] text-white rounded-lg text-base md:text-xl">
                  Get in touch
                </button>
              </div>
              <div className="flex justify-center md:justify-start">
                <button className="text-[#6438C3] flex items-center hover:underline text-xl">
                  <span className="mr-2">Go to Services</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.8771 9.32604L7.55309 20.6501C7.31982 20.8834 7.02294 21 6.66243 21C6.30193 21 6.00504 20.8834 5.77178 20.6501C5.53851 20.4168 5.42188 20.1199 5.42188 19.7594C5.42188 19.3989 5.53851 19.1021 5.77178 18.8688L17.0958 7.54473H7.42585C7.06535 7.54473 6.76316 7.4228 6.51929 7.17893C6.27542 6.93506 6.15349 6.63287 6.15349 6.27237C6.15349 5.91186 6.27542 5.60968 6.51929 5.36581C6.76316 5.12194 7.06535 5 7.42585 5H20.1495C20.51 5 20.8122 5.12194 21.0561 5.36581C21.2999 5.60968 21.4219 5.91186 21.4219 6.27237V18.996C21.4219 19.3565 21.2999 19.6587 21.0561 19.9026C20.8122 20.1465 20.51 20.2684 20.1495 20.2684C19.789 20.2684 19.4868 20.1465 19.2429 19.9026C18.9991 19.6587 18.8771 19.3565 18.8771 18.996V9.32604Z"
                      fill="#6438C3"
                    />
                  </svg>
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
    </div>
  );
};

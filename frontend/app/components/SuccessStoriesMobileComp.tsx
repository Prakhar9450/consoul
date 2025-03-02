"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const SuccessStoriesMobileComp = () => {
  const stories = [
    {
      title: "iWantTFC",
      description: "Here’s what targeted content and personalised communication can do.",
      metrics: [
        { text: "Increased conversions by", value: "3x" },
        { text: "Reduced churn rate by", value: "2x" },
        { text: "Boost engagement by", value: "5x" },
        { text: "Higher customer satisfaction by", value: "4x" },
      ],
    },
    {
      title: "BrandX",
      description: "Driving engagement through AI-driven marketing strategies.",
      metrics: [
        { text: "Revenue growth by", value: "4x" },
        { text: "Customer retention improved by", value: "3.5x" },
        { text: "User engagement boosted by", value: "6x" },
        { text: "Higher conversion rates by", value: "2.5x" },
      ],
    },
    {
      title: "ShopEase",
      description: "Transforming eCommerce with personalized shopping experiences.",
      metrics: [
        { text: "Sales increased by", value: "5x" },
        { text: "Cart abandonment reduced by", value: "40%" },
        { text: "Returning customers up by", value: "3.8x" },
        { text: "Overall satisfaction increased by", value: "4.5x" },
      ],
    },
  ];

  const scrollRef = useRef(null);

  return (
    <div className="flex flex-col items-center  overflow-hidden">
      {/* Header */}
    

      {/* Carousel */}
      <div className="relative w-full ">
        <motion.div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-[#F8F5FF] rounded-lg p-4 flex-shrink-0 w-[280px] snap-center shadow-lg"
      
            >
            
              <div className="text-center mb-4">
                <p className="text-xs text-[#555555]">
                  {story.description}
                </p>
                <h3 className="text-lg font-bold text-[#555555] mt-2">
                  Story of {story.title}:
                </h3>
              </div>

              {/* Metrics */}
              <ul className="space-y-2">
                {story.metrics.map((metric, metricIdx) => (
                  <li key={metricIdx} className="flex items-center text-xs text-[#555555] font-medium">
                    <span className="mr-2">
                      <Image
                        src="/icons/rocket.png"
                        alt="point"
                        width={16}
                        height={16}
                      
                      />
                    </span>
                    {metric.text}{" "}
                    <span className="font-bold ml-1">{metric.value}</span>
                  </li>
                ))}
              </ul>

              {/* Call to Action */}
              <div className="mt-4 text-center">
                <p className="text-[#555555] text-sm mb-2">
                  Want targeted communication for your brand too?
                </p>
                <button className="bg-[#6438C3] text-white py-2 px-6 rounded-lg text-sm font-semibold w-full max-w-[200px]">
                  Yes, let’s talk
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Link */}
    
    </div>
  );
};
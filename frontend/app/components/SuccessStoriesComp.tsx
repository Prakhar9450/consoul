"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ExternalLinkButton from "./ui/ExternalLinkButton";

export const SuccessStoriesComp = () => {
  const stories = [
    {
      title: "iWantTFC",
      subtitle: "Here's what targeted content and personalised communication can do.",
      metrics: [
        { text: "Increased retention by", value: "30%" },
        { text: "Reduced operation cost by", value: "20%" },
        { text: "Campaign delivery improved by", value: "30%" },
        { text: "Operational cost reduced by", value: "20%" },
      ],
      image: "/components/iwanttfcstories.png",
    },
    {
      title: "COTO",
      subtitle: "See how COTO- A woman-only platform got these results from our tailored data-driven strategies",
      metrics: [
        { text: "Reduction in churn by", value: "8%" },
        { text: "Increased networking by", value: "2x" },
        { text: "Community engagement up by", value: "20%" },
        { text: "Increased user activity by", value: "30%" },
      ],
      image: "/components/womenonlyplatform.png", 
    }
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const nextStory = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const prevStory = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
  };

  const router = useRouter();

  // Slide variants for the entire story content
  const slideVariants = {
    enter: (direction : number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction : number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0
    })
  };

  return (
    <div className="flex justify-center">
      <div className="p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
        <div className="font-extrabold text-[#555555] text-[42px] md:text-4xl mb-4 text-center">
          Proven Success Stories
        </div>
        
        {/* Entire sliding content section */}
        <div className="overflow-hidden w-full mt-10">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              {/* Story subtitle */}
              <div className="text-xl md:text-3xl font-extrabold text-[#555555] text-center mb-8">
                {index === 0 ? (
                  <>
                    Here's what <span className="text-[#6438C3]">targeted content</span> and <span className="text-[#6438C3]">personalised communication</span> can do.
                    <br />Story of iWantTFC:
                  </>
                ) : (
                  <>
                    See how COTO- A <span className="text-[#6438C3]">woman-only</span> platform got these results from our
                    <br /><span className="text-[#6438C3]">tailored data-driven strategies</span>
                  </>
                )}
              </div>

              {/* Content and image section */}
              <div className="w-full max-w-5xl flex items-center justify-between px-0 md:px-4 mx-auto">
                {/* Left Side - Content */}
                <div className="w-1/2 pr-0 md:pr-3">
                  <ul className="space-y-3 md:space-y-4">
                    {stories[index].metrics.map((metric, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-base md:text-lg text-[#555555] font-medium"
                      >
                        <span className="mr-2 text-[#6438C3]">
                          <Image src='/icons/rocket.png' alt="point" width={20} height={20} />
                        </span> 
                        {metric.text} <span className="font-bold ml-1">{metric.value}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Call to Action */}
                  <div className="mt-8">
                    <p className="text-[#555555] mb-3">
                      Want targeted communication for your brand?
                    </p>
                    
                    <a href="https://cal.com/consoul-solutions">
                      <div className="bg-[#6438C3] text-white py-2 px-4 rounded-lg text-center font-bold mb-3">
                        Yes, let's talk
                      </div>
                    </a>
                    
                    <div onClick={() => router.push('/success-stories')} className="flex items-center justify-center">
                       <ExternalLinkButton text="Read all success stories" />
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Image with constrained size */}
                <div className="w-1/2 pl-0 md:pl-3 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src={stories[index].image || "/placeholder.svg"}
                      alt={`${stories[index].title} Success Story`}
                      width={350}
                      height={350}
                      className="object-contain"
                      style={{ maxHeight: "350px" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons - fixed position with absolute positioning */}
        <div className="flex space-x-4 mt-12 justify-center">
          <button onClick={prevStory} className="flex-shrink-0">
            <svg
              width="44"
              height="44"
              viewBox="0 0 51 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.25"
                y="0.25"
                width="50.5"
                height="48.5"
                rx="24.25"
                fill="white"
              />
              <rect
                x="0.25"
                y="0.25"
                width="50.5"
                height="48.5"
                rx="24.25"
                stroke="#DAC8FF"
                strokeWidth="0.5"
              />
              <path
                d="M22.9916 24.4986L30.3416 31.8663C30.5893 32.114 30.7086 32.4024 30.7004 32.7321C30.6921 33.062 30.5644 33.3507 30.3166 33.5986C30.0687 33.8464 29.7802 33.9699 29.4504 33.9699C29.1206 33.9699 28.832 33.8464 28.5842 33.5986L20.8842 25.9236C20.5363 25.5011 20.437 25.2528 20.2879 24.5074C20.2879 24.2591 20.5363 23.5137 20.8842 23.0913L28.5842 15.3913C28.8319 15.1436 29.1245 15.0242 29.4626 15.0324C29.8009 15.0407 30.0937 15.1685 30.3416 15.4163C30.5894 15.6641 30.7129 15.9526 30.7129 16.2824C30.7129 16.6122 30.5894 16.9008 30.3416 17.1486L22.9916 24.4986Z"
                fill="#7E57C2"
                stroke="#DAC8FF"
                strokeWidth="0.025"
              />
            </svg>
          </button>
          <button onClick={nextStory} className="flex-shrink-0">
            <svg
              width="44"
              height="44"
              viewBox="0 0 51 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.25"
                y="0.25"
                width="50.5"
                height="48.5"
                rx="24.25"
                fill="white"
              />
              <rect
                x="0.25"
                y="0.25"
                width="50.5"
                height="48.5"
                rx="24.25"
                stroke="#DAC8FF"
                strokeWidth="0.5"
              />
              <path
                d="M27.9942 24.5078L20.6442 17.1578C20.3942 16.9078 20.2733 16.612 20.2817 16.2703C20.29 15.9286 20.4192 15.6328 20.6692 15.3828C20.9192 15.1328 21.215 15.0078 21.5567 15.0078C21.8983 15.0078 22.1942 15.1328 22.4442 15.3828L30.1192 23.0828C30.3192 23.2828 30.4692 23.5078 30.5692 23.7578C30.6692 24.0078 30.7192 24.2578 30.7192 24.5078C30.7192 24.7578 30.6692 25.0078 30.5692 25.2578C30.4692 25.5078 30.3192 25.7328 30.1192 25.9328L22.4192 33.6328C22.1692 33.8828 21.8775 34.0036 21.5442 33.9953C21.2108 33.987 20.9192 33.8578 20.6692 33.6078C20.4192 33.3578 20.2942 33.062 20.2942 32.7203C20.2942 32.3786 20.4192 32.0828 20.6692 31.8328L27.9942 24.5078Z"
                fill="#7E57C2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
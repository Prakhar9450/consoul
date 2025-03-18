"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SwipeButton from "./ui/SwipeButton";
import ReadAllSuccessStoriesButton from "./ui/ReadAllSuccessStoriesButton";
export const SuccessStoriesComp = () => {
  const stories = [
    {
      title: "iWantTFC",
      description:
        "Here’s what targeted content and personalised communication can do.",
      metrics: [
        { text: "Increased conversions by", value: "3x" },
        { text: "Reduced churn by", value: "2x" },
        { text: "Boost engagement by", value: "5x" },
        { text: "Higher customer satisfaction by", value: "4x" },
      ],
      image: "/components/iwanttfcstories.svg",
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
      image: "/components/iwanttfcstories.svg",
    },
    {
      title: "ShopEase",
      description:
        "Transforming eCommerce with personalized shopping experiences.",
      metrics: [
        { text: "Sales increased by", value: "5x" },
        { text: "Cart abandonment reduced by", value: "40%" },
        { text: "Returning customers up by", value: "3.8x" },
        { text: "Overall satisfaction increased by", value: "4.5x" },
      ],
      image: "/components/iwanttfcstories.svg",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextStory = () => {
    setIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const prevStory = () => {
    setIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
  };

  return (
    <div className="flex justify-center">
      <div className="p-4 md:p-10 flex flex-col items-center  relative overflow-hidden">
        <div className="font-extrabold text-[#555555] text-2xl md:text-4xl my-4 md:my-6">
          Proven Success Stories
        </div>
        <div className=" text-2xl md:text-4xl font-extrabold text-[#555555]">
          <div>
            Here’s what
            <span className="text-[#6438C3]"> targeted content </span> and
            <span className="text-[#6438C3]"> personalised </span>
          </div>
          <div className="flex justify-center"><span className="text-[#6438C3] mr-2">communication </span>  can do. Story
          of {stories[index].title}:
        </div></div>

        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 my-4 md:mt-8">
          <div className="flex flex-col items-start lg:w-1/2 space-y-6">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full min-h-[200px]" // Fixed height for smooth transitions
            >
              <ul className="space-y-2 md:space-y-3 mt-4">
                {stories[index].metrics.map((metric, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-base md:text-lg text-[#555555] font-medium"
                  >
                    <span className="mr-2"><Image src='/icons/rocket.png' alt="point" width={20} height={20} ></Image></span> {metric.text}{" "}
                    <span className="font-bold ml-1">{metric.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Call to Action */}
            <div className="mt-6">
              <p className="text-[#555555] mb-2">
                Want targeted communication for your brand?
              </p>
              <button className="bg-[#6438C3] text-white  rounded-lg text-base  w-full">
                
              </button>

                    <SwipeButton
                      className="w-full hidden lg:block bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white rounded-lg md:text-lg font-semibold"
                      firstClass=" bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white  text-lg py-2 md:py-3 px-4 md:px-6 "
                      firstText="Yes, let’s talk"
                      secondClass="bg-[#A47EF6] text-white py-2 md:py-3 px-4 md:px-6  text-lg"
                      secondText="Yes, let’s talk"
                    ></SwipeButton>
                     <ReadAllSuccessStoriesButton text="Read all success stories" ></ReadAllSuccessStoriesButton>
            </div>

           
                
           
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] flex justify-center items-center"
            >
              <Image
                src={stories[index].image || "/placeholder.svg"}
                alt="Success Story"
                className="max-w-full h-auto"
                width={400}
                height={400}
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-4 md:bottom-0  flex space-x-4 md:space-x-6">
          <button onClick={prevStory} className="flex-shrink-0">
            <svg
              width="51"
              height="49"
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
              width="51"
              height="49"
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

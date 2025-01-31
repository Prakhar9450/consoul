"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export const Testimonial = () => {
  const testimonials = [
    {
      description:
        "The platform has revolutionized our approach to customer engagement, making it seamless and personalized. We've seen a significant increase in customer retention and satisfaction.",
      name: "Smriti Mandana",
      image: "/logos/gitam.svg",
      designation: "Head of Marketing, AXIS Bank",
    },
    {
      description:
        "The platform has revolutionized our approach to customer engagement, making it seamless and personalized. We've seen a significant increase in customer retention and satisfaction.",
      name: "Smriti Mandana",
      image: "/logos/gitam.svg",
      designation: "Head of Marketing, AXIS Bank",
    },
    {
      description:
        "The platform has revolutionized our approach to customer engagement, making it seamless and personalized. We've seen a significant increase in customer retention and satisfaction.",
      name: "Smriti Mandana",
      image: "/logos/gitam.svg",
      designation: "Head of Marketing, AXIS Bank",
    },
    {
      description:
        "The platform has revolutionized our approach to customer engagement, making it seamless and personalized. We've seen a significant increase in customer retention and satisfaction.",
      name: "Smriti Mandana",
      image: "/logos/gitam.svg",
      designation: "Head of Marketing, AXIS Bank",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="my-20  min-h-80">
      <div className="grid grid-cols-2 w-full">
        <div className="col-span-1 flex justify-center pl-40 ">
          <div className="flex flex-col ">
            <div className="font-extrabold text-4xl text-[#555555]">
              Words from <br /> our clients
            </div>
            {/* Fixed position navigation buttons */}
            <div className="flex mt-4 gap-4">
              <button onClick={prevTestimonial} className="flex-shrink-0">
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
              <button onClick={nextTestimonial} className="flex-shrink-0">
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
        <div className="col-span-1 pr-40">
          <div className="min-h-[200px]">
            {" "}
            {/* Fixed minimum height container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col px-20"
            >
              <div className="text-3xl text-[#6438C3] mb-10">
                "{testimonials[currentIndex].description}"
              </div>
              <div className="flex gap-3 mt-auto">
                <div className="flex bg-slate-400 h-10 w-10 rounded-full flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image}
                    alt="logo"
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div>
                  <div>{testimonials[currentIndex].name}</div>
                  <div>{testimonials[currentIndex].designation}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SwipeButton from "../components/ui/SwipeButton";

export const Hero = () => {
  // Load logos dynamically to prevent unnecessary loading on initial render
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility after component mounts to enable lazy loading
    setIsVisible(true);
    
    // Preload the hero image for desktop
    if (window.innerWidth >= 768) {
      const img = new window.Image();
      img.src = "/components/hero1.png";
    }
  }, []);

  
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
  
 
  const logos = [...logoBaseList, ...logoBaseList];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-0">
        <div className="col-span-1">
          <div className="flex justify-end">
            <div className="p-4 grid text-[#555555] md:pt-20 gap-6">
              <div className="font-extrabold text-xl md:text-4xl">
                Your go-to partner to
                <br />
                increase{" "}
                <span className="text-[#6438C3]">Customer Retention</span>
              </div>
              <div className="text-[15px] md:text-xl">
                We help you understand customers like never
                <br className="md:hidden" /> before,
                <br className="md:inline hidden" />{" "}
                <span>
                  and build strategies that make them
                  <br className="md:hidden" /> stay long.
                </span>
              </div>

              <div className="grid gap-2 text-[15px] md:text-lg">
             
                {["Keep customers loyal", "Achieve KPIs faster", "Maximise ROIs with solutions backed by data"].map((text, index) => (
                  <div key={index} className="flex">
                    <span className="flex flex-col justify-center mx-2">
                      <Image
                        src="/icons/key-points.svg"
                        alt="bullet point"
                        height={20}
                        width={20}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </span>
                    {text}
                  </div>
                ))}
              </div>

              <div>
                <SwipeButton
                  className="hidden md:block rounded-lg "
                  firstClass=" bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white text-xl p-3 "
                  firstText="Book a free Consulation"
                  secondClass="bg-[#A47EF6] text-white text-xl p-3 "
                  secondText="Book a free Consulation"
                />
              </div>
            </div>     
          </div>
        </div>

       
        {isVisible && (
          <div className="overflow-hidden w-full mt-6 block md:hidden">
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
                  alt={`partner logo ${index + 1}`}
                  height={40}
                  width={160}
                  loading="lazy"
                />
              ))}
            </motion.div>
          </div>
        )}

      
        <div className="hidden md:block col-span-1">
          <div className="p-4 flex justify-start overflow-hidden h-[550px]">
            <motion.div
              animate={{ y: [0, -1300, 0] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/components/hero1.png"
                alt="Customer retention dashboard preview"
                width={550}
                height={1100}
                priority={true}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 550 1100'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
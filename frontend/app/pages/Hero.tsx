"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FadeAnimation from "../components/Animations/fade"; // Import FadeAnimation instead of TextAnimate
import AnimatedSwipeButton from "../components/ui/AnimatedSwipeButton";

export const Hero = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

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
    <div ref={ref} className="overflow-hidden max-h-screen"> {/* Limit to screen height */}
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-0 md:mt-20">
        <div className="col-span-1">
          <div className="flex md:justify-end">
            <div className="p-4 grid text-[#555555] md:pt-20 gap-6">
              <div className="font-extrabold text-xl md:text-[42px] ">
                {inView && (
                  <>
                    <FadeAnimation direction="fadeUp" delay={0}>
                      Your go-to partner to
                    </FadeAnimation>

                    <div className="flex md:mt-4">
                      <FadeAnimation direction="fadeUp" delay={0.1}>
                        increase
                      </FadeAnimation>
                      <div className="w-2"></div>
                      <span className="text-[#6438C3]">
                        <FadeAnimation direction="fadeUp" delay={0.2}>
                          Customer Retention
                        </FadeAnimation>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* For mobile */}
              {inView && (
                <div className="md:hidden text-[#6B6B6B] text-md">
                  <FadeAnimation direction="fadeUp" delay={0.4}>
                    We help you understand customers like never
                  </FadeAnimation>
                  <FadeAnimation direction="fadeUp" delay={0.5}>
                    before, and build strategies that make them
                  </FadeAnimation>
                  <FadeAnimation direction="fadeUp" delay={0.6}>
                    stay long.
                  </FadeAnimation>
                </div>
              )}

              {/* For desktop */}
              {inView && (
                <div className="hidden md:block text-[#6B6B6B] text-[24px] mt-2 font-light ">
                  <FadeAnimation direction="fadeUp" delay={0.4}>
                    We help you understand customers like never before,
                  </FadeAnimation>
                  <FadeAnimation direction="fadeUp" delay={0.5}>
                    and build strategies that make them stay long.
                  </FadeAnimation>
                </div>
              )}

              {inView && (
                <div className="grid gap-2 text-[15px] md:text-[24px]">
                  {[
                    "Keep customers loyal",
                    "Achieve KPIs faster",
                    "Maximise ROIs with solutions backed by data",
                  ].map((text, index) => (
                    <div key={index} className="flex">
                      <span className="flex flex-col justify-center mx-2">
                        <FadeAnimation 
                          direction="fadeIn"
                          delay={0.7 + index * 0.3}
                        >
                          <Image
                            src="/icons/key-points.svg"
                            alt="bullet point"
                            height={20}
                            width={20}
                            loading="lazy"
                          />
                        </FadeAnimation>
                      </span>
                      <FadeAnimation
                        direction="fadeIn"
                        delay={0.7 + index * 0.3}>
                        {text}
                      </FadeAnimation>
                    </div>
                  ))}
                </div>
              )}

              {inView && (
                <div>
                  <FadeAnimation direction="fadeUp" delay={1.3}>
                    <a href="https://cal.com/consoul-solutions">
                      <AnimatedSwipeButton
                        className="hidden md:block rounded-lg "
                        firstClass=" bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white text-lg p-3 px-7"
                        firstText="Book a free Consultation"
                        secondClass="bg-[#A47EF6] text-white text-lg p-3 px-7 "
                        secondText="Book a free Consultation"
                      />
                    </a>
                  </FadeAnimation>
                </div>
              )}
            </div>
          </div>
        </div>

        {inView && (
          <div className="overflow-hidden w-full mt-6 block md:hidden">
            <motion.div
              className="flex space-x-20"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
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
          {/* Container with fixed height and position */}
          <div className="p-2 flex justify-start overflow-hidden h-[700px] -mt-10 relative">
            {inView && (
              <motion.div
                className="absolute"
                animate={{ y: ["0%", "-60%", "0%"] }}
                transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.5, 1]
                }}>
                <Image
                  src="https://raw.githubusercontent.com/rishabhknowss/imagesdb/refs/heads/main/hero1.png"
                  alt="Customer retention dashboard preview"
                  width={550}
                  height={1100}
                  priority={true}
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 550 1100'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
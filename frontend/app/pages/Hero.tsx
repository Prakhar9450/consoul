"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SwipeButton from "../components/ui/SwipeButton";
import { TextAnimate } from "@/components/magicui/text-animate";
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
    <div ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-0">
        <div className="col-span-1">
          <div className="flex justify-end">
            <div className="p-4 grid text-[#555555] md:pt-20 gap-6">
              <div className="font-extrabold text-xl md:text-4xl">
                {inView && (
                  <>
                    <TextAnimate animation="blurInUp" by="text" delay={0}>
                      Your go-to partner to
                    </TextAnimate>

                    <div className="flex">
                      <TextAnimate animation="blurInUp" by="text" delay={0.1}>
                        increase
                      </TextAnimate>
                      <div className="w-2"></div>
                      <span className="text-[#6438C3]">
                        <TextAnimate animation="blurInUp" by="text" delay={0.2}>
                          Customer Retention
                        </TextAnimate>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* For mobile */}
              {inView && (
                <div className="md:hidden">
                  <TextAnimate animation="blurInUp" by="text" delay={0.4}>
                    We help you understand customers like never
                  </TextAnimate>
                  <TextAnimate animation="blurInUp" by="text" delay={0.5}>
                    before, and build strategies that make them
                  </TextAnimate>
                  <TextAnimate animation="blurInUp" by="text" delay={0.6}>
                    stay long.
                  </TextAnimate>
                </div>
              )}

              {/* For desktop */}
              {inView && (
                <div className="hidden md:block">
                  <TextAnimate animation="blurInUp" by="text" delay={0.4}>
                    We help you understand customers like never before,
                  </TextAnimate>
                  <TextAnimate animation="blurInUp" by="text" delay={0.5}>
                    and build strategies that make them stay long.
                  </TextAnimate>
                </div>
              )}

              {inView && (
                <div className="grid gap-2 text-[15px] md:text-lg">
                  {[
                    "Keep customers loyal",
                    "Achieve KPIs faster",
                    "Maximise ROIs with solutions backed by data",
                  ].map((text, index) => (
                    <div key={index} className="flex">
                      <span className="flex flex-col justify-center mx-2">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 1,
                            duration: 0.7 + index * 0.3,
                          }}>
                          <Image
                            src="/icons/key-points.svg"
                            alt="bullet point"
                            height={20}
                            width={20}
                            loading="lazy"
                          />
                        </motion.div>
                      </span>
                      <TextAnimate
                        animation="fadeIn"
                        by="line"
                        as="p"
                        delay={0.7 + index * 0.3}>
                        {text}
                      </TextAnimate>
                    </div>
                  ))}
                </div>
              )}

              {inView && (
                <div>
                    <a href=" https://cal.com/consoul-solutions"><AnimatedSwipeButton
                    className="hidden md:block rounded-lg "
                    firstClass=" bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white text-xl p-3 "
                    firstText="Book a free Consultation"
                    secondClass="bg-[#A47EF6] text-white text-xl p-3 "
                    secondText="Book a free Consultation"
                  /></a>
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
          <div className="p-4 flex justify-start overflow-hidden h-[550px]">
            {inView && (
              <motion.div
                animate={{ y: [0, -1300, 0] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}>
                <Image
                  src="https://raw.githubusercontent.com/rishabhknowss/imagesdb/refs/heads/main/hero1.png"
                  alt="Customer retention dashboard preview"
                  width={550}
                  height={1100}
                  priority={true}
                  quality={85}
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

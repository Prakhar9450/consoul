"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export const Hero = () => {
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-0">
        <div className="col-span-1">
          <div className="flex justify-end">
            <div className="p-4 grid text-[#555555] md:pt-20 gap-6">
              <div className="font-extrabold text-xl md:text-4xl">
                Your go-to partner to
                <br />
                {/* Hidden on mobile, shown on desktop */}
                increase{" "}
                <span className="text-[#6438C3]">Customer Retention</span>
              </div>
              <div className="text-[15px] md:text-xl">
                We help you understand customers like never
                <br className="md:hidden" />{" "}
              
                 before,
                <br className="md:inline hidden" />{" "}
              
                <span>
                  and build strategies that make them
                  <br className="md:hidden" />{" "}
                
                 stay long.
                </span>
              </div>

              <div className="grid gap-2 text-[15px] md:text-lg">
                <div className="flex">
                  <span className="flex flex-col justify-center mx-2">
                    <Image
                      src={"icons/key-points.svg"}
                      alt="point"
                      height={20}
                      width={20}
                    />
                  </span>
                  Keep customers loyal
                </div>
                <div className="flex">
                  <span className="flex flex-col justify-center mx-2">
                    <Image
                      src={"icons/key-points.svg"}
                      alt="point"
                      height={20}
                      width={20}
                    />
                  </span>
                  Achieve KPIs faster
                </div>
                <div className="flex">
                  <span className="flex flex-col justify-center mx-2">
                    <Image
                      src={"icons/key-points.svg"}
                      alt="point"
                      height={20}
                      width={20}
                    />
                  </span>
                  Maximise ROIs with solutions backed by data
                </div>
              </div>

              <div>
                <button className="hidden md:block bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white text-xl p-3 rounded-lg px-6">
                  Book a free consultation
                </button>
              </div>
            </div>
          </div>
        </div>

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
                alt="Hero"
                width={550}
                height={1100}
              />
            </motion.div>
          </div>
        </div>
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

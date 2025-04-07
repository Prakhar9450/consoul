"use client";
import Image from "next/image";
import { NumberTicker } from "../../components/ui/number-ticker";
import { Form } from "../components/Form";
import Footer from "../components/Footer";
import { ContactForm } from "../components/ContactForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  
  const team = [
   
    {
      image: "/logos/komal.png",
      name: "Varsha Dodeja",
      position: "Head Stratergist",
    },
    {
      image: "/logos/rajiv.png",
      name: "Rajiv Narang",
      position: "Head of operations",
    },
  ];
  
  const router = useRouter();
  
  return (
    <div>
      <div className="grid md:grid-cols-2 m-2 md:m-0 md:p-5">
        <div className="flex justify-center p-5 md:p-10">
          <div className="text-[20px] md:text-4xl font-extrabold text-[#555555]">
            Bringing the <br className="hidden md:block" />
            customer to the{" "}
            <span className="text-[#6438C3]">
              Heart
              <br /> of the Business
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-lg text-[#555555] md:p-20">
            At ConSoul, our mission is simple; To
            <br />
            bring the customer into the boardroom
            <br /> and make them central to every decision.
          </div>
        </div>
      </div>

      <div>
        <Image
          src="https://raw.githubusercontent.com/rishabhknowss/imagesdb/refs/heads/main/aboutus.png"
          alt="about"
          width={1920}
          height={1080}
        />
      </div>

      {/* Updated Founder Section */}
      <div className="md:ml-40 px-4 md:px-16 my-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left Column - Image and Title */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-3">
            <div className="w-64 h-100 overflow-hidden">
              <Image
                src="/logos/founder.svg"
                alt="Vani Garg"
                className="w-full h-full object-cover"
                height={397}
                width={309}
              />
            </div>
            <div className="text-center md:text-left ">
              <div className="text-xl font-bold text-[#555555]">
                Vani Garg
              </div>
              <div className="text-lg text-[#555555]">Founder & CEO</div>
              <div className="text-lg text-[#555555] mt-1 flex">
                Connect with Vani on{' '}
                <a href="https://linkedin.com" className="mx-1 flex flex-col justify-center">
                 <Image
                    src="/icons/linkedinblue.png"
                    alt="LinkedIn"
                    className=""
                    height={70}
                    width={70}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Quote and Description */}
          <div className="md:col-span-8 flex flex-col space-y-6 md:pt-4 md:mx-36">
            <div className="text-xl md:text-3xl font-semibold text-[#333333]">
              &ldquo;Consoul was born from a powerful vision: To elevate the customer&apos;s voice and place them at the centre of every business decision.&rdquo;
            </div>
            <div className="space-y-4 text-[#555555]">
              <p className="text-base md:text-lg">
                This passion for &ldquo;marketing that delivers&rdquo; guided our founder&apos;s journey through renowned companies like HDFC Bank, Westside, Axis Bank, and Zee5. Each experience honed their expertise in crafting impactful marketing strategies that drive real results.
              </p>
              <p className="text-base md:text-lg">
                This background fuels Consoul&apos;s mission - to empower businesses to make customer-centric decisions and achieve lasting success.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-5 md:m-10 md:mx-40 border-t py-10">
        <div className="grid grid-cols-3">
          <div className="flex justify-start">
            <div>
              <div className="text-[#6438C3] font-extrabold text-4xl md:text-8xl">
                <NumberTicker
                  value={50}
                  className="text-[#6438C3] font-extrabold text-4xl md:text-8xl"
                />
                %
              </div>
              <div className="text-sm md:text-2xl text-[#555555] font-light">
                cost saved by our experts
                <br className="hidden md:block" /> Martech stack
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div>
              <div className="text-[#6438C3] font-extrabold text-4xl md:text-8xl">
                <NumberTicker
                  value={20}
                  className="text-[#6438C3] font-extrabold text-4xl md:text-8xl"
                />
                +
              </div>
              <div className="text-xs md:text-2xl text-[#555555]  font-light">
                Tools successfully tested
                <br className="hidden md:block" /> and implemented
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div>
              <div className="text-[#6438C3] font-extrabold text-4xl md:text-8xl">
                <NumberTicker
                  value={20}
                  className="text-[#6438C3] font-extrabold text-4xl md:text-8xl"
                />
                %
              </div>
              <div className=" text-xs md:text-2xl text-[#555555]  font-light">
                Boost recorded in <br className="hidden md:block" />
                Customer Lifetime Value
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid justify-center font-extrabold md:text-3xl text-[#3F3F3F] ">
          Meet our team leads
          
        </div>
        <div>
          <div className="w-full px-4 md:px-40 md:mt-8 overflow-hidden  ">
            <div className="flex md:grid grid-cols-2 gap-4 md:gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex-shrink-0 md:col-span-1 w-[280px] md:w-full max-w-[300px] snap-center mx-auto my-4"
                >
                  <div className="rounded-lg overflow-hidden shadow-lg flex flex-col items-center">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[280px] md:h-[300px] object-cover"
                      height={300}
                      width={300}
                    />
                    <div className="text-white bg-[#6438C3] p-4 w-full text-center">
                      <div className="text-xl md:text-2xl font-bold">
                        {member.name}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm md:text-base">
                          {member.position}
                        </div>
                        <Image src='/logos/linkedin.svg' width={15} height={15} alt="Linkedin"></Image>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" max-w-6xl mx-auto px-4">
        <div className="grid justify-center items-center gap-5 my-10">
          <div className="flex justify-center text-[#3F3F3F] text-3xl font-extrabold">
            Join our team
          </div>
          <div className="text-center text-lg text-gray-800">
            We believe it takes great people to make a great product.
            That&apos;s why we hire not
            <br />
            only the perfect professional fits, but people who embody our
            company values.
          </div>
          <div className="text-[#6438C3] text-lg hover:underline cursor-pointer flex justify-center" onClick={()=>router.push('/careers')}>
            View open positions ↗
          </div>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 w-full border rounded-xl">
          <div className="bg-[#6438C3] p-12 rounded-t-xl md:rounded-l-xl md:rounded-tr-none text-white">
            <h2 className="text-3xl font-bold mb-4">
              Talk to our Strategy Expert
            </h2>
            <p className="text-lg font-light mb-8">
              Fill the form to schedule a delivery call and start the process to
              build revenue
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1EAFF] rounded-md">
                  <span className="material-symbols-rounded text-[#7122FA]">
                    call
                  </span>
                </div>
                <span className="text-lg">Schedule a discovery call</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1EAFF] rounded-md">
                  <span className="material-symbols-rounded text-[#7122FA]">
                    article
                  </span>
                </div>
                <span className="text-lg">Get a personalised proposal</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1EAFF] rounded-md">
                  <span className="material-symbols-rounded text-[#7122FA]">
                    layers
                  </span>
                </div>
                <span className="text-lg">Evaluation of current MarTech stack</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1EAFF] rounded-md">
                  <span className="material-symbols-rounded text-[#7122FA]">
                    trending_up
                  </span>
                </div>
                <span className="text-lg">Get project roadmap</span>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-12 rounded-b-xl md:rounded-r-xl md:rounded-bl-none"
            id="contact"
          >
            <Form />
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <ContactForm />
      </div>

      {/* Link to Google's Material Symbols font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <div>
        <Footer />
      </div>
    </div>
  );
}
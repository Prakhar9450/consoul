"use client"
import Image from "next/image";
import ApplicationForm from "../components/ApplyForm";
import Footer from "../components/Footer";

const LocationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_3_1905"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_3_1905)">
      <path
        d="M12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35ZM12 21.325C11.7667 21.325 11.5333 21.2833 11.3 21.2C11.0667 21.1167 10.8583 20.9917 10.675 20.825C9.59167 19.825 8.63333 18.85 7.8 17.9C6.96667 16.95 6.27083 16.0292 5.7125 15.1375C5.15417 14.2458 4.72917 13.3875 4.4375 12.5625C4.14583 11.7375 4 10.95 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 10.95 19.8542 11.7375 19.5625 12.5625C19.2708 13.3875 18.8458 14.2458 18.2875 15.1375C17.7292 16.0292 17.0333 16.95 16.2 17.9C15.3667 18.85 14.4083 19.825 13.325 20.825C13.1417 20.9917 12.9333 21.1167 12.7 21.2C12.4667 21.2833 12.2333 21.325 12 21.325ZM12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12Z"
        fill="#747474"
      />
    </g>
  </svg>
);

const TimeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_3_1910"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_3_1910)">
      <path
        d="M13 11.6V8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8V11.975C11 12.1083 11.025 12.2375 11.075 12.3625C11.125 12.4875 11.2 12.6 11.3 12.7L14.6 16C14.7833 16.1833 15.0167 16.275 15.3 16.275C15.5833 16.275 15.8167 16.1833 16 16C16.1833 15.8167 16.275 15.5833 16.275 15.3C16.275 15.0167 16.1833 14.7833 16 14.6L13 11.6ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20Z"
        fill="#747474"
      />
    </g>
  </svg>
);

export default function Page() {
  const jobs = [
    {
      category: "Analytics",
      positions: [
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
      ],
    },
    {
      category: "Operations",
      positions: [
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
      ],
    },
    {
      category: "Strategy",
      positions: [
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
        {
          title: "D2C Marketing Internship",
          type: "Full-time",
          location: "Remote",
        },
      ],
    },
  ];



  return (
    <div>
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 p-5">
        <div className="flex justify-center p-5 md:p-10">
          <div className="text-2xl md:text-4xl font-extrabold text-[#555555] text-center md:text-left">
            Shape the future of <br /> marketing with us
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-base md:text-lg text-[#555555] p-4 text-center md:text-left">
            We&apos;re on a mission to change how
            <br /> businesses build lasting relationships with
            <br /> their customers. If you&apos;re passionate
            <br /> about it, we&apos;d love to have you on board.
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full hidden md:block">
        <Image
          src="/components/careers.png"
          alt="about"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
        />
      </div>

      <div>
        <Image 
          src="/components/careers-mobile.png"
          alt="about"
          width={375}
          height={812}
          className="w-full h-auto object-cover md:hidden"
        />
      </div>

      {/* Job Listings Section */}
      <div className="my-10 md:my-20 mx-4 md:mx-60">
        <div>
          <div className="text-2xl md:text-3xl text-[#555555] flex justify-center font-bold">
            Open positions
          </div>
          <div className="flex justify-center my-6 text-base md:text-xl text-[#555555] text-center px-4">
            <div>
              Can&apos;t find a role that matches your expertise?
              <span className="underline text-[#6438C3] cursor-pointer">
                {" "}
                Apply with your CV and a cover letter
              </span>
              <br />
              We&apos;d love to learn more about you and explore how you can be part
              of our team!
            </div>
          </div>
        </div>

        {/* Job Listings with Slider on Mobile */}
        <div className="space-y-8">
          {jobs.map((section, index) => (
            <div key={index} className="">
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-[#555555]">
                {section.category}
              </h2>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 md:gap-5">
                {section.positions.map((job, jobIndex) => (
                  <div
                    key={jobIndex}
                    className="p-6 rounded-2xl border border-purple-300 bg-white hover:bg-[#FAF7FF] transition-colors w-[280px]"
                  >
                    <div className="text-[#6438C3] text-sm font-medium">
                      {section.category}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mt-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-6 mt-4 text-[#747474] text-sm">
                      <div className="flex items-center gap-2">
                        <LocationIcon />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TimeIcon />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href="#"
                        className="text-[#6438C3] hover:underline inline-flex items-center text-sm font-medium"
                      >
                        View job
                        <span className="ml-1">→</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Slider */}
              <div className="md:hidden relative">
                <div
                  
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
                >
                  {section.positions.map((job, jobIndex) => (
                    <div
                      key={jobIndex}
                      className="p-6 rounded-2xl border border-purple-300 bg-white hover:bg-[#FAF7FF] transition-colors w-[280px] flex-shrink-0 snap-start"
                    >
                      <div className="text-[#6438C3] text-sm font-medium">
                        {section.category}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mt-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-6 mt-4 text-[#747474] text-sm">
                        <div className="flex items-center gap-2">
                          <LocationIcon />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TimeIcon />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <a
                          href="#"
                          className="text-[#6438C3] hover:underline inline-flex items-center text-sm font-medium"
                        >
                          View job
                          <span className="ml-1">→</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Slider Controls */}
              
              </div>
            </div>
          ))}
        </div>

        <div className="my-10 md:my-20" id="contact">
          <ApplicationForm />
        </div>
      </div>

      <div className="border-t">
        <Footer />
      </div>
    </div>
  );
}
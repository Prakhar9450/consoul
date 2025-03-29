"use client";

import { TextAnimateDemo } from "@/components/AreYouReadyText";
import SwipeButton from "./ui/SwipeButton";

export const Ready = () => {
  return (
    <div className="bg-gradient-to-l from-[#F1EAFF] to-[#FFEBE8] p-10 py-20 grid gap-10 ">
      <div className="grid grid-cols-2 text-5xl font-extrabold gap-5">
        <div className=" text-[#555555] flex justify-end">
          Are your ready to
        </div>
        <div className="text-[#6438C3]">
          <TextAnimateDemo />
        </div>
      </div>
      <div className="flex justify-center">
        <a href="https://cal.com/consoul-solutions"><SwipeButton
          className="w-fit hidden lg:block bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white rounded-lg md:text-lg font-semibold"
          firstClass=" bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white  text-lg py-2 md:py-3 px-4 md:px-6 "
          firstText="Yes, I am ready. Let’s talk"
          secondClass="bg-[#A47EF6] text-white py-2 md:py-3 px-4 md:px-6  text-lg"
          secondText="Yes, I am ready. Let’s talk"
        ></SwipeButton></a>
      </div>
    </div>
  );
};

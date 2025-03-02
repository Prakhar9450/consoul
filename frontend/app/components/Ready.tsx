"use client"

import { TextAnimateDemo } from "@/components/AreYouReadyText"

export const Ready = () => {
    return <div className="bg-gradient-to-l from-[#F1EAFF] to-[#FFEBE8] p-10 py-20 grid gap-10 ">
        <div className="grid grid-cols-2 text-5xl font-extrabold gap-5">
            <div className=" text-[#555555] flex justify-end">
                Are your ready to

            </div>
            <div className="text-[#6438C3]">
            <TextAnimateDemo />

            </div>

        </div>
        <div className="flex justify-center">
            <button className="bg-[#6438C3] text-white font-semibold p-4 px-10 text-xl rounded-lg">Yes, I am ready. Let&apos;s talk</button>
        </div>
    </div>
   
}
"use client";
import React from "react";

export function DownloadGuideSkeleton() {
  return (
    <div className="relative w-full">
      <div className="p-4 md:p-10 md:py-12 bg-[#6438C3] text-white md:rounded-3xl">
        <div className="grid md:grid-cols-5 gap-4">
          <div className="col-span-5 lg:col-span-4 grid gap-4 md:pl-6">
            <div className="flex flex-col gap-4">
              <div className="h-8 md:h-10 w-3/4 bg-purple-300 rounded-md animate-pulse"></div>
              <div className="h-8 md:h-10 w-2/3 bg-purple-300 rounded-md animate-pulse"></div>
            </div>
            <div className="mt-2">
              <div className="p-2 px-6 bg-white rounded-md w-36 h-12 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute right-14 -bottom-1">
        <div className="w-[200px] h-[200px] bg-purple-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}

export default DownloadGuideSkeleton;
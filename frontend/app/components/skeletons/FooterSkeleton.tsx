"use client";
import React from "react";

export function FooterSkeleton() {
  return (
    <div className="flex justify-center w-full my-10">
      <footer className="md:py-12 w-full">
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 border-b pb-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="w-[200px] h-[50px] bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full h-16">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Product and Company Links */}
          <div className="grid grid-cols-2">
            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex flex-col space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex flex-col space-y-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="h-6 w-28 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse shrink-0 mt-1"></div>
                <div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="container my-4 flex flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
          <div className="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </footer>
    </div>
  );
}

export default FooterSkeleton;
"use client";
import React from "react";

export function ServicesNavSkeleton() {
  // Create placeholders for the 6 service items
  return (
    <div className="relative my-10 mx-4 md:mx-48">
      <div className="flex justify-between md:justify-between overflow-x-auto scrollbar-hide gap-6 py-2 px-2">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="service-item grid gap-2 flex-shrink-0">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded bg-gray-200 animate-pulse"></div>
              </div>
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          ))}
      </div>
      
      <style jsx>{`
        :global(.scrollbar-hide::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default ServicesNavSkeleton;
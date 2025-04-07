"use client";
import React from "react";

export function SuccessStoriesMobileSkeleton() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Header - if needed */}
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-6 md:hidden"></div>
      
      {/* Carousel */}
      <div className="relative w-full px-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-[#F8F5FF] rounded-lg p-4 flex-shrink-0 w-[280px] shadow-lg"
            >
              {/* Story description skeleton */}
              <div className="text-center mb-4">
                <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-1"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse mx-auto mb-3"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse mx-auto mt-2"></div>
              </div>

              {/* Metrics skeleton */}
              <div className="space-y-2">
                {[1, 2, 3, 4].map((metric) => (
                  <div key={metric} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md animate-pulse flex-grow"></div>
                  </div>
                ))}
              </div>

              {/* Call to Action skeleton */}
              <div className="mt-4 text-center">
                <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse mx-auto mb-2"></div>
                <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuccessStoriesMobileSkeleton;
"use client";
import React from "react";

export function SuccessStoriesSkeleton() {
  return (
    <div className="flex justify-center">
      <div className="p-4 md:p-8 flex flex-col items-center relative overflow-hidden w-full">
        {/* Title */}
        <div className="h-10 md:h-12 w-64 bg-gray-200 rounded-md animate-pulse mb-8 mx-auto"></div>
        
        {/* Subtitle */}
        <div className="w-full max-w-3xl mx-auto mb-8">
          <div className="h-8 w-3/4 bg-gray-200 rounded-md animate-pulse mb-2 mx-auto"></div>
          <div className="h-8 w-4/5 bg-gray-200 rounded-md animate-pulse mx-auto"></div>
        </div>

        {/* Content and image section */}
        <div className="w-full max-w-5xl flex items-center justify-between px-0 md:px-4 mx-auto">
          {/* Left Side - Content */}
          <div className="w-1/2 pr-0 md:pr-3">
            <div className="space-y-3 md:space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse mr-2"></div>
                  <div className="h-6 bg-gray-200 rounded-md animate-pulse flex-grow"></div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8">
              <div className="h-6 w-56 bg-gray-200 rounded-md animate-pulse mb-3"></div>
              <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
              <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mx-auto"></div>
            </div>
          </div>
          
          {/* Right Side - Image with constrained size */}
          <div className="w-1/2 pl-0 md:pl-3 flex items-center justify-center">
            <div className="w-[350px] h-[350px] bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex space-x-4 mt-12 justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default SuccessStoriesSkeleton;
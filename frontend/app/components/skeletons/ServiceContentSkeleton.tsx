"use client";
import React from "react";

export function ServiceContentSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {Array(3)
        .fill(0)
        .map((_, sectionIndex) => (
          <section key={sectionIndex} className="py-10 md:py-20 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="mb-12 text-center">
                <div className="h-8 md:h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                <div className="h-6 md:h-8 w-96 max-w-full bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>

              {/* Section Content */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Features Column */}
                <div className="relative">
                  <div className="hidden md:block absolute left-[1] top-0 w-1 h-full bg-gray-100 rounded-t-full rounded-b-full" />
                  <div className="space-y-8">
                    {Array(4)
                      .fill(0)
                      .map((_, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="relative pl-6 bg-white md:bg-white"
                        >
                          <div className="hidden md:block absolute left-0 top-0 w-1 h-full bg-gray-100 rounded-t-full rounded-b-full" />
                          <div className="text-center md:text-left">
                            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Image Column */}
                <div className="relative h-[300px] w-full rounded-lg order-last md:order-none">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[400px] h-[240px] bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
    </div>
  );
}

export default ServiceContentSkeleton;
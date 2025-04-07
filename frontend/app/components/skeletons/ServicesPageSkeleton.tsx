"use client";
import React from "react";
import { ServicesNavSkeleton } from "./ServicesNavSkeleton";
import { ServiceContentSkeleton } from "./ServiceContentSkeleton";
import { DownloadGuideSkeleton } from "./DownloadGuideSkeleton";
import { SuccessStoriesSkeleton } from "./SuccessStoriesSkeleton";
import { SuccessStoriesMobileSkeleton } from "./SuccessStoriesMobileSkeleton";
import { FooterSkeleton } from "./FooterSkeleton";

export default function ServicesPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <ServiceContentSkeleton />
      
      {/* Button placeholder */}
      <div className="text-center my-10 hidden md:flex justify-center">
        <div className="h-12 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      {/* Download Guide placeholder */}
      <div className="my-10 md:mx-28 md:my-20 flex justify-center">
        <DownloadGuideSkeleton />
      </div>
      
      {/* Success Stories placeholder */}
      <div className="my-10 hidden md:block">
        <SuccessStoriesSkeleton />
      </div>
      
      {/* Mobile Success Stories placeholder */}
      <div className="my-8 block md:hidden">
        <SuccessStoriesMobileSkeleton />
      </div>
      
      {/* Footer placeholder */}
      <FooterSkeleton />
    </div>
  );
}

// Also provide a loading file implementation
export function ServicesLoadingPage() {
  return <ServicesPageSkeleton />;
}   
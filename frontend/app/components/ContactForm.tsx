"use client";
import React from "react";
import { Form } from "./Form";
import Image from "next/image";

export const ContactForm = () => {
  return (
    <div className="md:grid grid-cols-2 w-full shadow-xl border rounded-xl md:max-w-8xl">
      <div className="hidden md:block bg-[#6438C3] rounded-l-xl text-white">
        <div className="flex flex-col h-full">
          <div className="space-y-4 p-10">
            <h1 className="text-3xl font-bold leading-tight">
              Need help with your customer <br />
              life-cycle management?
            </h1>
            <p className="text-xl opacity-90">
              Drop in your details and our Strategy expert <br />
              will call you.
            </p>
          </div>
          
          {/* Completely revised layout for founder section - now using flex layout matching image */}
          <div className="mt-auto p-6">
            <div className="flex items-start">
              <div className="w-56 h-auto rounded-lg overflow-hidden">
                <Image
                  src="/logos/founder.svg"
                  alt="Founder"
                  className="w-full h-full object-cover"
                  height={200}
                  width={200}
                />
              </div>
              <div className="ml-4 flex flex-col">
                <h2 className="text-2xl font-bold mb-1">Meet the founder</h2>
                <p className="text-base opacity-90 mb-4">
                  Hi, I am Vani, and I am so glad to<br />
                  see you here. I am personally<br />
                  involved in all projects and would<br />
                  love to connect with you.
                </p>
                <h3 className="font-bold text-lg mb-0 mt-16">Vani Garg</h3>
                <p className="text-sm opacity-90 mb-1">Founder & CEO</p>
                <p className="flex items-center gap-1 text-sm opacity-90">
                  Connect with Vani on
                  <a
                    href="https://www.linkedin.com/in/vani-garg/"
                    target="_blank"
                    className="inline-flex items-center"
                  >
                    <Image
                      src="/icons/linkedin.svg"
                      height={20}
                      width={60}
                      alt="LinkedIn"
                    />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#6438C3] md:bg-white p-12 md:rounded-r-xl">
        <Form />
      </div>
    </div>
  );
};
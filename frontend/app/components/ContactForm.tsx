"use client";
import React from "react";
import { Form } from "./Form";
import Image from "next/image";

export const ContactForm = () => {
  return (
    <div className="md:grid grid-cols-2 w-full shadow-xl border rounded-xl">
      <div className="hidden md:block bg-[#6438C3] p-12 rounded-l-xl text-white">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Need help with your customer <br />
              life-cycle management?
            </h1>
            <p className="text-xl opacity-90">
              Drop in your details and our Strategy expert <br />
              will call you.
            </p>
          </div>

          <div className="mt-28">
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="w-64 h-w-64 rounded-lg overflow-hidden">
                <Image
                  src="/logos/founder.svg"
                  alt="Founder"
                  className="w-full h-full object-cover"
                  height={200}
                    width={200}
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Meet the founder</h2>
                  <p className="text-lg opacity-90 leading-relaxed font-semibold">
                    Hi, I am Vani, and I am so glad to see you here. I am
                    personally involved in all projects and would love to
                    connect with you.
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-2xl">Vani Garg</h3>
                  <p className="text-lg opacity-90 font-semibold">
                    Founder & CEO
                  </p>
                  <p className="text-lg">
                    Connect with Vani on{" "}
                    <span className="underline cursor-pointer">LinkedIn</span>
                  </p>
                </div>
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

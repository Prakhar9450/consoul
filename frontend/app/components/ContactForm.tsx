"use client";
import React from "react";
import { Form } from "./Form";
import Image from "next/image";

export const ContactForm = () => {
  return (
    <div className="md:grid grid-cols-2 w-full shadow-xl border rounded-xl md:max-w-8xl">
      <div className="hidden md:block bg-[#6438C3] p-12 rounded-l-xl text-white">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Need help with your customer <br />
              life-cycle management?
            </h1>
            <p className=" text-2xl opacity-90">
              Drop in your details and our Strategy expert <br />
              will call you.
            </p>
          </div>

          <div className="mt-28">
            <div className="grid grid-cols-2 items-center gap-0">
              <div className="w-60 h-w-56 rounded-lg overflow-hidden">
                <Image
                  src="/logos/founder.svg"
                  alt="Founder"
                  className="w-full h-full object-cover"
                  height={200}
                  width={200}
                />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Meet the founder</h2>
                  <p className="text-base opacity-90">
                    Hi, I am Vani, and I am so glad to <br />
                    see you here. I am personally <br />
                    involved in all projects and would <br />
                    love to connect with you.
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">Vani Garg</h3>
                  <p className="text-sm opacity-90">Founder & CEO</p>
                  <p className="flex gap-2 text-sm opacity-90">
                    Connect with Vani on{" "}
                    <span className="underline flex flex-col justify-center cursor-pointer">
                      <a
                        href="https://www.linkedin.com/in/vani-garg-1b1b1b1b1/"
                        target="_blank">
                        <Image
                          src="/icons/linkedin.svg"
                          height={60}
                          width={60}
                          alt="
                      LinkedIn"
                        />
                      </a>
                    </span>
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

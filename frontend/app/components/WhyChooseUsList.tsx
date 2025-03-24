"use client";
import React from "react";
import { AnimatedList } from "@/components/magicui/animated-list";
import { ContactForm } from "./ContactForm";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const items = [
  { name: "Pay-as-you-go", icon: "/icons/fingerprints.svg" },
  { name: "Quicker go-to-market strategies", icon: "/icons/fingerprints.svg" },
  {
    name: "Impactful, result-driven deliverables",
    icon: "/icons/fingerprints.svg",
  },
  {
    name: "No more lengthy implementation cycles",
    icon: "/icons/fingerprints.svg",
  },
  { name: "No capital investment", icon: "/icons/fingerprints.svg" },
];

const ListItem = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <div className="bg-white rounded-xl p-4 w-full max-w-[400px] flex items-center gap-3 shadow-sm hover:scale-[102%] transition-transform">
      <div className="flex items-center justify-center w-8 h-8 rounded-full">
        <Image
          src={icon}
          alt=""
          className="w-full h-full"
          height={32}
          width={32}
        />
      </div>
      <span className="text-gray-700 font-medium">{name}</span>
    </div>
  );
};

export function WhyChooseUsList() {
  const { ref, inView } = useInView({ threshold: 0.3 }); // Trigger animation when 30% of the section is visible

  return (
    <div ref={ref} className="h-[400px] overflow-hidden">
      {inView && (
        <AnimatedList delay={700}>
          {items.map((item, index) => (
            <ListItem key={index} {...item} />
          ))}
        </AnimatedList>
      )}
    </div>
  );
}

export const ChooseUs = () => {
  return (
    <div className="bg-[#F1EAFF]">
      <div className="grid grid-cols-2 w-full h-screen">
        <div className="col-span-1 flex justify-center pl-40 mt-72">
          <div className="font-extrabold text-4xl text-[#555555]">
            why choose us?
          </div>
        </div>
        <div className="w-full mt-32 pr-80">
          <WhyChooseUsList />
        </div>
      </div>

      <div className="py-20 flex justify-center mx-80">
        <ContactForm />
      </div>
    </div>
  );
};

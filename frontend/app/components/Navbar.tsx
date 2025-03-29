"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import SwipeButton from "./ui/SwipeButton";

export const Navbar = () => {
  const NavbarItems = [
    {
      label: "Services",
      path: "/services/media-ott",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      ),
    },
    { label: "Success Stories", path: "/success-stories" },
    { label: "Blogs", path: "/blogs" },
    { label: "Careers", path: "/careers" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "#contact" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const currentIndex = NavbarItems.findIndex(
      (item) => item.path === pathname
    );
    setActiveIndex(currentIndex);
  }, [pathname]);

  const handleClick = (path: string, index: number) => {
    setActiveIndex(index);
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed -top-5 left-0 w-full z-50 bg-white p-4">
      <div className="flex justify-between items-center lg:justify-center lg:space-x-20">
        <div className="flex items-center ">
          <Image
            src="/logos/consoul.png"
            alt="logo"
            width={120}
            height={1000}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="hidden lg:block">
          <div className="flex gap-8">
            {NavbarItems.map((item, index) => (
              <div
                key={index}
                className={`flex text-lg text-[#555555] items-center gap-1 p-2 rounded-lg cursor-pointer transition duration-300 hover:text-[#6438C3] ${
                  activeIndex === index ? "text-[#6438C3] font-bold" : ""
                }`}
                onClick={() => handleClick(item.path, index)}>
                <span>{item.label}</span>
                {item.icon && <span>{item.icon}</span>}
              </div>
            ))}
          </div>
        </div>
        <a href=" https://cal.com/consoul-solutions"><SwipeButton
          className="hidden lg:block bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white rounded-lg"
          firstClass=" bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white  text-sm py-2 px-4 "
          firstText="Book a call"
          secondClass="bg-[#A47EF6] text-white py-2 px-4 text-sm"
          secondText="Book a call"></SwipeButton></a>
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X color="#6438C3" size={24} />
            ) : (
              <Image
                src="/icons/hamburger.svg"
                alt="menu"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

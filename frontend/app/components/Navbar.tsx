"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import SwipeButton from "./ui/SwipeButton";

const services = [
  { name: "Media & OTT", icon: "/icons/mediaott.svg", route: "/services/media-ott", desc: "Retain & upsell subscribers" },
  { name: "E-Commerce & Retail", icon: "/icons/ecommerce.svg", route: "/services/ecommerce&retail", desc: "Boost sales conversion" },
  { name: "Edu-Tech", icon: "/icons/edutech.svg", route: "/services/edutech", desc: "Turn leads into enrolments" },
  { name: "Food & Beverages", icon: "/icons/food.svg", route: "/services/food&beverages", desc: "Increase repeat purchases" },
  { name: "Travel & Hospitality", icon: "/icons/travel.svg", route: "/services/travel&hospitality", desc: "Enhance booking experiences" },
  { name: "Banking & Financial Services", icon: "/icons/banking.svg", route: "/services/banking&financial", desc: "Strengthen trust and relationship" },
];

export const Navbar = () => {
  const NavbarItems = [
    { label: "Success Stories", path: "/success-stories" },
    { label: "Blog", path: "/blogs" },
    { label: "Careers", path: "/careers" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "#contact" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const currentIndex = NavbarItems.findIndex((item) => item.path === pathname);
    setActiveIndex(currentIndex);
  }, [pathname]);

  const handleClick = (path: string, index: number) => {
    setActiveIndex(index);
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white p-4">
      {/* Overlay when Services Dropdown is Open */}
      {isServicesOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 transition-opacity duration-300"></div>
      )}

      <div className="flex justify-between items-center lg:justify-center lg:space-x-20">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logos/consoul.png"
            alt="logo"
            width={120}
            height={1000}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="flex text-lg text-[#555555] items-center gap-1 p-2 cursor-pointer hover:text-[#6438C3]">
              <span>Services</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {/* Services Dropdown Component */}
            {isServicesOpen && (
              <div className="absolute left-0 top-full bg-white shadow-lg rounded-xl p-6 w-[900px]">
                <div className="grid grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-start gap-3 p-2 py-4 hover:bg-[#F1EAFF] rounded-lg cursor-pointer transition duration-300"
                      onClick={() => router.push(service.route)}
                    >
                      <Image src={service.icon} alt={service.name} width={24} height={24} />
                      <div>
                        <h3 className="font-semibold text-gray-800">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Navigation Items */}
          {NavbarItems.map((item, index) => (
            <div
              key={index}
              className={`text-lg text-[#555555] p-2 cursor-pointer transition duration-300 hover:text-[#6438C3] ${
                activeIndex === index ? "text-[#6438C3] font-bold" : ""
              }`}
              onClick={() => handleClick(item.path, index)}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Book a Call Button */}
        <a href="https://cal.com/consoul-solutions">
          <SwipeButton
            className="hidden lg:block bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white rounded-lg"
            firstClass="bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white text-sm py-3 px-4"
            firstText="Book a call"
            secondClass="bg-[#A47EF6] text-white py-2 px-4 text-sm"
            secondText="Book a call"
          />
        </a>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X color="#6438C3" size={24} />
            ) : (
              <Image src="/icons/hamburger.svg" alt="menu" width={24} height={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md p-6 lg:hidden">
          {NavbarItems.map((item, index) => (
            <div
              key={index}
              className="p-3 text-lg text-[#555555] cursor-pointer hover:text-[#6438C3]"
              onClick={() => handleClick(item.path, index)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

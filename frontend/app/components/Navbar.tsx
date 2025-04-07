"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import SwipeButton from "./ui/SwipeButton";

const services = [
  {
    name: "Media & OTT",
    icon: "/icons/mediaott.svg",
    route: "/services/media-ott",
    desc: "Retain & upsell subscribers",
  },
  {
    name: "E-Commerce & Retail",
    icon: "/icons/ecommerce.svg",
    route: "/services/ecommerce&retail",
    desc: "Boost sales conversion",
  },
  {
    name: "Edu-Tech",
    icon: "/icons/edutech.svg",
    route: "/services/edutech",
    desc: "Turn leads into enrolments",
  },
  {
    name: "Food & Beverages",
    icon: "/icons/food.svg",
    route: "/services/food&beverages",
    desc: "Increase repeat purchases",
  },
  {
    name: "Travel & Hospitality",
    icon: "/icons/travel.svg",
    route: "/services/travel&hospitality",
    desc: "Enhance booking experiences",
  },
  {
    name: "Banking & Financial Services",
    icon: "/icons/banking.svg",
    route: "/services/banking&financial",
    desc: "Strengthen trust and relationship",
  },
];

export const Navbar = () => {
  const NavbarItems = [
    { label: "Success Stories", path: "/success-stories" },
    { label: "Blog", path: "/blogs" },
    { label: "Careers", path: "/careers" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/about#contact" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isServicesActive, setIsServicesActive] = useState(false);

  useEffect(() => {
    const currentIndex = NavbarItems.findIndex(
      (item) => item.path === pathname
    );
    setActiveIndex(currentIndex);
    
    // Check if current path starts with "/services"
    setIsServicesActive(pathname.startsWith("/services"));
  }, [pathname]);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  const handleClick = (path: string, index: number): void => {
    setActiveIndex(index);
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleServiceClick = (route: string): void => {
    router.push(route);
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white p-4 text-[#555555] ">
      {/* Overlay when Services Dropdown is Open - positioned below navbar */}
      <div 
        className={`fixed inset-0 top-24 bg-black transition-opacity duration-300 ${
          isServicesOpen 
            ? "opacity-20" 
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      
      {/* Main Navbar Container - Fixed Height */}
      <div className="flex justify-between items-center lg:justify-center lg:space-x-24 h-16 ">
        {/* Logo Container with Constraints */}
        <div className="relative h-10 w-40 flex items-center overflow-visible">
          <Image
            src="/logos/consoul.svg"
            alt="logo"
            width={140}
            height={50}
            className="cursor-pointer object-contain"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (closeTimeout) {
                clearTimeout(closeTimeout);
                setCloseTimeout(null);
              }
              setIsServicesOpen(true);
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(() => {
                setIsServicesOpen(false);
              }, 200); // 300ms delay before closing
              setCloseTimeout(timeout);
            }}
          >
            <div 
              className={`flex text-lg text-[#555555] items-center gap-1 p-2 cursor-pointer hover:text-[#6438C3] ${
                isServicesActive ? "text-[#6438C3] font-bold" : ""
              }`}
              onClick={() => router.push("/services/media-ott")}
            >
              <span>Services</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-300 ${
                  isServicesOpen ? "transform rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>

            {/* Services Dropdown Component */}
            <div 
              className={`absolute -left-28 top-16 bg-white shadow-lg rounded-xl p-6 w-[1000px] z-50 transition-all duration-300 ${
                isServicesOpen 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="grid grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-start gap-3 p-2 px-4 py-4 hover:bg-[#F1EAFF] rounded-lg cursor-pointer transition duration-300"
                      onClick={() => router.push(service.route)}
                    >
                      <Image
                        src={service.icon}
                        alt={service.name}
                        width={24}
                        height={24}
                      />
                      <div>
                        <h3 className="font-semibold text-black ">
                          {service.name}
                        </h3>
                        <p className="text-sm">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          
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
            firstClass="bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white text-md py-3 px-6"
            firstText="Book a call"
            secondClass="bg-[#A47EF6] text-white  text-md py-3 px-6"
            secondText="Book a call"
          />
        </a>

        {/* Mobile Menu */}
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

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full h-screen bg-white shadow-md p-6 lg:hidden">
          {/* Services Dropdown for Mobile */}
          <div className="p-3 text-lg text-[#555555]">
            <div
              className={`flex items-center space-x-3 cursor-pointer hover:text-[#6438C3] ${
                isServicesActive ? "text-[#6438C3] font-bold" : ""
              }`}
              onClick={() => {
                // Toggle dropdown on mobile
                setIsMobileServicesOpen(!isMobileServicesOpen);
              }}
            >
              <span>Services</span>
              {isMobileServicesOpen ? (
                <ChevronRight className={`w-5 h-5 transition-transform duration-300 transform rotate-90`} />
              ) : (
                <ChevronRight className={`w-5 h-5 transition-transform duration-300`} />
              )}
            </div>

            {/* Mobile Services Submenu */}
            {isMobileServicesOpen && (
              <div className="mt-2 ml-4 space-y-3">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center gap-2 p-2 cursor-pointer hover:text-[#6438C3]"
                    onClick={() => handleServiceClick(service.route)}
                  >
                    <Image
                      src={service.icon}
                      alt={service.name}
                      width={20}
                      height={20}
                    />
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Navigation Items */}
          {NavbarItems.map((item, index) => (
            <div
              key={index}
              className={`p-3 text-lg text-[#555555] cursor-pointer hover:text-[#6438C3] ${
                activeIndex === index ? "text-[#6438C3] font-bold" : ""
              }`}
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
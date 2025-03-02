"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const services = [
  { name: "Media & OTT", icon: "/icons/mediaott.svg", route: "/services/media-ott" },
  { name: "Food & Beverages", icon: "/icons/food.svg", route: "/services/food&beverages" },
  { name: "E-Commerce & Retail", icon: "/icons/ecommerce.svg", route: "/services/ecommerce&retail" },
  { name: "Travel & Hospitality", icon: "/icons/travel.svg", route: "/services/travel&hospitality" },
  { name: "EduTech", icon: "/icons/edutech.svg", route: "/services/edutech" },
  { name: "Banking & Financial Services", icon: "/icons/banking.svg", route: "/services/banking&financial" },
];

type Service = {
  name: string;
  icon: string;
  route: string;
};

export const ServicesNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeService, setActiveService] = useState("Media & OTT");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentService = services.find(service => service.route === pathname);
    if (currentService) {
      setActiveService(currentService.name);
      
      
      setTimeout(() => {
        scrollToActiveItem();
      }, 100);
    }
  }, [pathname]);
  

  const handleServiceClick = (service: Service) => {
    setActiveService(service.name);
    router.push(service.route);
  };

  const scrollToActiveItem = () => {
    if (!scrollContainerRef.current) return;
    
    const activeIndex = services.findIndex(service => service.name === activeService);
    if (activeIndex !== -1) {
      const container = scrollContainerRef.current;
      const items = container.querySelectorAll('.service-item');
      const activeItem = items[activeIndex] as HTMLElement;
      
      if (activeItem) {
        const containerWidth = container.offsetWidth;
        const itemLeft = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;
        
     
        container.scrollTo({
          left: itemLeft - (containerWidth / 2) + (itemWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  };



  return (
    <div className="relative my-10 mx-4 md:mx-48">

      <div 
        ref={scrollContainerRef}
        className="flex justify-between md:justify-between overflow-x-auto scrollbar-hide gap-6 py-2 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => {
          const isActive = activeService === service.name;
          
          return (
            <div
              key={service.name}
              onClick={() => handleServiceClick(service)}
              className={`service-item cursor-pointer grid gap-2 transition-colors duration-300 flex-shrink-0 ${
                isActive ? "text-[#6438C3] font-semibold" : "hover:text-[#6438C3]"
              }`}
            >
              <div className="flex justify-center relative">
                <div className={`p-2 rounded ${isActive ? "bg-[#F1EAFF]" : ""}`}>
                  <Image
                    src={service.icon}
                    alt={service.name}
                    height={20}
                    width={20}
                    className={`transition-all duration-300 ${
                      isActive ? "text-[#6438C3]" : ""
                    }`}
                  />
                </div>
              </div>
              <div className="text-center whitespace-nowrap">{service.name}</div>
            </div>
          );
        })}
      </div>
     
      <style jsx>{`
        :global(.scrollbar-hide::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </div>
  );
};
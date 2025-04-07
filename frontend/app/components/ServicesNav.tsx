"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const services = [
  { 
    name: "Media & OTT", 
    icon: "live_tv", 
    route: "/services/media-ott" 
  },
  { 
    name: "Food & Beverages", 
    icon: "restaurant", 
    route: "/services/food&beverages" 
  },
  { 
    name: "E-Commerce & Retail", 
    icon: "shopping_cart", 
    route: "/services/ecommerce&retail" 
  },
  { 
    name: "Travel & Hospitality", 
    icon: "flight", 
    route: "/services/travel&hospitality" 
  },
  { 
    name: "EduTech", 
    icon: "school", 
    route: "/services/edutech" 
  },
  { 
    name: "Banking & Financial Services", 
    icon: "account_balance", 
    route: "/services/banking&financial" 
  },
];

type Service = {
  name: string;
  icon: string;
  route: string;
};

// Create a flag in localStorage to track first load
const isFirstLoad = () => {
  if (typeof window === 'undefined') return true; // Server-side rendering

  const hasLoaded = localStorage.getItem('servicesNavLoaded');
  if (!hasLoaded) {
    return true;
  }
  return false;
};

const markAsLoaded = () => {
  if (typeof window === 'undefined') return; // Server-side rendering
  localStorage.setItem('servicesNavLoaded', 'true');
};

export const ServicesNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeService, setActiveService] = useState("Media & OTT");
  const [isLoading, setIsLoading] = useState(isFirstLoad);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentService = services.find(service => service.route === pathname);
    if (currentService) {
      setActiveService(currentService.name);
      
      setTimeout(() => {
        scrollToActiveItem();
      }, 100);
    }
    
    // If this is the first load, show skeleton for a short time
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        markAsLoaded(); // Mark as loaded after first time
      }, 2000); // Adjust time as needed
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isLoading]);
  
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

  // If loading, show skeleton version
  if (isLoading) {
    return (
      <div className="relative my-10 mx-4 md:mx-48">
        <div 
          className="flex justify-between md:justify-between overflow-x-auto scrollbar-hide gap-6 py-2 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Array(6).fill(0).map((_, index) => (
            <div
              key={index}
              className="service-item grid gap-2 flex-shrink-0"
            >
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded bg-gray-200 animate-pulse"></div>
              </div>
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          ))}
        </div>
        
        <style jsx>{`
          :global(.scrollbar-hide::-webkit-scrollbar) {
            display: none;
          }
        `}</style>
      </div>
    );
  }

  // Regular component when not loading
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
                isActive ? "text-[#6438C3] font-semibold" : "hover:text-[#B881FF]"
              }`}
            >
              <div className="flex justify-center relative">
                <div className={`flex items-center justify-center w-10 h-10 rounded ${isActive ? "bg-[#F1EAFF]" : ""}`}>
                  <span 
                    className={`material-symbols-rounded transition-all duration-300 ${
                      isActive ? "text-[#6438C3]" : "text-[#1f1f1f] hover:text-[#B881FF]"
                    }`}
                    style={{ fontSize: '20px' }}
                  >
                    {service.icon}
                  </span>
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
      
      {/* Link to Google's Material Symbols font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
      />
    </div>
  );
};
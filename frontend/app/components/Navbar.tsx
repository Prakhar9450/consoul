"use client"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

export const Navbar = () => {
  const NavbarItems = [
    {
      label: "Services",
      icon: (
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
      ),
      path: "/services/media-ott",
    },
    { label: "Success Stories", path: "/success-stories" },
    { label: "Blogs", path: "/blogs" },
    { label: "Careers", path: "/careers" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "#contact" },
  ]

  const services = [
    { name: "Media & OTT", icon: "/icons/mediaott.svg", route: "/services/media-ott" },
    { name: "Food & Beverages", icon: "/icons/food.svg", route: "/services/food&beverages" },
    { name: "E-Commerce & Retail", icon: "/icons/ecommerce.svg", route: "/services/ecommerce&retail" },
    { name: "Travel & Hospitality", icon: "/icons/travel.svg", route: "/services/travel&hospitality" },
    { name: "EduTech", icon: "/icons/edutech.svg", route: "/services/edutech" },
    { name: "Banking & Financial Services", icon: "/icons/banking.svg", route: "/services/banking&financial" },
  ]

  const router = useRouter()
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  useEffect(() => {
    const currentIndex = NavbarItems.findIndex((item) => item.path === pathname)
    setActiveIndex(currentIndex)
  }, [pathname])

  const handleClick = (path: string, index: number) => {
    setActiveIndex(index)
    router.push(path)
    setIsMenuOpen(false)
  }

  const handleServiceClick = (route: string) => {
    router.push(route)
    setIsMenuOpen(false)
  }

  return (
    <nav className="m-4 md:m-0 p-4 py-4">
      <div className="flex justify-between items-center lg:justify-center lg:space-x-20">
        <div className="flex items-center">
          <Image
            src="/logos/logo.svg"
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
                className={`flex text-lg items-center gap-1 p-2 rounded-lg cursor-pointer transition duration-300 hover:text-[#6438C3] ${
                  activeIndex === index ? "text-[#6438C3] font-bold" : ""
                }`}
                onClick={() => handleClick(item.path, index)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="hidden lg:block bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white py-4 px-6 rounded-lg">
          Book a call
        </button>
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X color="#6438C3" size={24} /> : <Image src="/icons/hamburger.svg" alt="menu" width={24} height={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="space-y-3 lg:hidden mt-4">
          {NavbarItems.map((item, index) => (
            <div key={index}>
              {item.label === "Services" ? (
                <div>
                  <div
                    className={`flex text-lg items-center gap-1 p-2 rounded-lg cursor-pointer transition duration-300 hover:text-[#6438C3] ${
                      activeIndex === index ? "text-[#6438C3] font-bold" : ""
                    }`}
                    onClick={() => {
                      setIsServicesOpen(!isServicesOpen)
                    }}
                  >
                   
                    <span>{item.label}</span>
                    {item.icon}
                  </div>
                  {isServicesOpen && (
                    <div className="pl-4 space-y-2">
                      {services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 hover:text-[#6438C3] ${
                            pathname === service.route ? "text-[#6438C3] font-bold" : ""
                          }`}
                          onClick={() => handleServiceClick(service.route)}
                        >
                          <Image src={service.icon} alt={service.name} width={16} height={16} />
                          <span>{service.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`flex text-lg items-center gap-1 p-2 rounded-lg cursor-pointer transition duration-300 hover:text-[#6438C3] ${
                    activeIndex === index ? "text-[#6438C3] font-bold" : ""
                  }`}
                  onClick={() => handleClick(item.path, index)}
                >
                  <span>{item.label}</span>
                  {item.icon}
                </div>
              )}
            </div>
          ))}
          <button className="mt-4 w-full bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white py-4 px-6 rounded-lg">
            Book a call
          </button>
        </div>
      )}
    </nav>
  )
}
"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Feature {
  title: string
  description: string
  image: string
}

interface Section {
  id: number
  title: string
  subtitle: string
  features: Feature[]
}

export default function Page() {
  const [activeSection, setActiveSection] = useState(0)
  const [activeFeaturesMap, setActiveFeaturesMap] = useState<Record<number, number>>({})

  const sections: Section[] = [
    {
      id: 0,
      title: "Strategic Marketing Programs",
      subtitle: "We boost growth for travel and tourism platforms with targeted strategies",
      features: [
        {
          title: "Implement CLM strategies",
          description: "to boost engagement across travel discovery, booking, and loyalty stages.",
          image: "/components/fnb1.1.png",
        },
        {
          title: "Offer personalised travel packages & deals",
          description: "using tailored data segmentation based on traveler behavior, interests, and booking history.",
          image: "/components/fnb1.2.png",
        },
        {
          title: "Continuously refine loyalty initiatives",
          description: "with real-time booking insights, frequency tracking, and retention strategies.",
          image: "/components/fnb1.3.png",
        },
        {
          title: "More re-bookings with funnel optimisation",
          description: "by improving major customer touch-points & delivering personalized travel experiences.",
          image: "/components/fnb1.4.png",
        },
      ],
    },
    {
      id: 1,
      title: "MarTech audits and optimisation",
      subtitle: "We enhance traveler engagement through streamlined tech solutions",
      features: [
        {
          title: "Review MarTech and spot inefficiencies",
          description: "to maximise ROI on booking and travel campaigns and ensure smooth operations.",
          image: "/components/media&ott2.1.png",
        },
        {
          title: "Streamline bookings and increase CX",
          description: "with automated tools designed to optimise interactions and personalise user experiences.",
          image: "/components/media&ott2.2.png",
        },
        {
          title: "Transition effortlessly to advanced systems",
          description: "that enable scalable campaigns and in-depth analysis of guest behavior.",
          image: "/components/media&ott2.3.png",
        },
        {
          title: "Get an integrated dashboard",
          description: "that consolidates booking data, offers, and rewards programs to guide better decision-making.",
          image: "/components/media&ott2.4.png",
        },
      ],
    },
    {
      id: 2,
      title: "End-to-end campaign management",
      subtitle: "We manage campaigns to boost reservations and guest loyalty",
      features: [
        {
          title: "Execute and optimise travel campaigns",
          description: "using real-time analytics to increase bookings and CLTV.",
          image: "/components/media&ott3.0.png",
        },
        {
          title: "Add relevance & more loyalty enrollments",
          description: "with advanced testing like multi-variate and content personalisation.",
          image: "/components/media&ott3.1.png",
        },
        {
          title: "Run tailored campaigns",
          description: "based on traveler interests and booking behaviors to increase retention.",
          image: "/components/media&ott3.2.png",
        },
        {
          title: "Create SOPs and systems",
          description: "for scalable, consistent travel campaigns and seamless team coordination.",
          image: "/components/media&ott3.4.png",
        },
      ],
    },
  ];


  useEffect(() => {
    const initialMap: Record<number, number> = {};
    sections.forEach(section => {
      initialMap[section.id] = 0; // Set all sections to first feature
    });
    setActiveFeaturesMap(initialMap);
    setActiveSection(0); // First section active by default
  }, []);

  const handleSubtitleClick = (sectionId: number) => {
    setActiveSection(sectionId)
    setActiveFeaturesMap((prev) => ({
      ...prev,
      [sectionId]: (prev[sectionId] + 1) % sections[sectionId].features.length,
    }))
  }

  const renderSectionContent = (section: Section) => {
    const isMiddleSection = section.id === 1
    const activeFeatureIndex = activeFeaturesMap[section.id] ?? 0; // Default to 0 if undefined

    const imageComponent = (
      <motion.div
        key={`${section.id}-${activeFeatureIndex}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative h-[300px] rounded-lg order-last md:order-none"
      >
        <Image
          src={section.features[activeFeatureIndex].image || "/placeholder.svg"}
          alt={section.features[activeFeatureIndex].title}
          className="object-cover"
          priority
          height={500}
          width={500}
        />
      </motion.div>
    )

    const featuresComponent = (
      <div className="relative">
        <div className="hidden md:block absolute left-[1] top-0 w-1 h-full bg-purple-100 rounded-t-full rounded-b-full" />
        <div className="space-y-8">
          {section.features.map((feature, index) => {
            // Show first feature as active by default when section loads
            const isActive = (activeSection === section.id && activeFeatureIndex === index) ||
                           (index === 0 && activeFeaturesMap[section.id] === 0);

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }}
                className={`relative pl-6 cursor-pointer group ${
                  isActive
                    ? "bg-[#E2E9FF] rounded-lg p-3 md:py-3 md:bg-white"
                    : "bg-white md:bg-white"
                }`}
                onClick={() => {
                  setActiveSection(section.id)
                  setActiveFeaturesMap((prev) => ({
                    ...prev,
                    [section.id]: index,
                  }))
                }}
              >
                <div
                  className={`hidden md:block absolute left-0 top-0 w-1 h-full transition-all duration-300 rounded-t-full rounded-b-full ${
                    isActive ? "bg-[#6438C3]" : "bg-purple-100"
                  }`}
                />
                <div className="text-center md:text-left">
                  <h3
                    className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                      isActive
                        ? "text-[#555555] md:text-[#6438C3]"
                        : "text-[#555555] md:text-gray-800 group-hover:text-[#6438C3]"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className={`text-[#8C8C8C] ${
                      isActive ? "block" : "hidden md:block"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    )

    return (
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {isMiddleSection ? (
          <>
            <div className="order-last md:order-first">{imageComponent}</div>
            <div className="order-first md:order-last">{featuresComponent}</div>
          </>
        ) : (
          <>
            <div>{featuresComponent}</div>
            <div className="order-last md:order-none">{imageComponent}</div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {sections.map((section) => (
        <section key={section.id} className="py-10 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2
                className={`text-3xl font-bold mb-4 transition-colors duration-300 cursor-pointer ${
                  activeSection === section.id ? "md:text-[#6438C3]" : "text-gray-800 hover:text-[#6438C3]"
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </h2>
              <p
                className="text-gray-600 max-w-2xl mx-auto cursor-pointer hover:text-[#6438C3]"
                onClick={() => handleSubtitleClick(section.id)}
              >
                {section.subtitle}
              </p>
            </div>
            {renderSectionContent(section)}
          </div>
        </section>
      ))}
    </div>
  )
}
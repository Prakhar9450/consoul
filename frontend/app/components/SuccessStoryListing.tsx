"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import { Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import PublicSuccessStoryCard from "@/app/components/PublicSuccessStoryCard";

interface NumberItem {
  key: string;
  value: number;
}

interface HelpItem {
  key: string;
  value: string;
}

interface SuccessStory {
  id: string;
  title: string;
  thumbnailURL: string;
  clientName?: string;
  clientImageURL?: string;
  industry?: string;
  customIndustry?: string;
  topic?: string;
  customTopic?: string;
  service?: string;
  customService?: string;
  numbers: NumberItem[];
  keyChallenges: string[];
  howWeHelped: HelpItem[];
  feedback: string;
  createdAt: any;
  userId: string;
  tags?: string[];
}

const STORIES_PER_PAGE = 6;

export default function SuccessStoryListing() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Dynamic filter options
  const [industryOptions, setIndustryOptions] = useState<string[]>([]);
  const [topicOptions, setTopicOptions] = useState<string[]>([]);
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);

  // Filter states
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "successStories"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const stories: SuccessStory[] = [];

        let industries = new Set<string>();
        let topics = new Set<string>();
        let services = new Set<string>();

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Get display values for industry, topic, and service
          const displayIndustry =
            data.industry === "Other" && data.customIndustry
              ? data.customIndustry
              : data.industry;
          const displayTopic =
            data.topic === "Other" && data.customTopic
              ? data.customTopic
              : data.topic;
          const displayService =
            data.service === "Other" && data.customService
              ? data.customService
              : data.service;

          // Add new values to the sets
          if (displayIndustry) industries.add(displayIndustry);
          if (displayTopic) topics.add(displayTopic);
          if (displayService) services.add(displayService);

          stories.push({
            id: doc.id,
            title: data.title,
            thumbnailURL:
              data.thumbnailURL || "/placeholder.svg?height=400&width=600",
            tags: data.tags || generateRandomTags(),
            clientName: data.authorName,
            clientImageURL: data.authorImageURL,
            industry: displayIndustry,
            topic: displayTopic,
            service: displayService,
            numbers: data.numbers || [],
            keyChallenges: data.keyChallenges || [],
            howWeHelped: data.howWeHelped || [],
            feedback: data.feedback || "",
            createdAt: data.createdAt,
            userId: data.userId,
          });
        });

        setSuccessStories(stories);
        setIndustryOptions([...industries]);
        setTopicOptions([...topics]);
        setServiceOptions([...services]);
      } catch (error) {
        console.error("Error fetching success stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  // Helper function to generate random tags for demo purposes
  const generateRandomTags = () => {
    const allTags = [
      "digital marketing",
      "business intelligence",
      "AI tools",
      "data analytics",
      "lead gen",
      "customer lifecycle",
    ];
    return allTags.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  // Handle industry checkbox change
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  // Handle topic checkbox change
  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  // Handle service checkbox change
  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // Apply filters
  const applyFilters = () => {
    setFiltersApplied(true);
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedIndustries([]);
    setSelectedTopics([]);
    setSelectedServices([]);
    setFiltersApplied(false);
  };

  // Check if any filter is selected
  const isAnyFilterSelected =
    selectedIndustries.length > 0 ||
    selectedTopics.length > 0 ||
    selectedServices.length > 0;

  // Filter success stories based on search and selected filters
  const filterStories = (stories: SuccessStory[]) => {
    return stories.filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(search.toLowerCase()) ||
        story.feedback.toLowerCase().includes(search.toLowerCase()) ||
        story.keyChallenges.some((challenge) =>
          challenge.toLowerCase().includes(search.toLowerCase())
        ) ||
        story.howWeHelped.some(
          (item) =>
            item.key.toLowerCase().includes(search.toLowerCase()) ||
            item.value.toLowerCase().includes(search.toLowerCase())
        );

      if (!filtersApplied) return matchesSearch;

      return (
        matchesSearch &&
        (selectedIndustries.length === 0 ||
          selectedIndustries.includes(story.industry || "")) &&
        (selectedTopics.length === 0 ||
          selectedTopics.includes(story.topic || "")) &&
        (selectedServices.length === 0 ||
          selectedServices.includes(story.service || ""))
      );
    });
  };

  const filteredStories = filterStories(successStories);
  const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);
  const currentStories = filteredStories.slice(
    (currentPage - 1) * STORIES_PER_PAGE,
    currentPage * STORIES_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-row items-center gap-4 relative">
        <div className="relative flex-1">
          <Input
            placeholder="Search article with keyword, industry, title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-lg pl-6 pr-12 text-base w-full border-2 border-[#DAC8FF]"
          />
        </div>

        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`h-12 rounded-lg px-4 flex items-center gap-2 ${
            isFilterOpen
              ? "bg-[#a47ef6] text-[#ffffff] hover:bg-[#8b6ff3]"
              : "bg-[#6438c3] text-[#ffffff] hover:bg-[#5429B3]"
          }`}>
          Filter <Filter className="h-4 w-4" />
        </Button>

        {/* Filter Dropdown */}
        {isFilterOpen && (
          <div
            ref={filterRef}
            className="absolute right-0 top-full mt-2 w-full md:w-[800px] bg-white shadow-lg rounded-lg z-10 p-6"
            style={{ maxWidth: "calc(100vw - 2rem)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Industry */}
              <div>
                <h3 className="font-medium mb-4 text-[#4f4f4f]">Industry</h3>
                <div className="space-y-3">
                  {industryOptions
                    .slice()
                    .reverse()
                    .map((industry) => (
                      <label key={industry} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedIndustries.includes(industry)}
                          onChange={() => handleIndustryChange(industry)}
                          className="h-4 w-4 rounded border-gray-300 text-[#DAC8FF] focus:ring-[#DAC8FF] checked:bg-[#B881FF] checked:border-[#B881FF]"
                        />

                        <span className="text-[#555555]">{industry}</span>
                      </label>
                    ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <h3 className="font-medium mb-4 text-[#4f4f4f]">Topic</h3>
                <div className="space-y-3">
                  {topicOptions
                    .slice()
                    .reverse()
                    .map((topic) => (
                      <label key={topic} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic)}
                          onChange={() => handleTopicChange(topic)}
                          className="h-4 w-4 rounded border-gray-300 text-[#DAC8FF] focus:ring-[#DAC8FF] checked:bg-[#B881FF] checked:border-[#B881FF]"
                        />
                        <span className="text-[#555555]">{topic}</span>
                      </label>
                    ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-medium mb-4 text-[#4f4f4f]">Services</h3>
                <div className="space-y-3">
                  {serviceOptions
                    .slice()
                    .reverse()
                    .map((service) => (
                      <label key={service} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="h-4 w-4 rounded border-gray-300 text-[#DAC8FF] focus:ring-[#DAC8FF] checked:bg-[#B881FF] checked:border-[#B881FF]"
                        />
                        <span className="text-[#555555]">{service}</span>
                      </label>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-4 mt-6">
              <Button
                onClick={applyFilters}
                className="bg-[#6438C3] text-white hover:bg-[#5429B3]"
                disabled={!isAnyFilterSelected}>
                Apply filter
              </Button>
              <button
                onClick={resetFilters}
                className="text-[#9a9a9a]"
                disabled={!isAnyFilterSelected}>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Close filter modal on outside click */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Applied Filters */}
      {filtersApplied && isAnyFilterSelected && (
        <div className="mb-6 flex flex-wrap gap-2">
          {selectedIndustries.map((industry) => (
            <div
              key={industry}
              className="flex items-center gap-1 bg-[#EBE2FF] text-[#6438C3] px-3 py-1 rounded-full text-sm">
              {industry}
              <button
                onClick={() => {
                  setSelectedIndustries((prev) =>
                    prev.filter((i) => i !== industry)
                  );
                  if (
                    selectedIndustries.length === 1 &&
                    selectedTopics.length === 0 &&
                    selectedServices.length === 0
                  ) {
                    setFiltersApplied(false);
                  }
                }}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedTopics.map((topic) => (
            <div
              key={topic}
              className="flex items-center gap-1 bg-[#EBE2FF] text-[#6438C3] px-3 py-1 rounded-full text-sm">
              {topic}
              <button
                onClick={() => {
                  setSelectedTopics((prev) => prev.filter((t) => t !== topic));
                  if (
                    selectedIndustries.length === 0 &&
                    selectedTopics.length === 1 &&
                    selectedServices.length === 0
                  ) {
                    setFiltersApplied(false);
                  }
                }}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedServices.map((service) => (
            <div
              key={service}
              className="flex items-center gap-1 bg-[#EBE2FF] text-[#6438C3] px-3 py-1 rounded-full text-sm">
              {service}
              <button
                onClick={() => {
                  setSelectedServices((prev) =>
                    prev.filter((s) => s !== service)
                  );
                  if (
                    selectedIndustries.length === 0 &&
                    selectedTopics.length === 0 &&
                    selectedServices.length === 1
                  ) {
                    setFiltersApplied(false);
                  }
                }}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline">
            Clear all
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            No success stories found
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2">
            {currentStories.map((story) => (
              <PublicSuccessStoryCard key={story.id} story={story} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}>
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

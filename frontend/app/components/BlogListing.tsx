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
import PublicBlogCard from "@/app/components/PublicBlogCard";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: any;
  userId: string;
  tags?: string[];
  authorName?: string;
  authorImageURL?: string;
  industry?: string;
  customIndustry?: string;
  topic?: string;
  customTopic?: string;
  service?: string;
  customService?: string;
  thumbnailUrl?: string;
  imagesUrl?: string;
}

const POSTS_PER_PAGE = 6;

// Industry options
const INDUSTRY_OPTIONS = [
  "Banking",
  "E-commerce",
  "Retail",
  "Food & beverages",
  "Lifestyle",
  "Media & OTT",
  "Technology",
  "Travel & hospitality",
];

// Topic options
const TOPIC_OPTIONS = [
  "Customer lifetime value",
  "Product & tech",
  "Omni-channel marketing",
  "Hyper-personalisation",
  "Customer advocacy",
];

// Service options
const SERVICE_OPTIONS = [
  "Program management",
  "MarTech audit and setup",
  "On-demand campaign management",
];

export default function BlogListing() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

        const querySnapshot = await getDocs(q);
        const posts: BlogPost[] = [];

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

          posts.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            content: data.content,
            createdAt: data.createdAt,
            userId: data.userId,
            tags: data.tags || generateRandomTags(), // Use tags if available or generate random ones
            authorName: data.authorName,
            authorImageURL: data.authorImageURL,
            industry: displayIndustry,
            topic: displayTopic,
            service: displayService,
            thumbnailUrl: data.thumbnailUrl || "",
            imagesUrl: data.imagesUrl || "",
          });
        });

        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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

    // Randomly select 1-3 tags
    const numTags = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numTags);
  };

  // Handle click outside to close filter
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter posts based on search and selected filters
  const filterPosts = (posts: BlogPost[]) => {
    return posts.filter((post) => {
      // Search filter
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());

      // If no filters are applied, just use search
      if (!filtersApplied) return matchesSearch;

      // Check if post matches any of the selected filters
      const matchesIndustry =
        selectedIndustries.length === 0 ||
        (post.industry && selectedIndustries.includes(post.industry));

      const matchesTopic =
        selectedTopics.length === 0 ||
        (post.topic && selectedTopics.includes(post.topic));

      const matchesService =
        selectedServices.length === 0 ||
        (post.service && selectedServices.includes(post.service));

      // If any filter category has selections, the post must match at least one selection in that category
      return matchesSearch && matchesIndustry && matchesTopic && matchesService;
    });
  };

  const filteredPosts = filterPosts(blogPosts);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedIndustries,
    selectedTopics,
    selectedServices,
    filtersApplied,
  ]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-row items-center gap-4 relative">
        <div className="relative flex-1">
          <Input
            placeholder="Search article with keyword, industry, title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-lg pl-6 pr-12 text-base w-full"
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
            className="absolute right-0 top-full mt-2 w-full md:w-[800px] bg-white shadow-lg rounded-lg z-10 p-6 border"
            style={{ maxWidth: "calc(100vw - 2rem)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Industry */}
              <div>
                <h3 className="font-medium mb-4">Industry</h3>
                <div className="space-y-3">
                  {INDUSTRY_OPTIONS.map((industry) => (
                    <label key={industry} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(industry)}
                        onChange={() => handleIndustryChange(industry)}
                        className="h-4 w-4 rounded border-gray-300 text-[#6438C3] focus:ring-[#6438C3]"
                      />
                      <span>{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <h3 className="font-medium mb-4">Topic</h3>
                <div className="space-y-3">
                  {TOPIC_OPTIONS.map((topic) => (
                    <label key={topic} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                        className="h-4 w-4 rounded border-gray-300 text-[#6438C3] focus:ring-[#6438C3]"
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-medium mb-4">Services</h3>
                <div className="space-y-3">
                  {SERVICE_OPTIONS.map((service) => (
                    <label key={service} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceChange(service)}
                        className="h-4 w-4 rounded border-gray-300 text-[#6438C3] focus:ring-[#6438C3]"
                      />
                      <span>{service}</span>
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
              <Button
                onClick={resetFilters}
                variant="outline"
                className="text-gray-600"
                disabled={!isAnyFilterSelected}>
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>

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
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No blog posts found</p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2">
            {currentPosts.map((post) => (
              <PublicBlogCard key={post.id} post={post} />
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

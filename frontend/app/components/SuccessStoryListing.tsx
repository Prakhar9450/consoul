"use client";

import { useState, useEffect } from "react";
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
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [filterValue, setFilterValue] = useState("all");
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

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

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          stories.push({
            id: doc.id,
            title: data.title,
            thumbnailURL:
              data.thumbnailURL || "/placeholder.svg?height=400&width=600",
            numbers: data.numbers || [],
            keyChallenges: data.keyChallenges || [],
            howWeHelped: data.howWeHelped || [],
            feedback: data.feedback || "",
            createdAt: data.createdAt,
            userId: data.userId,
            tags: generateTagsFromData(data),
          });
        });

        setSuccessStories(stories);
      } catch (error) {
        console.error("Error fetching success stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  // Generate tags from success story data
  const generateTagsFromData = (data: any) => {
    const tags: string[] = [];

    // Add tags based on key challenges
    if (data.keyChallenges && data.keyChallenges.length > 0) {
      data.keyChallenges.forEach((challenge: string) => {
        const words = challenge.split(" ");
        if (words.length > 0 && !tags.includes(words[0].toLowerCase())) {
          tags.push(words[0].toLowerCase());
        }
      });
    }

    // Add tags based on how we helped
    if (data.howWeHelped && data.howWeHelped.length > 0) {
      data.howWeHelped.forEach((item: HelpItem) => {
        if (item.key && !tags.includes(item.key.toLowerCase())) {
          tags.push(item.key.toLowerCase());
        }
      });
    }

    // If no tags were generated, use some default ones
    if (tags.length === 0) {
      const defaultTags = [
        "strategy",
        "marketing",
        "growth",
        "conversion",
        "customer",
        "retention",
      ];

      // Randomly select 1-3 tags
      const numTags = Math.floor(Math.random() * 3) + 1;
      const shuffled = [...defaultTags].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numTags);
    }

    return tags;
  };

  // Filter success stories based on search and filter value
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

      if (filterValue === "all") return matchesSearch;

      // Check if any tag matches the filter value
      const matchesFilter = story.tags?.some((tag) =>
        tag.toLowerCase().includes(filterValue.toLowerCase())
      );

      return matchesSearch && matchesFilter;
    });
  };

  const filteredStories = filterStories(successStories);
  const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);
  const currentStories = filteredStories.slice(
    (currentPage - 1) * STORIES_PER_PAGE,
    currentPage * STORIES_PER_PAGE
  );

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterValue]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-row items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search success stories and resources"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-lg pl-6 pr-12 text-base w-full"
          />
        </div>
        <Select value={filterValue} onValueChange={setFilterValue}>
          <SelectTrigger className="h-12 w-[100px] sm:w-[140px] rounded-lg border-2 bg-[#6438C3] text-white px-2 sm:px-4 flex-shrink-0">
            <Filter className="mr-1 sm:mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="strategy">Strategy</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
            <SelectItem value="conversion">Conversion</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="retention">Retention</SelectItem>
          </SelectContent>
        </Select>
      </div>

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

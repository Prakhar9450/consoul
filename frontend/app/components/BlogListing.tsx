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
import PublicBlogCard from "@/app/components/PublicBlogCard";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: any;
  userId: string;
  tags?: string[];
  thumbnailUrl?: string;
  imagesUrl?: string;
}

const POSTS_PER_PAGE = 6;

export default function BlogListing() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("all");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

        const querySnapshot = await getDocs(q);
        const posts: BlogPost[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          posts.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            content: data.content,
            createdAt: data.createdAt,
            userId: data.userId,
            tags: data.tags || generateRandomTags(), // Use tags if available or generate random ones
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

  // Filter posts based on search and filter value
  const filterPosts = (posts: BlogPost[]) => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());

      if (filterValue === "all") return matchesSearch;

      // Check if any tag matches the filter value
      const matchesFilter = post.tags?.some((tag) =>
        tag.toLowerCase().includes(filterValue.toLowerCase())
      );

      return matchesSearch && matchesFilter;
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
  }, [search, filterValue]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-row items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search articles and resources"
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
            <SelectItem value="digital marketing">Digital Marketing</SelectItem>
            <SelectItem value="business intelligence">
              Business Intelligence
            </SelectItem>
            <SelectItem value="AI tools">AI Tools</SelectItem>
            <SelectItem value="data analytics">Data Analytics</SelectItem>
          </SelectContent>
        </Select>
      </div>

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

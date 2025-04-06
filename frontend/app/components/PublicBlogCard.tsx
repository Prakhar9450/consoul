"use client";
import { useCallback, useRef } from "react";
import { useMousePosition } from "@/app/hooks/use-mouse-position";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: any;
  userId: string;
  authorName?: string;
  authorImageURL?: string;
  industry?: string;
  customIndustry?: string;
  topic?: string;
  customTopic?: string;
  service?: string;
  customService?: string;
  tags?: string[];
  thumbnailUrl?: string;
  imagesUrl?: string;
}

interface PublicBlogCardProps {
  post: BlogPost;
}

export default function PublicBlogCard({ post }: PublicBlogCardProps) {
  const formattedDate = post.createdAt
    ? new Date(post.createdAt.toDate()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recent post";

  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Add cursor tracker refs
  const divRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  // Add update callback for cursor position
  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    // We need to offset the position to center the info div
    const offsetX = (infoRef.current?.offsetWidth || 0) / 2;
    const offsetY = (infoRef.current?.offsetHeight || 0) / 2;
    // Use CSS variables to position the info div instead of state to avoid re-renders
    infoRef.current?.style.setProperty("--x", `${x - offsetX}px`);
    infoRef.current?.style.setProperty("--y", `${y - offsetY}px`);
  }, []);
  
  // Use the mouse position hook
  //@ts-ignore
  useMousePosition(divRef, update);

  return (
    <div 
      ref={divRef}
      className="flex flex-col relative group cursor-none"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="overflow-hidden rounded-lg">
          {post.thumbnailUrl ? (
            <div className="relative h-[250px] w-full">
              <img
                src={post.thumbnailUrl || "/placeholder.svg"}
                alt={post.title}
                className="h-[250px] w-full object-cover cursor-none transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="h-[250px] w-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image Available
            </div>
          )}
        </div>
      

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground w-full cursor-none">
          <span>{formattedDate}</span>
          <span>{readTime} mins read</span>
        </div>

        <Link href={`/blog/${post.id}`} className="block">
          <h3 className="text-xl font-semibold leading-tight hover:text-primary transition-colors cursor-none">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground line-clamp-2 cursor-none">{post.description}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block rounded-full px-3 py-1 text-xs bg-slate-100 text-slate-700 cursor-none">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Cursor tracker info box */}
      <div
        ref={infoRef}
        style={{
          transform: "translate(var(--x), var(--y))",
        }}
        className="pointer-events-none absolute left-0 top-0 z-50 rounded-full bg-blue-800/80 px-4 py-2 text-sm font-bold text-white opacity-0 duration-0 group-hover:opacity-100"
      >
        Read more &rarr;
      </div>
      </Link>
    </div>
  );
}
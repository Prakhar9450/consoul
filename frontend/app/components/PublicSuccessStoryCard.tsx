"use client";
import { useCallback, useRef } from "react";
import { useMousePosition } from "@/app/hooks/use-mouse-position";
import Image from "next/image";
import Link from "next/link";

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
  company?: string;
  numbers: NumberItem[];
  keyChallenges: string[];
  howWeHelped: HelpItem[];
  feedback: string;
  createdAt: any;
  userId: string;
  tags?: string[];
}

interface PublicSuccessStoryCardProps {
  story: SuccessStory;
}

export default function PublicSuccessStoryCard({
  story,
}: PublicSuccessStoryCardProps) {
  // Format the date
  const formattedDate = story.createdAt
    ? new Date(story.createdAt.toDate()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Sept 27, 2023";

  // Calculate read time based on content length (roughly 200 words per minute)
  const contentLength =
    story.feedback.split(/\s+/).length +
    story.keyChallenges.reduce(
      (acc, challenge) => acc + challenge.split(/\s+/).length,
      0
    ) +
    story.howWeHelped.reduce(
      (acc, item) =>
        acc + item.key.split(/\s+/).length + item.value.split(/\s+/).length,
      0
    );

  const readTime = Math.max(1, Math.ceil(contentLength / 200));

  // Get the first key challenge as a description
  const description =
    story.keyChallenges.length > 0
      ? story.keyChallenges[0]
      : "A success story showcasing our effective solutions.";

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
      <Link href={`/success-story/${story.id}`} className="cursor-none">
        <div className="overflow-hidden rounded-lg cursor-none">
          <Image
            src={story.thumbnailURL || "/placeholder.svg?height=400&width=600"}
            alt={story.title}
            width={600}
            height={400}
            className="h-[250px] w-full object-cover transition-transform duration-300 hover:scale-105 cursor-none"
          />
        </div>
      </Link>

      <div className="mt-4 space-y-2 cursor-none">
        <div className="flex items-center text-sm text-muted-foreground cursor-none">
          <span className="cursor-none">{formattedDate}</span>
          <span className="mx-2 cursor-none">•</span>
          <span className="cursor-none">{readTime} mins read</span>
        </div>

        <Link href={`/success-story/${story.id}`} className="block cursor-none">
          <h3 className="text-xl font-semibold leading-tight hover:text-primary transition-colors cursor-none">
            {story.title}
          </h3>
        </Link>

        <p className="text-muted-foreground line-clamp-2 cursor-none">{description}</p>

        <Link href={`/success-story/${story.id}`} className="block cursor-none">
          <h4 className="text-lg font-medium text-primary hover:text-primary-dark transition-colors cursor-none">
            {story.company}
          </h4>
        </Link>

        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 cursor-none">
            {story.tags.map((tag, index) => (
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
    </div>
  );
}
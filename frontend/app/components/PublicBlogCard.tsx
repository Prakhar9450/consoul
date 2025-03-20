"use client";
import Link from "next/link";

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

  return (
    <div className="flex flex-col">
      <Link href={`/blog/${post.id}`}>
        <div className="overflow-hidden rounded-lg">
          {post.thumbnailUrl ? (
            <div className="relative h-[400px] w-full">
              <img
                src={post.thumbnailUrl || "/placeholder.svg"}
                alt={post.title}
                className="h-[400px] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="h-[400px] w-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image Available
            </div>
          )}
        </div>
      </Link>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{readTime} mins read</span>
        </div>

        <Link href={`/blog/${post.id}`} className="block">
          <h3 className="text-xl font-semibold leading-tight hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground line-clamp-2">{post.description}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block rounded-full px-3 py-1 text-xs bg-slate-100 text-slate-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

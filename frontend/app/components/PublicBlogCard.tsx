"use client";
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

  return (
    <div className="flex flex-col">
      <Link href={`/blog/${post.id}`}>
        <div className="overflow-hidden rounded-lg">
          {post.thumbnailUrl ? (
            <div className="relative h-[250px] w-full">
              <img
                src={post.thumbnailUrl || "/placeholder.svg"}
                alt={post.title}
                className="h-[250px] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="h-[250px] w-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image Available
            </div>
          )}
        </div>
      </Link>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground w-full">
          <span>{formattedDate}</span>
          <span>{readTime} mins read</span>
        </div>

        <Link href={`/blog/${post.id}`} className="block">
          <h3 className="text-xl font-semibold leading-tight hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground line-clamp-2">{post.description}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-2 items-center">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block rounded-full px-3 py-1 text-sm bg-slate-100 text-slate-700">
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-sm text-slate-500">
                + {post.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/app/lib/data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group overflow-hidden border-none bg-transparent shadow-none">
      <Link href={`/blog/${post.id}`}>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={400}
            height={200}
            className="aspect-[2/1] w-full object-cover"
          />
        </div>
      </Link>
      <CardContent className="mt-4 space-y-2 p-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <Link href={`/blog/${post.id}`}>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {post.title}
          </h2>
        </Link>
        <p className="text-base text-muted-foreground">{post.description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-md bg-transparent px-3 py-1 text-sm font-normal text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

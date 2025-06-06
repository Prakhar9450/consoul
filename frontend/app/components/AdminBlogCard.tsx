"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    description: string;
    content: string;
    createdAt: any;
    thumbnailUrl: string;
    imagesUrl: string;
    authorName?: string;
    authorImageURL?: string;
    industry?: string;
    customIndustry?: string;
    topic?: string;
    customTopic?: string;
    service?: string;
    customService?: string;
  };
  onDelete: () => void;
}

export default function AdminBlogCard({ blog, onDelete }: BlogCardProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt.toDate()).toLocaleDateString()
    : "Just now";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            {blog.authorImageURL && (
              <Image
                src={blog.authorImageURL || "/placeholder.svg"}
                alt={blog.authorName || "Author"}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-sm font-medium">
              {blog.authorName || "Anonymous"}
            </span>
          </div>
          <div>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-destructive">
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <img src={blog.thumbnailUrl} alt="Thumbnail" className="mb-2" />
        <p className="text-muted-foreground mb-2">{blog.description}</p>
        <p className={expanded ? "" : "line-clamp-3"}>{blog.content}</p>
        {blog.imagesUrl && (
          <img src={blog.imagesUrl} alt="Images" className="mt-2" />
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push(`/blog/${blog.id}`)}>
          Read More
        </Button>
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "Expand"}
        </Button>
      </CardFooter>
    </Card>
  );
}

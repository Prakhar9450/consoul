"use client";

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
import Link from "next/link";
import { useState } from "react";

interface NumberItem {
  key: string;
  value: number;
}

interface HelpItem {
  key: string;
  value: string;
}

interface SuccessStoryCardProps {
  story: {
    id: string;
    title: string;
    thumbnailURL: string;
    company: string;
    numbers: NumberItem[];
    keyChallenges: string[];
    howWeHelped: HelpItem[];
    feedback: string;
    createdAt: any;
  };
  onDelete: () => void;
}

export default function AdminSuccessStoryCard({
  story,
  onDelete,
}: SuccessStoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const formattedDate = story.createdAt
    ? new Date(story.createdAt.toDate()).toLocaleDateString()
    : "Just now";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{story.title}</CardTitle>
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
      <CardContent className="space-y-4">
        {/* Thumbnail */}
        <div className="aspect-video overflow-hidden rounded-md">
          <Image
            src={story.thumbnailURL || "/placeholder.svg?height=400&width=600"}
            alt={story.title}
            width={600}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Company */}
        <h4 className="font-medium mb-2">Company Name:</h4>
        <p className="text-muted-foreground mb-2">{story.company}</p>

        {expanded && (
          <>
            {/* Numbers */}
            {story.numbers.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Key Numbers:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {story.numbers.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{item.key}:</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Challenges */}
            {story.keyChallenges.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Key Challenges:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {story.keyChallenges.map((challenge, index) => (
                    <li key={index} className="text-sm">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How We Helped */}
            {story.howWeHelped.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">How We Helped:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {story.howWeHelped.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{item.key}:</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            <div>
              <h4 className="font-medium mb-2">Client Feedback:</h4>
              <p className="text-sm italic">"{story.feedback}"</p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/success-story/${story.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Read More
          </Button>
        </Link>
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

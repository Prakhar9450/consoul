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
import { Trash2, MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface CareerCardProps {
  career: {
    id: string;
    title: string;
    category: string;
    customCategory?: string;
    position: string;
    customLocation?: string;
    type: string;
    link: string;
    createdAt: any;
  };
  onDelete: () => void;
}

export default function AdminCareerCard({ career, onDelete }: CareerCardProps) {
  const formattedDate = career.createdAt
    ? new Date(career.createdAt.toDate()).toLocaleDateString()
    : "Just now";

  const displayCategory =
    career.category === "Other" && career.customCategory
      ? career.customCategory
      : career.category;

  const displayLocation =
    career.position === "Onsite" && career.customLocation
      ? career.customLocation
      : career.position;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{career.title}</CardTitle>
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
        <div className="text-sm font-medium text-[#6438C3]">
          {displayCategory}
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{displayLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{career.type}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={career.link} target="_blank" className="w-full">
          <Button variant="outline" className="w-full">
            View Job
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

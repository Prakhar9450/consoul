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
import { Trash2, FileText, LinkIcon } from "lucide-react";

interface PdfCardProps {
  document: {
    id: string;
    type: string;
    title: string;
    link: string;
    createdAt: any;
  };
  onDelete: () => void;
}

export default function PdfCard({ document, onDelete }: PdfCardProps) {
  const formattedDate = document.createdAt
    ? new Date(document.createdAt.toDate()).toLocaleDateString()
    : "Just now";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-full px-2.5 py-0.5 text-xs bg-purple-100 text-purple-800">
                {document.type}
              </span>
            </div>
            <CardTitle className="mt-2">{document.title}</CardTitle>
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
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>PDF Document</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground mt-2">
          <LinkIcon className="h-4 w-4" />
          <a
            href={document.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm truncate hover:text-primary">
            {document.link}
          </a>
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={document.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full">
          <Button variant="outline" className="w-full">
            View Link
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PdfCard from "@/app/components/PdfCard";

interface PdfDocument {
  id: string;
  type: string;
  title: string;
  link: string;
  createdAt: any;
}

export default function PdfDashboard({ user }: { user: any }) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [pdfDocuments, setPdfDocuments] = useState<PdfDocument[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPdfDocuments = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "pdfDocuments"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const documentList: PdfDocument[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        documentList.push({
          id: doc.id,
          type: data.type,
          title: data.title,
          link: data.link,
          createdAt: data.createdAt,
        });
      });

      setPdfDocuments(documentList);
    } catch (error: any) {
      setError("Failed to fetch PDF documents");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfDocuments();
  }, [user.uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validate inputs
    if (!type) {
      setError("Type is required");
      setIsSubmitting(false);
      return;
    }

    if (!title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    if (!link.trim()) {
      setError("Link is required");
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if a document with the same type already exists
      const existingDocRef = query(
        collection(db, "pdfDocuments"),
        where("userId", "==", user.uid),
        where("type", "==", type)
      );
      const existingDocSnapshot = await getDocs(existingDocRef);

      // If exists, delete the existing document
      if (!existingDocSnapshot.empty) {
        const existingDocId = existingDocSnapshot.docs[0].id;
        await deleteDoc(doc(db, "pdfDocuments", existingDocId));
      }

      // Add the new document
      await addDoc(collection(db, "pdfDocuments"), {
        userId: user.uid,
        type,
        title,
        link,
        createdAt: serverTimestamp(),
      });

      // Clear form
      setType("");
      setTitle("");
      setLink("");

      // Refresh PDF documents
      fetchPdfDocuments();
    } catch (error: any) {
      setError(error.message || "Failed to create PDF document");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      await deleteDoc(doc(db, "pdfDocuments", documentId));
      setPdfDocuments(
        pdfDocuments.filter((document) => document.id !== documentId)
      );
    } catch (error: any) {
      setError("Failed to delete PDF document");
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add PDF Document</CardTitle>
          <CardDescription>
            Upload PDF documents for users to download
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Home page">Home page</SelectItem>
                  <SelectItem value="Media & OTT">Media & OTT</SelectItem>
                  <SelectItem value="Food & Beverages">
                    Food & Beverages
                  </SelectItem>
                  <SelectItem value="E-commerce & Retail">
                    E-commerce & Retail
                  </SelectItem>
                  <SelectItem value="Travel & Hospitality">
                    Travel & Hospitality
                  </SelectItem>
                  <SelectItem value="EduTech">EduTech</SelectItem>
                  <SelectItem value="Banking & Financial Services">
                    Banking & Financial Services
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                required
              />
            </div>

            {/* Link */}
            <div className="space-y-2">
              <Label htmlFor="link">Download Link</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter document download link"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add PDF Document"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your PDF Documents</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : pdfDocuments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            You haven't added any PDF documents yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {pdfDocuments.map((document) => (
              <PdfCard
                key={document.id}
                document={document}
                onDelete={() => handleDelete(document.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

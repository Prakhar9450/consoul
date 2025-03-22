"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
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
import { auth, db } from "@/app/lib/firebaseConfig";
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
import AdminCareerCard from "@/app/components/AdminCareerCard";

interface Career {
  id: string;
  title: string;
  category: string;
  customCategory?: string;
  position: string;
  customLocation?: string;
  type: string;
  link: string;
  createdAt: any;
}

export default function CareerDashboard({ user }: { user: any }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [position, setPosition] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [careers, setCareers] = useState<Career[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCareers = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "careers"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const careerList: Career[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        careerList.push({
          id: doc.id,
          title: data.title,
          category: data.category,
          customCategory: data.customCategory,
          position: data.position,
          customLocation: data.customLocation,
          type: data.type,
          link: data.link,
          createdAt: data.createdAt,
        });
      });

      setCareers(careerList);
    } catch (error: any) {
      setError("Failed to fetch career opportunities");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, [user.uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!category) {
      setError("Category is required");
      return;
    }

    if (category === "Other" && !customCategory.trim()) {
      setError("Please specify a category");
      return;
    }

    if (!position) {
      setError("Position is required");
      return;
    }

    if (position === "Onsite" && !customLocation.trim()) {
      setError("Location is required for onsite positions");
      return;
    }

    if (!type) {
      setError("Type is required");
      return;
    }

    if (!link.trim()) {
      setError("Link is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "careers"), {
        userId: user.uid,
        title,
        category: category === "Other" ? "Other" : category,
        customCategory: category === "Other" ? customCategory : null,
        position,
        customLocation: position === "Onsite" ? customLocation : null,
        type,
        link,
        createdAt: serverTimestamp(),
      });

      // Clear form
      setTitle("");
      setCategory("");
      setCustomCategory("");
      setPosition("");
      setCustomLocation("");
      setType("");
      setLink("");

      // Refresh careers
      fetchCareers();
    } catch (error: any) {
      setError(error.message || "Failed to create career opportunity");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (careerId: string) => {
    try {
      await deleteDoc(doc(db, "careers", careerId));
      setCareers(careers.filter((career) => career.id !== careerId));
    } catch (error: any) {
      setError("Failed to delete career opportunity");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError("Failed to log out");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Career Opportunity Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create New Career Opportunity</CardTitle>
          <CardDescription>
            Post job openings and career opportunities
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter job title"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Strategy">Strategy</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              {category === "Other" && (
                <div className="mt-2">
                  <Input
                    placeholder="Specify category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                </SelectContent>
              </Select>

              {position === "Onsite" && (
                <div className="mt-2">
                  <Input
                    placeholder="Enter location"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Link */}
            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter job posting link"
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
              {isSubmitting ? "Posting..." : "Post Career Opportunity"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Career Opportunities</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : careers.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            You haven't created any career opportunities yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {careers.map((career) => (
              <AdminCareerCard
                key={career.id}
                career={career}
                onDelete={() => handleDelete(career.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

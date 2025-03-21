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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus, X } from "lucide-react";
import SuccessStoryCard from "@/app/components/AdminSuccessStoryCard";

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
  numbers: NumberItem[];
  keyChallenges: string[];
  howWeHelped: HelpItem[];
  feedback: string;
  createdAt: any;
}

export default function SuccessStoryDashboard({ user }: { user: any }) {
  const [title, setTitle] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [numbers, setNumbers] = useState<NumberItem[]>([{ key: "", value: 0 }]);
  const [keyChallenges, setKeyChallenges] = useState<string[]>([""]);
  const [howWeHelped, setHowWeHelped] = useState<HelpItem[]>([
    { key: "", value: "" },
  ]);
  const [feedback, setFeedback] = useState("");
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSuccessStories = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "successStories"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const storyList: SuccessStory[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        storyList.push({
          id: doc.id,
          title: data.title,
          thumbnailURL: data.thumbnailURL,
          numbers: data.numbers,
          keyChallenges: data.keyChallenges,
          howWeHelped: data.howWeHelped,
          feedback: data.feedback,
          createdAt: data.createdAt,
        });
      });

      setSuccessStories(storyList);
    } catch (error: any) {
      setError("Failed to fetch success stories");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuccessStories();
  }, [user.uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!thumbnailURL.trim()) {
      setError("Thumbnail URL is required");
      return;
    }

    // Validate numbers
    const validNumbers = numbers.filter(
      (item) => item.key.trim() !== "" && item.value >= 0
    );
    if (validNumbers.length === 0) {
      setError("At least one valid number is required");
      return;
    }

    // Validate key challenges
    const validChallenges = keyChallenges.filter((item) => item.trim() !== "");
    if (validChallenges.length === 0) {
      setError("At least one key challenge is required");
      return;
    }

    // Validate how we helped
    const validHelp = howWeHelped.filter(
      (item) => item.key.trim() !== "" && item.value.trim() !== ""
    );
    if (validHelp.length === 0) {
      setError("At least one 'How We Helped' item is required");
      return;
    }

    if (!feedback.trim()) {
      setError("Feedback is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "successStories"), {
        userId: user.uid,
        title,
        thumbnailURL,
        numbers: validNumbers,
        keyChallenges: validChallenges,
        howWeHelped: validHelp,
        feedback,
        createdAt: serverTimestamp(),
      });

      // Clear form
      setTitle("");
      setThumbnailURL("");
      setNumbers([{ key: "", value: 0 }]);
      setKeyChallenges([""]);
      setHowWeHelped([{ key: "", value: "" }]);
      setFeedback("");

      // Refresh success stories
      fetchSuccessStories();
    } catch (error: any) {
      setError(error.message || "Failed to create success story");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (storyId: string) => {
    try {
      await deleteDoc(doc(db, "successStories", storyId));
      setSuccessStories(successStories.filter((story) => story.id !== storyId));
    } catch (error: any) {
      setError("Failed to delete success story");
    }
  };

  // Handle numbers array
  const handleNumberChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newNumbers = [...numbers];
    if (field === "key") {
      newNumbers[index].key = value;
    } else {
      newNumbers[index].value = Number.parseInt(value) || 0;
    }
    setNumbers(newNumbers);
  };

  const addNumber = () => {
    setNumbers([...numbers, { key: "", value: 0 }]);
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 1) {
      const newNumbers = [...numbers];
      newNumbers.splice(index, 1);
      setNumbers(newNumbers);
    }
  };

  // Handle key challenges array
  const handleChallengeChange = (index: number, value: string) => {
    const newChallenges = [...keyChallenges];
    newChallenges[index] = value;
    setKeyChallenges(newChallenges);
  };

  const addChallenge = () => {
    setKeyChallenges([...keyChallenges, ""]);
  };

  const removeChallenge = (index: number) => {
    if (keyChallenges.length > 1) {
      const newChallenges = [...keyChallenges];
      newChallenges.splice(index, 1);
      setKeyChallenges(newChallenges);
    }
  };

  // Handle how we helped array
  const handleHelpChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newHelp = [...howWeHelped];
    if (field === "key") {
      newHelp[index].key = value;
    } else {
      newHelp[index].value = value;
    }
    setHowWeHelped(newHelp);
  };

  const addHelp = () => {
    setHowWeHelped([...howWeHelped, { key: "", value: "" }]);
  };

  const removeHelp = (index: number) => {
    if (howWeHelped.length > 1) {
      const newHelp = [...howWeHelped];
      newHelp.splice(index, 1);
      setHowWeHelped(newHelp);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Success Story Post</CardTitle>
          <CardDescription>
            Share your success stories with the world
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Title and Thumbnail URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter success story title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnailURL">Thumbnail URL</Label>
                <Input
                  id="thumbnailURL"
                  value={thumbnailURL}
                  onChange={(e) => setThumbnailURL(e.target.value)}
                  placeholder="Enter image URL for thumbnail"
                  required
                />
              </div>
            </div>

            {/* Numbers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Numbers</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addNumber}
                  className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add More
                </Button>
              </div>
              <div className="space-y-3">
                {numbers.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Key (e.g., Conversion Rate)"
                        value={item.key}
                        onChange={(e) =>
                          handleNumberChange(index, "key", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Value"
                          value={item.value}
                          onChange={(e) =>
                            handleNumberChange(index, "value", e.target.value)
                          }
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          %
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNumber(index)}
                      disabled={numbers.length <= 1}
                      className="flex-shrink-0">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Challenges */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Key Challenges</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addChallenge}
                  className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add More
                </Button>
              </div>
              <div className="space-y-3">
                {keyChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter a key challenge"
                        value={challenge}
                        onChange={(e) =>
                          handleChallengeChange(index, e.target.value)
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeChallenge(index)}
                      disabled={keyChallenges.length <= 1}
                      className="flex-shrink-0">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* How We Helped */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>How We Helped</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addHelp}
                  className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add More
                </Button>
              </div>
              <div className="space-y-3">
                {howWeHelped.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Key (e.g., Strategy)"
                        value={item.key}
                        onChange={(e) =>
                          handleHelpChange(index, "key", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Value (e.g., Implemented SEO)"
                        value={item.value}
                        onChange={(e) =>
                          handleHelpChange(index, "value", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHelp(index)}
                      disabled={howWeHelped.length <= 1}
                      className="flex-shrink-0">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter client feedback"
                className="min-h-[100px]"
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
              {isSubmitting ? "Posting..." : "Post Success Story"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Success Stories</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : successStories.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            You haven't created any success stories yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {successStories.map((story) => (
              <SuccessStoryCard
                key={story.id}
                story={story}
                onDelete={() => handleDelete(story.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { signOut, User } from "firebase/auth";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  clientName?: string;
  clientImageURL?: string;
  industry?: string;
  customIndustry?: string;
  topic?: string;
  customTopic?: string;
  service?: string;
  customService?: string;
  company?: string;
  designation?: string;
  numbers: NumberItem[];
  keyChallenges: string[];
  howWeHelped: HelpItem[];
  feedback: string;
  createdAt: Date;
}

export default function SuccessStoryDashboard({ user }: { user: User }) {
  const [title, setTitle] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientImageURL, setClientImageURL] = useState("");
  const [industry, setIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [service, setService] = useState("");
  const [customService, setCustomService] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
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
          clientName: data.authorName,
          clientImageURL: data.authorImageURL,
          industry: data.industry,
          customIndustry: data.customIndustry,
          topic: data.topic,
          customTopic: data.customTopic,
          service: data.service,
          customService: data.customService,
          company: data.company,
          designation: data.designation,
          numbers: data.numbers,
          keyChallenges: data.keyChallenges,
          howWeHelped: data.howWeHelped,
          feedback: data.feedback,
          createdAt: data.createdAt,
        });
      });

      setSuccessStories(storyList);
    } catch (error) {
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
    setIsSubmitting(true);

    // Validate inputs
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!thumbnailURL.trim()) {
      setError("Thumbnail URL is required");
      return;
    }

    if (!clientName.trim()) {
      setError("Client name is required");
      setIsSubmitting(false);
      return;
    }

    if (!company.trim()) {
      setError("Company is required");
      setIsSubmitting(false);
      return;
    }

    if (!designation.trim()) {
      setError("Designation is required");
      setIsSubmitting(false);
      return;
    }

    if (!industry) {
      setError("Industry is required");
      setIsSubmitting(false);
      return;
    }

    if (industry === "Other" && !customIndustry.trim()) {
      setError("Please specify the industry");
      setIsSubmitting(false);
      return;
    }

    if (!topic) {
      setError("Topic is required");
      setIsSubmitting(false);
      return;
    }

    if (topic === "Other" && !customTopic.trim()) {
      setError("Please specify the topic");
      setIsSubmitting(false);
      return;
    }

    if (!service) {
      setError("Service is required");
      setIsSubmitting(false);
      return;
    }

    if (service === "Other" && !customService.trim()) {
      setError("Please specify the service");
      setIsSubmitting(false);
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
        clientName,
        company,
        designation,
        clientImageURL: clientImageURL || "/placeholder.svg?height=80&width=80",
        industry: industry === "Other" ? "Other" : industry,
        customIndustry: industry === "Other" ? customIndustry : null,
        topic: topic === "Other" ? "Other" : topic,
        customTopic: topic === "Other" ? customTopic : null,
        service: service === "Other" ? "Other" : service,
        customService: service === "Other" ? customService : null,
        numbers: validNumbers,
        keyChallenges: validChallenges,
        howWeHelped: validHelp,
        feedback,
        createdAt: serverTimestamp(),
      });

      // Clear form
      setTitle("");
      setThumbnailURL("");
      setClientName("");
      setClientImageURL("");
      setIndustry("");
      setCustomIndustry("");
      setTopic("");
      setCustomTopic("");
      setService("");
      setCustomService("");
      setCompany("");
      setDesignation("");
      setNumbers([{ key: "", value: 0 }]);
      setKeyChallenges([""]);
      setHowWeHelped([{ key: "", value: "" }]);
      setFeedback("");

      // Refresh success stories
      fetchSuccessStories();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create success story";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (storyId: string) => {
    try {
      await deleteDoc(doc(db, "successStories", storyId));
      setSuccessStories(successStories.filter((story) => story.id !== storyId));
    } catch (e) {
      console.log(e);
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError("Failed to log out");
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Success Story Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Success Story Post</CardTitle>
          <CardDescription>
            Share your success stories with the world
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientImageURL">Client Image URL</Label>
                <Input
                  id="clientImageURL"
                  value={clientImageURL}
                  onChange={(e) => setClientImageURL(e.target.value)}
                  placeholder="Enter client image URL"
                />
              </div>
            </div>

            {/* Client Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Enter designation"
                  required
                />
              </div>
            </div>

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

            {/* Industry, Topic, Service */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Industry */}
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banking">Banking</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Food & beverages">
                      Food & beverages
                    </SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Media & OTT">Media & OTT</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Travel & hospitality">
                      Travel & hospitality
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {industry === "Other" && (
                  <div className="mt-2">
                    <Input
                      placeholder="Specify industry"
                      value={customIndustry}
                      onChange={(e) => setCustomIndustry(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer lifetime value">
                      Customer lifetime value
                    </SelectItem>
                    <SelectItem value="Product & tech">
                      Product & tech
                    </SelectItem>
                    <SelectItem value="Omni-channel marketing">
                      Omni-channel marketing
                    </SelectItem>
                    <SelectItem value="Hyper-personalisation">
                      Hyper-personalisation
                    </SelectItem>
                    <SelectItem value="Customer advocacy">
                      Customer advocacy
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {topic === "Other" && (
                  <div className="mt-2">
                    <Input
                      placeholder="Specify topic"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Service */}
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Program management">
                      Program management
                    </SelectItem>
                    <SelectItem value="MarTech audit and setup">
                      MarTech audit and setup
                    </SelectItem>
                    <SelectItem value="On-demand campaign management">
                      On-demand campaign management
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {service === "Other" && (
                  <div className="mt-2">
                    <Input
                      placeholder="Specify service"
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                    />
                  </div>
                )}
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
            You haven&apos;t created any success stories yet.
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

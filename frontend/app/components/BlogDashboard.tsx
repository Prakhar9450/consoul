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
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlogCard from "@/app/components/AdminBlogCard";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  authorName?: string;
  authorImageURL?: string;
  industry?: string;
  customIndustry?: string;
  topic?: string;
  customTopic?: string;
  service?: string;
  customService?: string;
  company?: string;
  designation?: string;
  linkedin?: string;
  thumbnailUrl: string;
  imagesUrl: string;
}

export default function BlogDashboard({ user }: { user: User }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorImageURL, setAuthorImageURL] = useState("");
  const [industry, setIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [service, setService] = useState("");
  const [customService, setCustomService] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "blogs"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const blogList: Blog[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        blogList.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          content: data.content,
          createdAt: data.createdAt,
          authorName: data.authorName,
          authorImageURL: data.authorImageURL,
          industry: data.industry,
          customIndustry: data.customIndustry,
          topic: data.topic,
          customTopic: data.customTopic,
          service: data.service,
          customService: data.customService,
          company: data.company,
          designation: data.designation,
          linkedin: data.linkedin,
          thumbnailUrl: data.thumbnailUrl,
          imagesUrl: data.imagesUrl,
        });
      });

      setBlogs(blogList);
    } catch (error) {
      setError("Failed to fetch blogs");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [user.uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validate inputs
    if (!title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      setIsSubmitting(false);
      return;
    }

    if (!content.trim()) {
      setError("Content is required");
      setIsSubmitting(false);
      return;
    }

    if (!authorName.trim()) {
      setError("Author name is required");
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

    if (!linkedin.trim()) {
      setError("LinkedIn is required");
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

    try {
      await addDoc(collection(db, "blogs"), {
        userId: user.uid,
        title,
        description,
        content,
        thumbnailUrl,
        imagesUrl,
        authorName,
        company,
        designation,
        linkedin,
        authorImageURL: authorImageURL || "/placeholder.svg?height=80&width=80",
        industry: industry === "Other" ? "Other" : industry,
        customIndustry: industry === "Other" ? customIndustry : null,
        topic: topic === "Other" ? "Other" : topic,
        customTopic: topic === "Other" ? customTopic : null,
        service: service === "Other" ? "Other" : service,
        customService: service === "Other" ? customService : null,
        createdAt: serverTimestamp(),
      });

      // Clear form
      setTitle("");
      setDescription("");
      setContent("");
      setAuthorName("");
      setAuthorImageURL("");
      setIndustry("");
      setCustomIndustry("");
      setTopic("");
      setCustomTopic("");
      setService("");
      setCustomService("");
      setCompany("");
      setDesignation("");
      setLinkedin("");
      setThumbnailUrl("");
      setImagesUrl("");

      // Refresh blogs
      fetchBlogs();
    } catch (error: any) {
      setError(error.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (blogId: string) => {
    try {
      await deleteDoc(doc(db, "blogs", blogId));
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.log(error);
      setError("Failed to delete blog");
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
        <h1 className="text-3xl font-bold">My Blog Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
          <CardDescription>Share your thoughts with the world</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Author Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name</Label>
                <Input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorImageURL">Author Image URL</Label>
                <Input
                  id="authorImageURL"
                  value={authorImageURL}
                  onChange={(e) => setAuthorImageURL(e.target.value)}
                  placeholder="Enter author image URL"
                />
              </div>
            </div>

            {/* Author Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div className="space-y-2 col-span-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="Enter LinkedIn URL"
                  required
                />
              </div>
            </div>

            {/* Blog Title and Description */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input
                  id="thumbnailUrl"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="Enter thumbnail URL"
                  required
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="imagesUrl">Images URL</Label>
                <Input
                  id="imagesUrl"
                  value={imagesUrl}
                  onChange={(e) => setImagesUrl(e.target.value)}
                  placeholder="Enter images URL"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your blog"
                required
              />
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

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here..."
                className="min-h-[200px]"
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
              {isSubmitting ? "Posting..." : "Post Blog"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Blogs</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            You haven&apos;t created any blogs yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onDelete={() => handleDelete(blog.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

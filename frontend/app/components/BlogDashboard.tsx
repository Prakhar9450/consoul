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
import { auth, db } from "../lib/firebaseConfig";
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
import BlogCard from "../components/AdminBlogCard";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: any;
  thumbnailUrl: string;
  imagesUrl: string;
}

export default function BlogDashboard({ user }: { user: any }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
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
          thumbnailUrl: data.thumbnailUrl,
          imagesUrl: data.imagesUrl,
        });
      });

      setBlogs(blogList);
    } catch (error: any) {
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

    try {
      await addDoc(collection(db, "blogs"), {
        userId: user.uid,
        title,
        description,
        content,
        thumbnailUrl,
        imagesUrl,
        createdAt: serverTimestamp(),
      });

      // Clear form
      setTitle("");
      setDescription("");
      setContent("");
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
    } catch (error: any) {
      setError("Failed to delete blog");
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
            You haven't created any blogs yet.
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

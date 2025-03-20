"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import Footer from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Linkedin } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: any;
  userId: string;
  tags?: string[];
  author?: {
    name: string;
    title: string;
    bio?: string;
    photoURL?: string;
  };
  thumbnailUrl?: string; // Changed from thumbnailURL
  imagesUrl?: string; // Changed from imagesURL array to single string
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!params.id) return;

      try {
        const docRef = doc(db, "blogs", params.id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPost({
            id: docSnap.id,
            title: data.title,
            description: data.description,
            content: data.content,
            createdAt: data.createdAt,
            userId: data.userId,
            tags: data.tags || [],
            author: data.author || {
              name: "Vani Garg",
              title: "Founder, ConSoul LLP",
              bio: "Vani Garg is the visionary founder of ConSoul LLP, driving innovative retention marketing strategies to enhance customer loyalty and business growth. With a passion for delivering impactful solutions, she helps brands unlock their true potential through data-driven insights and personalized engagement.",
              photoURL: "/logos/headstrat.svg",
            },
            // Use the correct property names to match other components
            thumbnailUrl:
              data.thumbnailUrl ||
              data.thumbnailURL ||
              "/placeholder.svg?height=600&width=800",
            imagesUrl:
              data.imagesUrl ||
              (data.imagesURL && data.imagesURL.length > 0
                ? data.imagesURL[0]
                : null),
          });

          // Fetch related posts
          fetchRelatedPosts(data.tags || []);
        } else {
          setError("Blog post not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  const fetchRelatedPosts = async (tags: string[]) => {
    try {
      const q = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc"),
        limit(3)
      );

      const querySnapshot = await getDocs(q);
      const posts: BlogPost[] = [];

      querySnapshot.forEach((doc) => {
        if (doc.id !== params.id) {
          // Exclude current post
          const data = doc.data();
          posts.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            content: data.content,
            createdAt: data.createdAt,
            userId: data.userId,
            // Use the correct property name
            thumbnailUrl:
              data.thumbnailUrl ||
              data.thumbnailURL ||
              "/placeholder.svg?height=400&width=600",
          });
        }
      });

      setRelatedPosts(posts);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  // Format the date
  const formattedDate = post?.createdAt
    ? new Date(post.createdAt.toDate()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Sept 27, 2024";

  // Calculate read time (roughly 200 words per minute)
  const wordCount = post?.content ? post.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Split content into paragraphs
  const contentParagraphs = post?.content ? post.content.split("\n\n") : [];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-500">{error}</h1>
            <Button className="mt-4" onClick={() => router.push("/blogs")}>
              Return to blogs
            </Button>
          </div>
        ) : post ? (
          <>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm mb-6">
                <Link href="/blogs" className="text-[#6438C3] hover:underline">
                  Blog
                </Link>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-500 truncate">{post.title}</span>
              </div>

              {/* Blog Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Image
                    src={
                      post.author?.photoURL ||
                      "/placeholder.svg?height=80&width=80" ||
                      "/placeholder.svg"
                    }
                    alt={post.author?.name || "Author"}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium">
                    {post.author?.name || "Anonymous"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {post.author?.title || "Author"}
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-auto text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{readTime} minute read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>

              {/* Blog Intro */}
              <p className="text-lg mb-8">{post.description}</p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block rounded-full px-4 py-1 text-sm bg-gray-100 text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="mb-8">
                <Image
                  src={
                    post.thumbnailUrl || "/placeholder.svg?height=600&width=800"
                  }
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Content - First Part */}
              <div className="prose prose-lg max-w-none mb-8">
                {contentParagraphs.length > 0 && <p>{contentParagraphs[0]}</p>}
              </div>

              {/* Additional Image */}
              {post.imagesUrl && (
                <div className="mb-4">
                  <Image
                    src={post.imagesUrl || "/placeholder.svg"}
                    alt="Blog content image"
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Caption: this is the space for caption this is the space for
                    caption this is the space for caption this is the space for
                    caption
                  </p>
                </div>
              )}

              {/* Content - Remaining Parts */}
              <div className="prose prose-lg max-w-none mb-12">
                {contentParagraphs.slice(1).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Divider */}
              <div className="flex justify-center space-x-2 mb-12">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>

              {/* Author Bio */}
              <div className="flex flex-col items-center mb-12">
                <Image
                  src={
                    post.author?.photoURL ||
                    "/placeholder.svg?height=80&width=80" ||
                    "/placeholder.svg"
                  }
                  alt={post.author?.name || "Author"}
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                />
                <h3 className="font-medium text-center">
                  Written by {post.author?.name || "Anonymous"}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  {post.author?.title || "Author"}
                </p>
                <p className="text-center text-gray-700 max-w-2xl mb-4">
                  {post.author?.bio || ""}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    Connect with {post.author?.name.split(" ")[0] || "Author"}{" "}
                    on
                  </span>
                  <a
                    href="#"
                    className="text-[#0077B5] flex items-center gap-1">
                    <Linkedin className="h-4 w-4" />
                    <span className="underline">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-[#6438C3] text-white py-12">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Enjoyed the article?
                    </h2>
                    <p className="mb-6">
                      Subscribe to our Newsletter and
                      <br />
                      never miss an update.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your E-mail address"
                        className="bg-white text-black"
                      />
                      <Button className="bg-white text-[#6438C3] hover:bg-gray-100">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:flex justify-end">
                    <Image
                      src="/icons/newsletter.svg"
                      width={300}
                      height={300}
                      alt="newsletter"
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
              <h2 className="text-2xl font-bold mb-8">Read other articles</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <div key={post.id} className="flex flex-col">
                    <Link href={`/blog/${post.id}`}>
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={
                            post.thumbnailUrl ||
                            "/placeholder.svg?height=400&width=600"
                          }
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </Link>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>Sept 27, 2024</span>
                      <span className="mx-2">•</span>
                      <span>4 minute read</span>
                    </div>

                    <Link href={`/blog/${post.id}`} className="mb-2">
                      <h3 className="text-xl font-semibold hover:text-[#6438C3] transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  className="bg-[#6438C3] hover:bg-[#5429B3]"
                  onClick={() => router.push("/blogs")}>
                  View all articles
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

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
import Lenis from "lenis";

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
  createdAt: any;
  userId: string;
  clientTitle?: string;
}

export default function SuccessStoryPage() {
  const params = useParams();
  const router = useRouter();
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [relatedStories, setRelatedStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuccessStory = async () => {
      if (!params.id) return;

      try {
        const docRef = doc(db, "successStories", params.id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const storyData: SuccessStory = {
            id: docSnap.id,
            title: data.title,
            clientName: data.clientName || "Anonymous",
            company: data.company || "",
            designation: data.designation,
            clientImageURL:
              data.clientImageURL || "/placeholder.svg?height=40&width=40",
            industry: data.industry,
            customIndustry: data.customIndustry,
            topic: data.topic,
            customTopic: data.customTopic,
            service: data.service,
            customService: data.customService,
            thumbnailURL:
              data.thumbnailURL || "/placeholder.svg?height=600&width=800",
            numbers: data.numbers || [],
            keyChallenges: data.keyChallenges || [],
            howWeHelped: data.howWeHelped || [],
            feedback: data.feedback || "",
            createdAt: data.createdAt,
            userId: data.userId,
          };

          setStory(storyData);

          // Fetch related stories
          fetchRelatedStories();
        } else {
          setError("Success story not found");
        }
      } catch (error) {
        console.error("Error fetching success story:", error);
        setError("Failed to load success story");
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStory();
  }, [params.id]);

  const fetchRelatedStories = async () => {
    try {
      const q = query(
        collection(db, "successStories"),
        orderBy("createdAt", "desc"),
        limit(3)
      );

      const querySnapshot = await getDocs(q);
      const stories: SuccessStory[] = [];

      querySnapshot.forEach((doc) => {
        if (doc.id !== params.id) {
          // Exclude current story
          const data = doc.data();
          stories.push({
            id: doc.id,
            title: data.title,
            thumbnailURL:
              data.thumbnailURL || "/placeholder.svg?height=400&width=600",
            company: data.company,
            clientName: data.clientName,
            clientImageURL: data.clientImageURL,
            designation: data.designation,
            numbers: data.numbers || [],
            keyChallenges: data.keyChallenges || [],
            howWeHelped: data.howWeHelped || [],
            feedback: data.feedback || "",
            createdAt: data.createdAt,
            userId: data.userId,
          });
        }
      });

      setRelatedStories(stories);
    } catch (error) {
      console.error("Error fetching related stories:", error);
    }
  };

  // Format the date
  const formattedDate = story?.createdAt
    ? new Date(story.createdAt.toDate()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Sept 27, 2023";

  // Calculate read time based on content length
  const contentLength = story
    ? story.feedback.split(/\s+/).length +
      story.keyChallenges.reduce(
        (acc, challenge) => acc + challenge.split(/\s+/).length,
        0
      ) +
      story.howWeHelped.reduce(
        (acc, item) =>
          acc + item.key.split(/\s+/).length + item.value.split(/\s+/).length,
        0
      )
    : 0;

  const readTime = Math.max(1, Math.ceil(contentLength / 200));

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
            <Button
              className="mt-4"
              onClick={() => router.push("/success-stories")}>
              Return to success stories
            </Button>
          </div>
        ) : story ? (
          <>
            <div className="container mx-auto py-8">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl mx-12 font-bold mb-8 max-w-4xl">
                {story.title}
              </h1>

              {/* Main Image */}
              <div className="mb-12">
                <Image
                  src={story.thumbnailURL || "/placeholder.svg"}
                  alt={story.title}
                  width={400}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Key Metrics */}
              {story.numbers.length > 0 && (
                <div
                  className={`grid gap-6 mb-12 mx-40 ${
                    story.numbers.length === 1
                      ? "grid-cols-1"
                      : story.numbers.length === 2
                      ? "grid-cols-2"
                      : story.numbers.length === 3
                      ? "grid-cols-3"
                      : story.numbers.length === 4
                      ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  }`}>
                  {story.numbers.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 text-center px-4">
                      <div className="text-4xl md:text-6xl font-bold text-[#a47ef6] mb-2">
                        {item.value}%
                      </div>
                      <div className="text-gray-600 mx-24">{item.key}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Challenges */}
              {story.keyChallenges.length > 0 && (
                <div className="mb-12 my-32">
                  <h2 className="text-2xl font-bold mb-6 text-center text-[#555555]">
                    Key Challenges
                  </h2>
                  <div className=" text-lg space-y-6 max-w-3xl mx-auto text-[#555555]">
                    {story.keyChallenges.map((challenge, index) => (
                      <p key={index} className="text-center leading-relaxed">
                        {challenge}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* How We Helped */}
              {story.howWeHelped.length > 0 && (
                <div className="mb-12 my-32">
                  <h2 className="text-2xl font-bold mb-8 text-center text-[#555555]">
                    How we helped {story.company || "company"} achieve their
                    best results
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 max-w-3xl mx-auto">
                    {story.howWeHelped.map((item, index) => (
                      <>
                        <div key={index} className="font-bold text-[#555555]">
                          {item.key}
                        </div>
                        <div className="text-gray-700 leading-relaxed">
                          {item.value}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Feedback */}
              <div className="bg-[#6438C3] text-white py-32 px-8 md:px-12 mb-12">
                <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
                  {/* Left Side - Heading */}
                  <h2 className="text-4xl font-bold col-span-1">
                    Words from <br /> the client
                  </h2>

                  {/* Right Side - Quote */}
                  <div className="space-y-6 col-span-2">
                    <blockquote className="text-2xl leading-loose tracking-widest">
                      "{story.feedback}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="grid grid-cols-[60px_auto] gap-3 items-center">
                      <Image
                        src={
                          story.clientImageURL ||
                          "/logos/headstrat.svg?height=60&width=60"
                        }
                        alt={story.clientName || "Client"}
                        width={60}
                        height={60}
                        className="w-14 h-14 rounded-full object-cover overflow-hidden"
                      />
                      <div>
                        <div className="font-medium">
                          {story.clientName || "Smriti Mandhana"}
                        </div>
                        <div className="text-sm opacity-80">
                          {story.designation && story.company
                            ? `${story.designation}, ${story.company}`
                            : "Head of Marketing, iWantTFC"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Stories */}
              <div className="mb-12 mx-12">
                <h2 className="text-2xl font-bold mb-8">
                  Read other success stories
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedStories.map((story) => (
                    <div key={story.id} className="flex flex-col">
                      <Link href={`/success-story/${story.id}`}>
                        <div className="mb-4 overflow-hidden rounded-lg">
                          <Image
                            src={
                              story.thumbnailURL ||
                              "/placeholder.svg?height=400&width=600"
                            }
                            alt={story.title}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </Link>

                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{formattedDate}</span>
                        <span className="mx-2">•</span>
                        <span>{readTime} minute read</span>
                      </div>

                      <Link
                        href={`/success-story/${story.id}`}
                        className="mb-2">
                        <h3 className="text-lg font-semibold hover:text-[#6438C3] transition-colors">
                          {story.title}
                        </h3>
                      </Link>

                      {story.numbers.length > 0 && (
                        <p className="text-gray-600 text-sm">
                          {story.numbers[0]?.value}%{" "}
                          {story.numbers[0]?.key.toLowerCase()}
                          {story.numbers.length > 1 &&
                            `, ${
                              story.numbers[1]?.value
                            }% ${story.numbers[1]?.key.toLowerCase()}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    className="bg-[#6438C3] hover:bg-[#5429B3] rounded-md"
                    onClick={() => router.push("/success-stories")}>
                    View all success stories
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>

      <div className="mx-9">
        <Footer />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLogin from "../components/AdminLogin";
import BlogDashboard from "../components/BlogDashboard";
import SuccessStoryDashboard from "@/app/components/SuccessStoryDashboard";
import Footer from "../components/Footer";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Tabs defaultValue="blogs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="blogs">My Blog Dashboard</TabsTrigger>
          <TabsTrigger value="success-stories">
            My Success Stories Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="blogs">
          <BlogDashboard user={user} />
        </TabsContent>
        <TabsContent value="success-stories">
          <SuccessStoryDashboard user={user} />
        </TabsContent>
      </Tabs>
      {/* Footer */}
      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </main>
  );
}

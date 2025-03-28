"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/lib/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLogin from "@/app/components/AdminLogin";
import BlogDashboard from "@/app/components/BlogDashboard";
import SuccessStoryDashboard from "@/app/components/SuccessStoryDashboard";
import Footer from "@/app/components/Footer";
import CareerDashboard from "@/app/components/CareerDashboard";
import PdfDashboard from "@/app/components/PdfDashboard";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-8">
        <AdminLogin />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Tabs defaultValue="blogs" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="blogs">My Blog Dashboard</TabsTrigger>
          <TabsTrigger value="success-stories">
            My Success Stories Dashboard
          </TabsTrigger>
          <TabsTrigger value="careers">My Career Dashboard</TabsTrigger>
          <TabsTrigger value="pdf-documents">
            My PDF Download Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="blogs">
          <BlogDashboard user={user} />
        </TabsContent>
        <TabsContent value="success-stories">
          <SuccessStoryDashboard user={user} />
        </TabsContent>
        <TabsContent value="careers">
          <CareerDashboard user={user} />
        </TabsContent>
        <TabsContent value="pdf-documents">
          <PdfDashboard user={user} />
        </TabsContent>
      </Tabs>

      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </main>
  );
}

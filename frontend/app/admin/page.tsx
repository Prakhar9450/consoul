"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import AdminLogin from "../components/AdminLogin";
import BlogDashboard from "../components/BlogDashboard";
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
      {user ? <BlogDashboard user={user} /> : <AdminLogin />}
      {/* Footer */}
      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </main>
  );
}

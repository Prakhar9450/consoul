"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to media-ott when the component mounts
    router.replace("/services/media-ott");
  }, [router]);

  // This content won't be visible as the redirect happens immediately
  // But it's good to have something for SEO and in case redirect doesn't work
  return (
    <div>
      {/* Loading or placeholder content if needed */}
    </div>
  );
}
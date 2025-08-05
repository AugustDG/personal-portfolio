"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Directus admin interface
    const directusUrl =
      process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
    window.location.href = `${directusUrl}/admin`;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Directus Admin...
        </h2>
        <p className="text-gray-500 mt-2">Redirecting to the admin interface</p>
      </div>
    </div>
  );
}

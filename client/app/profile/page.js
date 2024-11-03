"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import Link from "next/link";
import { LuUser, LuSearch } from "react-icons/lu";

export default function Profile() {

  const [username, setUsername] = useState("");
  const router = useRouter(); // Initialize useRouter here
  

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Guest");
  }, []);

  // Define handleLogout function
  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear the username (or use your auth token key)
    router.push("/login"); // Redirect to login page
  };

  return (
    <PageShell title="Profile">
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border border-black flex items-center justify-center bg-gray-200">
            <LuUser className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <Text className="text-xl">{username}</Text>
            <Text className="text-sm text-gray-600">
              Last login: {new Date().toLocaleDateString()}
            </Text>
          </div>
        </div>

          {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="self-end bg-red-500 text-white py-1 px-4 rounded"
        >
          Logout
        </button>

        {/* History Section */}
        <div className="border border-black p-4">
          <div className="flex items-center justify-between mb-4">
            <Text className="text-lg font-bold">History</Text>
            <div className="flex items-center gap-2">
              <LuSearch className="w-5 h-5" />
              <Text>Search</Text>
            </div>
          </div>

          {/* Sample history items - you can map through actual data here */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <Text>Region: Score</Text>
              <Text>Date</Text>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <Text>Region: Score</Text>
              <Text>Date</Text>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <Text>Region: Score</Text>
              <Text>Date</Text>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/region"
          className="bg-gray-600 py-1 px-8 border border-black self-start"
        >
          <Text className="text-xl">Back</Text>
        </Link>
      </div>
    </PageShell>

        
  );
}








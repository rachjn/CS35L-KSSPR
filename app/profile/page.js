"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import Link from "next/link";
import { LuUser } from "react-icons/lu";
import { getScoreByUser } from "@/lib/actions/get-scores";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [scores, setScores] = useState([]);
  const [bestScore, setBestScore] = useState(null);
  const [bestWpm, setBestWpm] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Guest");

    // Fetch user's scores
    getScoreByUser(1).then((fetchedScores) => {
      setScores(fetchedScores);

      // Find best score and WPM
      if (fetchedScores.length > 0) {
        const maxScore = Math.max(...fetchedScores.map((score) => score.value));
        const maxWpm = Math.max(...fetchedScores.map((score) => score.wpm));
        setBestScore(maxScore);
        setBestWpm(maxWpm);
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const recentScores = scores
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

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

        {/* Best Score and WPM Section */}
        <div className="border border-black p-4">
          <Text className="text-lg font-bold">All-Time Best</Text>
          <div className="flex justify-between">
            <Text>Best Score: {bestScore !== null ? bestScore : "N/A"}</Text>
            <Text>Best WPM: {bestWpm !== null ? bestWpm : "N/A"}</Text>
          </div>
        </div>

        {/* History Section */}
        <div className="border border-black p-4">
          <div className="flex items-center justify-between mb-4">
            <Text className="text-lg font-bold">Recent Attempts</Text>
          </div>

          <div className="flex flex-col gap-2">
            {recentScores.map((score) => (
              <div
                key={score.id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <Text>
                  {score.Challenge.region}: {score.value} - {score.wpm} WPM
                </Text>
                <Text>
                  {score.createdAt
                    ? new Date(score.createdAt).toLocaleDateString()
                    : "N/A"}
                </Text>
              </div>
            ))}
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

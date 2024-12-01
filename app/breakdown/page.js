// File: pages/breakdown.js

import React from "react";
import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import IconButton from "@/components/IconButton";
import { FaArrowLeft, FaRedo, FaPlay } from "react-icons/fa";
import { getScoreById } from "@/lib/actions/get-scores";
import Link from "next/link";
import { HomeButton } from "@/components/HomeButton";
import { LuUser } from "react-icons/lu";

async function Breakdown({ searchParams }) {
  const id = parseInt((await searchParams).id);
  if (!id) {
    return <div>Invalid Score ID</div>;
  }
  const score = await getScoreById(id);
  if (!score) {
    return <div>Score not found</div>;
  }

  return (
    <>
      {/* Score Display */}
      <HomeButton />
      <Link href="/profile" className="absolute right-12 top-8 p-2">
        <LuUser className="w-12 h-12 text-dark-brown" />
      </Link>

      <div className="flex justify-center items-center h-screen flex-col gap-6">
        <div className="text-5xl font-bold text-dark-brown lowercase">
          breakdown
        </div>

        <div className="overflow-x-auto bg-dark-brown p-6 rounded-lg">
          <table className="bg-lighter-brown border border-white border-opacity-20 shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 text-dark-brown bg-light-brown text-left font-semibold lowercase">
                  Username
                </th>
                <th className="py-2 px-4 text-dark-brown bg-light-brown text-left font-semibold lowercase">
                  Region
                </th>
                <th className="py-2 px-4 text-dark-brown bg-light-brown text-left font-semibold lowercase">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {[score].map((score) => (
                <tr
                  key={score.id}
                  className="border-b border-light-beige border-opacity-40"
                >
                  <td className="text-dark-brown py-2 px-4 text-sm">
                    {score.user.email}
                  </td>
                  <td className="text-dark-brown py-2 px-4 text-sm">
                    {score.challenge.region}
                  </td>
                  <td className="text-dark-brown py-2 px-4 text-sm">
                    {score.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Container for Square Buttons */}
          <div className="flex justify-center space-x-6">
            {/* Score Breakdown Button */}
            <Link
              href="/scoreboard"
              className="text-dark-brown font-bold bg-my-blue px-8 py-2 rounded border border-white border-opacity-40 shadow hover:scale-[105%] transform transition-transform duration-200"
            >
              scoreboard
            </Link>
            <Link
              href="/region"
              className="text-dark-brown font-bold bg-my-pink px-8 py-2 rounded border border-white border-opacity-40 shadow hover:scale-[105%] transform transition-transform duration-200"
            >
              play again
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Breakdown;

"use client";

import React, { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import IconButton from "@/components/IconButton";
import { FaRedo, FaChartBar, FaPlay } from "react-icons/fa";
import { getTopScores } from "@/lib/actions/get-scores";
import Link from "next/link";

const Scoreboard = () => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    getTopScores().then((scores) => setTopScores(scores));
  }, []);

  return (
    <PageShell title="Scoreboard">
      {/* Score Display */}
      <div className="text-center mb-8">
        <Text className="text-2xl mb-2">Top Scores</Text>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Username
                </th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Region
                </th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {topScores.map((score) => (
                <tr
                  key={score.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {score.User.email}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {score.Challenge.region}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {score.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4">
        {/* Container for Square Buttons */}
        <div className="flex justify-center space-x-6">
          {/* Score Breakdown Button */}
          <IconButton
            href="/breakdown"
            icon={FaChartBar}
            ariaLabel="Score Breakdown"
            title="Score Breakdown"
            bgColor="bg-blue-500"
            hoverBgColor="hover:bg-blue-600"
          />

          {/* Play Again Button */}
          <IconButton
            href="/region"
            icon={FaRedo}
            ariaLabel="Play Again"
            title="Play Again"
            bgColor="bg-green-500"
            hoverBgColor="hover:bg-green-600"
          />

          {/* Game Overview Button */}
          <IconButton
            href="/region"
            icon={FaPlay}
            ariaLabel="Game Overview"
            title="Game Overview"
            bgColor="bg-purple-500"
            hoverBgColor="hover:bg-purple-600"
          />
        </div>
      </div>
    </PageShell>
  );
};

export default Scoreboard;
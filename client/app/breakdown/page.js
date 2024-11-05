// File: pages/breakdown.js

import React from "react";
import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import IconButton from "@/components/IconButton";
import { FaArrowLeft, FaRedo, FaPlay } from "react-icons/fa";

const Breakdown = () => {
  // Dummy data representing user statistics
  const users = [
    {
      id: 1,
      username: "mobachessking",
      score: 3000,
      wpm: 200,
      accuracy: 100,
    },
  ];

  return (
    <PageShell title="Score Breakdown">
      {/* Header */}
      <div className="text-center mb-8 w-full max-w-4xl">
        <Text className="text-3xl mb-4">Score Breakdown</Text>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Username
                </th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Score
                </th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  WPM
                </th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Accuracy (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {user.username}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {user.score}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {user.wpm}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {user.accuracy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-6">
        {/* Back Button */}
        <IconButton
          href="/scoreboard"
          icon={FaArrowLeft}
          ariaLabel="Back to Scoreboard"
          title="Back to Scoreboard"
          bgColor="bg-gray-500"
          hoverBgColor="hover:bg-gray-600"
        />

        {/* Replay Button */}
        <IconButton
          href="/game"
          icon={FaRedo}
          ariaLabel="Play Again"
          title="Play Again"
          bgColor="bg-green-500"
          hoverBgColor="hover:bg-green-600"
        />

        {/* Play Button */}
        <IconButton
          href="/region"
          icon={FaPlay}
          ariaLabel="Game Overview"
          title="Game Overview"
          bgColor="bg-purple-500"
          hoverBgColor="hover:bg-purple-600"
        />
      </div>
    </PageShell>
  );
};

export default Breakdown;

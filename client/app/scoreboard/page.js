import React from "react";
import { PageShell } from "@/components/PageShell"; // Adjust the path if necessary
import { Text } from "@/components/Text"; // Adjust the path if necessary
import IconButton from "@/components/IconButton"; // Import the IconButton component
import { FaRedo, FaChartBar, FaPlay } from "react-icons/fa"; // Importing icons

const Scoreboard = () => {
  // Placeholder score - replace with actual score logic later
  const score = 3000;

  return (
    <PageShell title="Scoreboard">
      {/* Score Display */}
      <div className="text-center mb-8">
        <Text className="text-2xl mb-2">Score</Text>
        <div className="text-4xl font-bold text-primary">
          {score.toLocaleString()}
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
            href="/game"
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

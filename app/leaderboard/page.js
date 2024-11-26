"use client";
import { useState } from "react";
import Link from "next/link"; // For back button 
import { LuUser } from "react-icons/lu"; // For profile button 

const mockLeaderboardData = [
  { name: "Player1", score: 500, region: "North America" },
  { name: "Player2", score: 450, region: "Europe" },
  { name: "Player3", score: 400, region: "Asia" },
  { name: "Player4", score: 390, region: "Africa" },
  { name: "Player5", score: 380, region: "Oceania" },
  { name: "Player6", score: 370, region: "South America" },
  { name: "Player7", score: 360, region: "Caribbean" },
  { name: "Player8", score: 350, region: "Middle East" },
  { name: "Player9", score: 340, region: "Central America" },
  { name: "Player10", score: 330, region: "North America" },
  { name: "Player11", score: 320, region: "Europe" }, // Extra for testing filters
];

const regions = [
  "All Regions",
  "North America",
  "South America",
  "Europe",
  "Africa",
  "Asia",
  "Oceania",
  "Caribbean",
  "Middle East",
  "Central America",
];

export default function Leaderboard() {
  const [filteredRegion, setFilteredRegion] = useState("All Regions");

  // Filter the leaderboard data based on selected region
  const filteredData =
    filteredRegion === "All Regions"
      ? mockLeaderboardData.slice(0, 10) // Show top 10 overall
      : mockLeaderboardData
          .filter((player) => player.region === filteredRegion)
          .slice(0, 10); // Show top 10 in selected region

  return (
    <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto py-10 px-4">
      {/* Back Button */}
      <Link
        href="/region"
        className="fixed top-4 left-4 w-16 h-16 border border-black bg-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors rounded"
      >
        <span className="text-xl text-white">Back</span>
      </Link>

      {/* Profile Button */}
      <Link
        href="/profile"
        className="fixed top-4 right-4 w-16 h-16 border border-black bg-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors rounded"
      >
        <LuUser className="w-8 h-8 text-white" />
      </Link>

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>

      {/* Search Bar with Dropdown */}
      <div className="w-full flex justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Player"
          className="flex-grow px-4 py-2 border border-black rounded focus:outline-none"
        />
        <select
          className="px-4 py-2 border border-black rounded bg-white"
          value={filteredRegion}
          onChange={(e) => setFilteredRegion(e.target.value)}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Leaderboard Table */}
      <div className="w-full border border-black bg-gray-100 rounded-lg p-4">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-black py-2 px-4">Rank</th>
              <th className="border border-black py-2 px-4">Player</th>
              <th className="border border-black py-2 px-4">Score</th>
              <th className="border border-black py-2 px-4">Region</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((player, index) => (
                <tr key={index}>
                  <td className="border border-black py-2 px-4 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-black py-2 px-4">
                    {player.name}
                  </td>
                  <td className="border border-black py-2 px-4 text-center">
                    {player.score}
                  </td>
                  <td className="border border-black py-2 px-4">
                    {player.region}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-black py-2 px-4 text-center"
                >
                  No scores available for this region.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

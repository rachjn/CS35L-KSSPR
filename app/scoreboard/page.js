"use client";

import React, { useEffect, useState } from "react";
import { getTopScores } from "@/lib/actions/get-scores";
import { HomeButton } from "@/components/HomeButton";
import Link from "next/link";
import { LuUser } from "react-icons/lu";

const regions = [
  "all-regions",
  "north-america",
  "south-america",
  "europe",
  "africa",
  "asia",
  "oceania",
  "caribbean",
  "middle-east",
  "central-america",
];

const Scoreboard = () => {
  const [topScores, setTopScores] = useState([]);
  const [filteredRegion, setFilteredRegion] = useState("all-regions");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getTopScores(10).then((scores) => setTopScores(scores));
  }, []);

  // Filter the scores based on the selected region and search input
  const filteredScores = topScores.filter((score) => {
    const matchesRegion =
      filteredRegion === "all-regions" ||
      score.challenge.region === filteredRegion;
    const matchesUser =
      searchInput === "" ||
      score.user.email.toLowerCase().includes(searchInput.toLowerCase());
    return matchesRegion && matchesUser;
  });

  return (
    <>
      {/* Score Display */}
      <HomeButton />
      <Link href="/profile" className="absolute right-12 top-8 p-2">
        <LuUser className="w-12 h-12 text-dark-brown" />
      </Link>

      <div className="flex justify-center items-center h-screen flex-col gap-6">
        <div className="text-5xl font-bold text-dark-brown lowercase">
          top scores{" "}
        </div>

        <div className="flex gap-4">
          {/* Region Filter Dropdown */}
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

          {/* User Search Input */}
          <input
            type="text"
            placeholder="Search User"
            className="px-4 py-2 border border-black rounded bg-white"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
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
              {filteredScores.map((score) => (
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
                    {score.value}
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
              href="/breakdown"
              className="text-dark-brown font-bold bg-my-blue px-8 py-2 rounded border border-white border-opacity-40 shadow hover:scale-[105%] transform transition-transform duration-200"
            >
              score breakdown
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
};

export default Scoreboard;
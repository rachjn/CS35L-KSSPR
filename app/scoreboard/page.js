"use client";

import React, { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import IconButton from "@/components/IconButton";
import { FaRedo, FaChartBar, FaPlay } from "react-icons/fa";
import { getTopScores } from "@/lib/actions/get-scores";
import { HomeButton } from "@/components/HomeButton";
import Link from "next/link";
import { LuUser } from "react-icons/lu";

const Scoreboard = () => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    getTopScores(10).then((scores) => setTopScores(scores));
  }, []);

  return (
    <>
      {/* Score Display */}
      <HomeButton />
      <Link href="/profile" className="absolute right-12 top-8 p-2">
        <LuUser className="w-12 h-12 text-dark-brown" />
      </Link>

      <div className="flex justify-center items-center h-screen flex-col gap-6">
        <div className="text-5xl font-bold text-dark-brown lowercase ">
          top scores{" "}
        </div>

        <div className="overflow-x-auto bg-dark-brown p-4 rounded-lg ">
          <table className="bg-lighter-brown border border-white border-opacity-20 shadow">
            <thead>
              <tr>
                <th className=" py-2 px-4 text-dark-brown bg-light-brown text-left font-semibold lowercase">
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
              {topScores.map((score) => (
                <tr
                  key={score.id}
                  className=" border-b border-light-beige border-opacity-40"
                >
                  <td className="text-dark-brown py-2 px-4 text-sm ">
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
      </div>
    </>
  );
};

export default Scoreboard;

"use client";

import { HomeButton } from "@/components/HomeButton";
import { Text } from "@/components/Text";
import { getRandomChallengeByRegion } from "@/lib/actions/get-challenge";
import { recordScore } from "@/lib/actions/get-scores";
import Link from "next/link";
import { LuUser } from "react-icons/lu";
import { useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

// in seconds
const TIMER_DURATION = 10;

// Utlity function to remove punctuation (don't want to penalize user for not putting a comma/period)
// Removes punctuation marks: .,!?:;'"
// Removes special characters: @#$%^&*()[]{}<>/|\~
// Removes underscores
// WIP: Remove em dash (For the North American challenge, if you remove the -, it doesn't register)
const removePunctuation = (word) => word.replace(/[^\w\s]|_/g, "");

function getErrorOutput(transcript, input) {
  const transcriptWords = transcript.split(" ").map(removePunctuation);
  const inputWords = input.split(" ").map(removePunctuation);

  const output = [];

  for (let i = 0; i < inputWords.length - 1; i++) {
    if (inputWords[i].toLowerCase() !== transcriptWords[i].toLowerCase())
      output.push({ word: inputWords[i], error: true });
    else output.push({ word: inputWords[i], error: false });
  }

  return output;
}

export default function GameInterface() {
  const searchParams = useSearchParams();
  const region = searchParams.get("region");
  const [input, setInput] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [errorOutput, setErrorOutput] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(TIMER_DURATION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0); // State for the score
  const [wpm, setWpm] = useState(0); // State for the wpm

  useEffect(() => {
    async function setRandomChallenge() {
      const challenge = await getRandomChallengeByRegion(region);
      setChallenge(challenge);
    }
    setRandomChallenge();
  }, [region]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimerSeconds((seconds) => {
        const newSeconds = seconds - 1;
        if (newSeconds === 0) {
          clearInterval(timerInterval);
          setIsGameOver(true);
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (isGameOver && challenge) {
      // const userId = localStorage.getItem("userId"); // Placeholder until auth is finished
      recordScore(1, challenge.id, input, timerSeconds).then((result) => {
        // Change hardcoded 1 back to userId
        setScore(result.score); // Dynamically update score state
        setWpm(result.wpm); // Dynamically update wpm state
      });
    }
  }, [isGameOver, challenge, input, timerSeconds]);

  // Convert URL parameter back to display format
  const displayRegion = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <HomeButton />
      <Link href="/profile" className="absolute right-12 top-8 p-2">
        <LuUser className="w-12 h-12 text-dark-brown" />
      </Link>

      <div className="flex justify-center items-center h-screen">
        <div className="bg-dark-brown p-12 rounded-lg flex flex-col items-center gap-6">
          {/* Timer Block */}
          <div className="rounded-full p-4 bg-my-blue border border-white border-opacity-40 shadow">
            <div className="text-xl font-bold text-dark-brown">
              {timerSeconds} seconds left
            </div>
          </div>

          {/* Region Title */}
          <div className="text-5xl font-bold text-lighter-brown lowercase ">
            {displayRegion}: {challenge && challenge.title}
          </div>

          {challenge && <audio controls src={challenge.audioURL} />}

          {/* Score Block */}
          {isGameOver && (
            <div className="flex items-center justify-center flex-col text-dark-brown bg-light-beige py-4 px-12 rounded">
              <div className="font-bold text-4xl">game over!</div>
              <div className="text-base lowercase">
                Score: {score} - {wpm} WPM
              </div>
              {/* Button to navigate to Scoreboard */}
              <Link href="/scoreboard">
                <button className="mt-4 bg-my-pink text-dark-brown py-2 px-8 font-bold border border-white border-opacity-40 shadow rounded lowercase">
                  View Scoreboard
                </button>
              </Link>
            </div>
          )}

          {/* Text Input Area */}
          <div className="flex flex-col gap-4 min-w-[40rem]  ">
            {/* Area where words show up if we are doing it */}
            <div className="min-h-20 border border-light-brown p-4 bg-lighter-brown rounded min-h-[10rem]">
              {errorOutput.map(({ word, error }, index) =>
                error ? (
                  <span key={index} className="text-lg text-red-500">
                    {word}{" "}
                  </span>
                ) : (
                  <span key={index} className="text-lg text-dark-brown">
                    {word}{" "}
                  </span>
                ),
              )}
            </div>

            {/* User input field */}
            <input
              type="text"
              placeholder="Type words here..."
              value={input}
              disabled={isGameOver}
              onChange={(e) => {
                startTransition(() => {
                  setInput(e.target.value);
                  setErrorOutput(
                    getErrorOutput(challenge.transcript, e.target.value),
                  );
                });
              }}
              className="w-full p-4 border border-lighter-brown rounded-lg text-dark-brown text-lg focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}

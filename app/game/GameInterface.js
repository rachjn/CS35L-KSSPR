"use client";

import { Text } from "@/components/Text";
import { getRandomChallengeByRegion } from "@/lib/actions/get-challenge";
import { recordScore } from "@/lib/actions/get-scores";
import Link from "next/link";
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
      });
    }
  }, [isGameOver, challenge, input, timerSeconds]);

  // Convert URL parameter back to display format
  const displayRegion = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Region Title */}
      <div className="border border-black p-4 bg-white">
        <Text className="text-2xl">
          {displayRegion}: {challenge && challenge.title}
        </Text>
      </div>

      {challenge && <audio controls src={challenge.audioURL} />}

      {/* Score Block */}
      {isGameOver && (
        <div className="border border-black p-4 bg-white">
          <Text className="text-xl">Score: {score}</Text>
        </div>
      )}

      {/* Timer Block */}
      <div className="border border-black p-4 bg-white">
        <Text className="text-xl">{timerSeconds} seconds left</Text>
      </div>

      {/* Text Input Area */}
      <div className="flex flex-col gap-4">
        {/* Area where words show up if we are doing it */}
        <div className="min-h-20 border border-black p-4 bg-gray-100">
          {errorOutput.map(({ word, error }, index) =>
            error ? (
              <span key={index} className="text-lg text-red-500">
                {word}{" "}
              </span>
            ) : (
              <span key={index} className="text-lg text-green-500">
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
          className="w-full p-4 border border-black text-lg focus:outline-none"
        />
      </div>

      {/* Back Button */}
      <Link
        href="/region"
        className="bg-gray-600 py-1 px-8 border border-black self-start"
      >
        <Text className="text-xl">Back</Text>
      </Link>
    </div>
  );
}

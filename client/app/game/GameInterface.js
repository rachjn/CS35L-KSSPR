"use client";

import { Text } from "@/components/Text";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function getErrorOutput(transcript, input) {
  const transcriptWords = transcript.split(" ");
  const inputWords = input.split(" ");

  const output = [];

  for (let i = 0; i < inputWords.length - 1; i++) {
    if (inputWords[i] !== transcriptWords[i]) {
      output.push({ word: inputWords[i], error: true });
    } else {
      output.push({ word: inputWords[i], error: false });
    }
  }

  return output;
}

export default function GameInterface() {
  const searchParams = useSearchParams();
  const region = searchParams.get("region");
  const [input, setInput] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [errorOutput, setErrorOutput] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/challenges/region?region=" + region)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const challengeIndex = Math.floor(Math.random() * data.length);
        setChallenge(data[challengeIndex]);
      });
  }, [region]);

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
      <div className="border border-black p-4 bg-white">
        <Text className="text-xl">Score: 0</Text>
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
              <span key={index} className="text-lg">
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
          onChange={(e) => {
            setInput(e.target.value);
            setErrorOutput(
              getErrorOutput(challenge.transcript, e.target.value),
            );
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

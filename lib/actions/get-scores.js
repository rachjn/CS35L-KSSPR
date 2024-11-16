"use server";

import { Challenge, Score } from "@/lib/database.mjs";

// Carried over from GameInterface.js (used to remove punctuation in transcript/input)
const removePunctuation = (word) => word.replace(/[^\w\s]|_/g, "");

export async function getScoreByUser() {
  const scores = await Score.findAll({
    where: {
      userId: 1,
    },
  });

  return JSON.parse(JSON.stringify(scores));
}

export async function createScore(value) {
  const createdScore = await Score.create({
    userId: 1,
    value,
  });

  return createdScore.toJSON();
}

function calculateScore(transcript, input, timeLeft) {
  const transcriptWords = transcript.split(" ").map(removePunctuation);
  const inputWords = input.split(" ").map(removePunctuation);

  let correctWords = 0;
  let incorrectWords = 0;
  for (
    let i = 0;
    i < Math.min(inputWords.length, transcriptWords.length);
    i++
  ) {
    if (inputWords[i].toLowerCase() === transcriptWords[i].toLowerCase())
      correctWords++;
    else
      incorrectWords++;
  }

  // Score is calculated based on the number of correct words, the number of incorrect words, and the time left
  // Raw score is between 0 (no words correct) and 100 (all words correct), with a bonus of 1 for each remaining second left
  let score = (correctWords * 100 / transcriptWords.length) - (incorrectWords * 20 / transcriptWords.length) + timeLeft;
  score = Math.max(0, Math.min(100, score));
  score = parseFloat(score.toFixed(3));
  return score;
}

export async function recordScore(challengeId, input, timeLeft) {
  const challenge = await Challenge.findOne({
    where: {
      id: challengeId,
    },
  });

  const score = calculateScore(challenge.transcript, input, timeLeft);
  const createdScore = await Score.create({
    userId: 1,
    challengeId,
    value: score,
  });
  return createdScore.toJSON();
}

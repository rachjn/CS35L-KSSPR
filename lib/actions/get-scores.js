"use server";

import prisma, { Challenge, Score } from "@/lib/database.js";

// Carried over from GameInterface.js (used to remove punctuation in transcript/input)
// WIP: Also need to remove hyphen from here
const removePunctuation = (word) => word.replace(/[^\w\s]|_/g, "");

export async function getScoreByUser(userId) {
  const scores = await prisma.score.findMany({
    where: {
      userId,
    },
    include: {
      challenge: {
        select: {
          region: true,
        },
      },
    },
    orderBy: {
      score: "desc",
    },
    take: 3,
  });

  return scores;
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
    else incorrectWords++;
  }

  // Score is calculated based on the number of correct words, the number of incorrect words, and the time left
  // Raw score is between 0 (no words correct) and 100 (all words correct), with a bonus of 1 for each remaining second left
  let score =
    (correctWords * 100) / transcriptWords.length -
    (incorrectWords * 20) / transcriptWords.length +
    timeLeft;
  score = Math.max(0, Math.min(100, score));
  score = parseFloat(score.toFixed(3));
  return score;
}

export async function recordScore(userId, challengeId, input, timeLeft) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  const score = calculateScore(challenge.transcript, input, timeLeft);
  const createdScore = await prisma.score.create({
    data: {
      score,
      userId,
      challengeId,
    },
  });

  return createdScore;
}

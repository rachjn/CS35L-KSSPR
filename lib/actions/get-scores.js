"use server";

import prisma from "@/lib/database.js";
import { removePunctuation } from "../utils";
import { currentUser } from "../auth";

export async function getScoreById(scoreId) {
  const score = await prisma.score.findUnique({
    where: { id: scoreId },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      challenge: {
        select: {
          region: true,
        },
      },
    },
  });

  if (!score) return null;

  return {
    ...score,
    score: score.score.toNumber(),
    wpm: score.wpm.toNumber(),
  };
}

export async function getTopScores(limit) {
  const scores = await prisma.score.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
      challenge: {
        select: {
          region: true,
        },
      },
    },
    orderBy: {
      score: "desc",
    },
    take: limit,
  });

  return scores.map((score) => ({
    ...score,
    // Prisma is incompatible with JSON serialization so needed to include this line and the wpm line
    score: score.score.toNumber(),
    wpm: score.wpm.toNumber(),
  }));
}

export async function getUserScores() {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const scores = await prisma.score.findMany({
    where: { userId: user.id },
    include: {
      challenge: {
        select: {
          region: true,
        },
      },
    },
  });

  return scores.map((score) => ({
    ...score,
    score: score.score.toNumber(),
    wpm: score.wpm.toNumber(),
  }));
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

  // Calculate the WPM
  const totalTime = 60 - timeLeft;
  let wpm = ((inputWords.length - 1) / totalTime) * 60;
  wpm = parseFloat(wpm.toFixed(3));
  return { score, wpm };
}

export async function recordScore(challengeId, input, timeLeft) {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  const { score, wpm } = calculateScore(challenge.transcript, input, timeLeft);
  const createdScore = await prisma.score.create({
    data: {
      score,
      wpm,
      userId: user.id,
      challengeId,
    },
  });

  return {
    ...createdScore,
    score: createdScore.score.toNumber(),
    wpm: createdScore.wpm.toNumber(),
  };
}

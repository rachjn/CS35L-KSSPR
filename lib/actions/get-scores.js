"use server";

import { Challenge, Score } from "@/lib/database.mjs";

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
  const transcriptWords = transcript.split(" ");
  const inputWords = input.split(" ");

  let correctWords = 0;
  for (
    let i = 0;
    i < Math.min(inputWords.length, transcriptWords.length);
    i++
  ) {
    if (inputWords[i].toLowerCase() === transcriptWords[i].toLowerCase())
      correctWords++;
  }

  return correctWords + timeLeft;
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

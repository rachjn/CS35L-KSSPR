"use server";

import { User, Challenge, Score } from "@/lib/database.mjs";

// Carried over from GameInterface.js (used to remove punctuation in transcript/input)
// WIP: Also need to remove hyphen from here
const removePunctuation = (word) => word.replace(/[^\w\s]|_/g, "");

export async function getScoreByUser(userId) {
  const scores = await Score.findAll({
    where: {
      userId: userId,
    },
    include: [{
      model: Challenge,
      attributes: ['region'],
    }],
    order: [['value', 'DESC']],
    // limit: 3,
  });

  return JSON.parse(JSON.stringify(scores));
}

export async function getTopScores(limit = 10) {
  const scores = await Score.findAll({
    include: [
      {
        model: User,
        attributes: ['email'],
      },
      {
        model: Challenge,
        attributes: ['region'],
      },
    ],
    order: [['value', 'DESC']],
    limit,
  });

  return JSON.parse(JSON.stringify(scores));
}

// Not sure if this is needed? Doesn't seem like we are calling this anywhere
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

  // Calculate the WPM
  const totalTime = 60 - timeLeft;
  let wpm = ((inputWords.length - 1) / totalTime) * 60;
  wpm = parseFloat(wpm.toFixed(3));
  return {score, wpm};
}

export async function recordScore(userId, challengeId, input, timeLeft) {
  const challenge = await Challenge.findOne({
    where: {
      id: challengeId,
    },
  });

  const {score, wpm} = calculateScore(challenge.transcript, input, timeLeft);
  const createdScore = await Score.create({
    userId, // Dynamic passing
    challengeId,
    value: score,
    wpm: wpm,
  });
  return createdScore.toJSON();
}

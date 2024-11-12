import { Router } from "express";
import { Challenge, Score } from "../database.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const scores = await Score.findAll({
      where: {
        userId: req.query.userId,
      },
    });
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ error: "Error fetching scores" });
  }
});

router.post("/", async (req, res) => {
  try {
    const scores = await Score.create({
      userId: req.body.userId,
      value: req.body.value,
    });
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error creating score:", error);
    res.status(500).json({ error: "Error creating score" });
  }
});

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

router.post("/record", async (req, res) => {
  const challengeId = req.body.challengeId;
  const challenge = await Challenge.findOne({
    where: {
      id: challengeId,
    },
  });
  const timeLeft = req.body.timeLeft;
  const score = calculateScore(challenge.transcript, req.body.input, timeLeft);
  try {
    const scores = await Score.create({
      userId: 1,
      challengeId,
      value: score,
    });
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error creating score:", error);
    res.status(500).json({ error: "Error creating score" });
  }
});
export default router;

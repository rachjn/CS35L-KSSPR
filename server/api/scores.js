import { Router } from "express";
import { Score } from "../database.js";

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
    res.status(500).json({ error: "Error fetching users" });
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
    console.error("Error fetching scores:", error);
    res.status(500).json({ error: "Error creating score" });
  }
});

export default router;

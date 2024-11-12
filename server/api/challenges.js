import { Router } from "express";
import { Challenge, Score } from "../database.js";
import { Sequelize } from "sequelize";

const router = Router();

router.get("/", async (req, res) => {
  try {
    if (req.query.id) {
      const challenges = await Challenge.findOne({
        where: {
          id: req.query.id,
        },
      });
      res.status(200).json(challenges);
    } else {
      const challenges = await Challenge.findAll();
      res.status(200).json(challenges);
    }
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Error fetching challenges" });
  }
});

router.get("/region", async (req, res) => {
  try {
    const challenges = await Challenge.findAll({
      where: {
        region: req.query.region,
      },
    });
    res.status(200).json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Error fetching challenges" });
  }
});

router.get("/region/random", async (req, res) => {
  try {
    // use ORDER BY RANDOM
    const challenge = await Challenge.findOne({
      where: {
        region: req.query.region,
      },
      order: Sequelize.literal("RANDOM()"),
    });
    res.status(200).json(challenge);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Error fetching challenges" });
  }
});

export default router;

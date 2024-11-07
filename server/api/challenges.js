import { Router } from "express";
import { Challenge, Score } from "../database.js";

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

export default router;

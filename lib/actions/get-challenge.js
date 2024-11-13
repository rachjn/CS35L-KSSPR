"use server";

import { Challenge } from "@/lib/database.mjs";
import { Sequelize } from "sequelize";

export async function getChallengeById(challengeId) {
  const challenge = Challenge.findOne({
    where: {
      id: challengeId,
    },
  });

  return (await challenge).toJSON();
}

export async function getRandomChallengeByRegion(region) {
  const challenge = await Challenge.findOne({
    where: {
      region,
    },
    order: Sequelize.literal("RANDOM()"),
  });

  return challenge.toJSON();
}

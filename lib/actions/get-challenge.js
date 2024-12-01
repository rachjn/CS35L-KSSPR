"use server";

import prisma from "@/lib/database.js";

export async function getChallengeById(challengeId) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  return challenge;
}

export async function getRandomChallengeByRegion(region) {
  /**
   * @type {import("@prisma/client").Challenge}
   */
  const [challenge] =
    await prisma.$queryRaw`select * from "Challenge" where region = ${region} order by random() limit 1`;

  return challenge;
}

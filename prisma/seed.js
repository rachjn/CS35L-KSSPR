import prisma from "../lib/database.js";
import fs from "fs";
import path from "path";

async function main() {
  const challengeData = JSON.parse(
    fs.readFileSync(path.join("prisma", "challenges.json"), "utf-8"),
  );

  await Promise.all(
    challengeData.map(async (challenge) => {
      await prisma.challenge.upsert({
        where: { id: challenge.id },
        update: {},
        create: challenge,
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

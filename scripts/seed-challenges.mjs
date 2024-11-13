import { sequelize, Challenge } from "../lib/database.mjs";
import fs from "fs";
import path from "path";

await sequelize.sync();
const challengeData = JSON.parse(
  fs.readFileSync(path.join("scripts", "challenges.json"), "utf-8"),
);
await Challenge.bulkCreate(challengeData);

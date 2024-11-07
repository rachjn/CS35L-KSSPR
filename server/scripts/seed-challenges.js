import fs from "fs";
import { sequelize, Challenge } from "../database.js";

await sequelize.sync();
const challengeData = JSON.parse(fs.readFileSync("challenges.json", "utf-8"));
Challenge.bulkCreate(challengeData);

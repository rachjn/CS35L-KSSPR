import { sequelize } from "../lib/database.mjs";

await sequelize.sync();

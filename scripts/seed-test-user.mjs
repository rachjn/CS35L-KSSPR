import { sequelize, User } from "../lib/database.mjs";

await sequelize.sync();

await User.create({
  email: "test@test.com",
  password: "xyz",
});

import { sequelize, User } from "../database.js";

await sequelize.sync();

await User.create({
  email: "test@test.com",
  password: "xyz",
});

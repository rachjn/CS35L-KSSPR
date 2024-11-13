import { nextAuthAdapter } from "../auth.js";
import { sequelize } from "../database.js";

await sequelize.sync();

await nextAuthAdapter.createUser({
  id: "1",
  email: "test@test.com",
  emailVerified: new Date(),
});

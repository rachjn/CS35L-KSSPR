import SequelizeAdapter from "@auth/sequelize-adapter";
import {
  sequelize,
  Account,
  Session,
  User,
  VerificationToken,
} from "./database.js";

export const nextAuthAdapter = SequelizeAdapter(sequelize, {
  models: {
    Account,
    Session,
    User,
    VerificationToken,
  },
});

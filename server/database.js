import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { models } from "@auth/sequelize-adapter";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../server/database.sqlite"),
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful.");
  })
  .catch((err) => {
    console.log("Error connecting.");
  });

const Score = sequelize.define(
  "Score",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    challengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "scores",
    timestamps: false,
  },
);

const Challenge = sequelize.define(
  "Challenge",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    audioURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transcript: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "challenges",
    timestamps: false,
  },
);

const Account = sequelize.define("Account", models.Account);
const Session = sequelize.define("Session", models.Session);
const User = sequelize.define("User", models.User);
const VerificationToken = sequelize.define(
  "VerificationToken",
  models.VerificationToken,
);

// score has many-to-one relationship with user and challenge
User.hasMany(Score, { foreignKey: "userId" });
Score.belongsTo(User, {
  foreignKey: "userId",
});
Challenge.hasMany(Score, { foreignKey: "challengeId" });
Score.belongsTo(Challenge, { foreignKey: "challengeId" });

export {
  sequelize,
  User,
  Account,
  Session,
  VerificationToken,
  Score,
  Challenge,
};

import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import dialectModule from "sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../server/database.sqlite"),
  dialectModule,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful.");
  })
  .catch((err) => {
    console.log("Error connecting.");
  });

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  },
);

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

// score has many-to-one relationship with user and challenge
User.hasMany(Score, { foreignKey: "userId" });
Score.belongsTo(User, {
  foreignKey: "userId",
});
Challenge.hasMany(Score, { foreignKey: "challengeId" });
Score.belongsTo(Challenge, { foreignKey: "challengeId" });

export { sequelize, User, Score, Challenge };

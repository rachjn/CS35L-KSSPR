import express from "express";
import bodyParser from "body-parser";
import users from "./api/users.js";
import scores from "./api/scores.js";
import challenges from "./api/challenges.js";
import cors from "cors";
import { ExpressAuth } from "@auth/express";
import { sequelize, User } from "./database.js";
import { nextAuthAdapter } from "./auth.js";
import CredentialsProvider from "next-auth/providers/credentials";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.set("trust proxy", true);
app.use(
  "/auth/*",
  ExpressAuth({
    providers: [
      CredentialsProvider.default({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const user = await User.findOne({
            email: credentials.email,
            password: credentials.password,
          });

          return user ? user : null;
        },
      }),
    ],
    adapter: nextAuthAdapter,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", users);
app.use("/api/scores", scores);
app.use("/api/challenges", challenges);

app.get("/bye", (req, res) => {
  res.send("Bye!");
});

async function main() {
  await sequelize.sync();
  console.log("Database connected!");

  app.listen(3001, () => {
    console.log(`API server listening at http://localhost:3001`);
  });
}

main().catch((err) => {
  console.error("Error running server:", err);
});

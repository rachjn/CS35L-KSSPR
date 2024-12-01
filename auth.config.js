import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          console.error("User not found: ", email);
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          console.log("Pass match");
          return user;
        }
      },
    }),
  ],
};

export default authConfig;

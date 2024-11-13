// import { sequelize, User } from "@/lib/database.mjs";
// import SequelizeAdapter from "@auth/sequelize-adapter";
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

export { GET, POST } from "@/auth";

// const handler = NextAuth({
//   adapter: SequelizeAdapter(sequelize),
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize({ email, password }) {
//         // need something here
//       },
//     }),
//   ],
// });

// export { handler as GET, handler as POST };

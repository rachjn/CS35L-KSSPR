import prisma from "../lib/database.js";
import bcrypt from "bcryptjs";

async function main() {
  await prisma.user.upsert({
    where: { email: "test@test.io" },
    update: {},
    create: {
      email: "test@test.io",
      password: await bcrypt.hash("password", 10),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

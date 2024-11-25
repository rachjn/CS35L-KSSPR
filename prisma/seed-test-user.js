import prisma from "../lib/database.js";

async function main() {
  await prisma.user.upsert({
    where: { email: "test@test.io" },
    update: {},
    create: {
      email: "test@test.io",
      password: "password",
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

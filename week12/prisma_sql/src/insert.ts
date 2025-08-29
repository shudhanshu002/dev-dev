import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      username: "admin123",
      email: "admin@example.com",
      password: "securepass"
    }
  });

  console.log("✅ User created:", newUser);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

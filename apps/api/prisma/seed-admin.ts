import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const SALT_ROUNDS = 12;

async function main() {
  const name = "Himesh Roy";
  const email = "himeshroy.cse@gmail.com";
  const password = "parronotes@123";

  console.log("Creating Parro Notes admin...");

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (existingAdmin) {
    console.log("Admin with this email already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(
    password,
    SALT_ROUNDS,
  );

  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      passwordHash,
      isActive: true,
    },
  });

  console.log("Admin created successfully.");
  console.log(`Email: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("Admin creation failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
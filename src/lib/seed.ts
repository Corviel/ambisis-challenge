import { PrismaClient } from "@prisma/client";
import { mockCompanies } from "./mockData";
const prisma = new PrismaClient();

async function seed() {
  for (const company of mockCompanies) {
    await prisma.company.create({ data: company });
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // // Generate fake data for todo model
  // await prisma.todo.createMany({
  //   data: Array.from({ length: 20 }, () => ({
  //     title: faker.lorem.words(),
  //     body: faker.lorem.words({ min: 5, max: 12 }),
  //     completed: faker.datatype.boolean(),
  //     createdAt: new Date(),
  //   })),
  // });
  // // Generate fake data for user model
  // await prisma.user.createMany({
  //   data: Array.from({ length: 20 }, () => ({
  //     email: faker.internet.email(),
  //     name: faker.internet.userName(),
  //   })),
  // });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

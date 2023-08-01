// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy book
  const hashedPassword = await bcrypt.hash('test@123', 10);
  const book = await prisma.book.upsert({
    where: { title: 'Slow Horses' },
    update: {},
    create: {
      title: 'Slow Horses',
      coverImage:
        'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
      price: 20,
      tag: ['Award-winning', 'thriller'],
      writer: 'Mike Herron',
      quantity: 10,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      type: Role.ADMIN,
      points: 100,
    },
  });

  console.log({ book, admin });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

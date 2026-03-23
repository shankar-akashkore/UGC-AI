import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 'user_2taIe5d9K0i4wQ9FZbS1p2O3M4n' }, // We'll get real ID next
    update: { credits: 20 },
    create: {
      id: 'placeholder',
      email: 'test@example.com',
      name: 'Test User',
      image: '',
      credits: 20
    }
  });
  console.log(user);
}
main()

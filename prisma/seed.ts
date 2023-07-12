import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserTypeEnum } from '../src/enums/enums';

const prisma = new PrismaClient();

async function main() {
  const userTypes = await prisma.userType.createMany({
    data: [
      {
        id: 1,
        name: 'super',
      },
      {
        id: 2,
        name: 'owner',
      },
      {
        id: 3,
        name: 'employee',
      },
    ],
  });
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'super',
        email: 'super@super.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.SUPER,
      },
      {
        name: 'maghraby',
        email: 'maghraby@gmail.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.OWNER,
      },
      {
        name: 'employee',
        email: 'employee@employee.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.EMPLOYEE,
      },
    ],
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

import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UserTypeEnum } from 'src/enums/enums';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create({ name, businessPartners }: CreateCompanyDto, auth: User) {
    const createdCompany = await this.prisma.company.create({
      data: {
        name,
      },
      include: {
        users: {
          select: {
            isBusinessPartner: true,
          },
        },
      },
    });

    const hash = await bcrypt.hash('123456', 10);
    await this.prisma.user.createMany({
      data: businessPartners.map((bp: User) => {
        return {
          ...bp,
          password: hash,
          userTypeId: UserTypeEnum.OWNER,
          isBusinessPartner: true,
          companyId: createdCompany.id,
        };
      }),
    });
    return createdCompany;
  }

  findOne(id: number) {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }

  findAll(name: string) {
    return this.prisma.company.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
  }
}

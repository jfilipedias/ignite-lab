import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCostumerDTO {
  authUserId: string;
}

@Injectable()
export class CostumersService {
  constructor(private prisma: PrismaService) { }

  async getCostumerByAuthUserId(authUserId: string) {
    return this.prisma.costumer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createCostumer({ authUserId }: CreateCostumerDTO) {
    return this.prisma.costumer.create({
      data: {
        authUserId,
      },
    });
  }
}

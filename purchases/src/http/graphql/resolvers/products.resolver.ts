import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private prisma: PrismaService) { }

  @Query(() => [Product])
  @UseGuards(AuthorizationGuard)
  async products() {
    return this.prisma.product.findMany();
  }
}

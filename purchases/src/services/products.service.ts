import slugify from 'slugify';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateProductDTO {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductDTO) {
    const slug = slugify(title, { lower: true });

    const hasProductWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (hasProductWithSameSlug) {
      throw new Error('Product with the same slug already exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}

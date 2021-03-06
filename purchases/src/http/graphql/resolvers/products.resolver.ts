import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProductsService } from '../../../services/products.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProductInput } from '../inputs/createProductInput';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) { }

  @Query(() => [Product])
  async products() {
    return this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  async createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}

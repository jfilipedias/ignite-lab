import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CustomersService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';
import { CreatePurchaseInput } from '../inputs/createPurchaseInput';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
  ) { }

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  async purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    const customer = await this.customersService.getCostumerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      this.customersService.createCostumer({ authUserId: user.sub });
    }

    return this.purchasesService.createPurchase({
      costumerId: customer.id,
      productId: data.productId,
    });
  }
}

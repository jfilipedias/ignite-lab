import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';
import { Customer } from '../models/customer';
import { Purchase } from '../models/purchase';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) { }

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCostumerByAuthUserId(user.sub);
  }

  @ResolveField(() => Purchase)
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }
}
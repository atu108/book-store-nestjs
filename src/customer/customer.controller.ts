import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { OrderDto } from './dto/create-order.dto';
import { User } from '../utils /decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../utils /decorators/roles.decorator';
import { Role } from '@prisma/client';

const routeName = 'customer';
@Controller(routeName)
@ApiTags(routeName)
@ApiBearerAuth('token')
@Roles(Role.CUSTOMER)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/order/:bookId')
  create(@Param('bookId') bookId: number, @User('id') userId: number) {
    return this.customerService.createOrder(+bookId, +userId);
  }

  @Get('/profile')
  getProfile(@User('id') userId: number) {
    return this.customerService.getProfile(+userId);
  }
  @Get('/orders')
  findAll(@User('id') userId: number) {
    return this.customerService.getOrders(+userId);
  }
}

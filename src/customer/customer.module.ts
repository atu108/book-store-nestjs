import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';
import { OrdersModule } from '../orders/orders.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [BooksModule, UsersModule, OrdersModule, PrismaModule],
})
export class CustomerModule {}

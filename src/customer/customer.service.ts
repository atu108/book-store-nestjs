import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';
import { OrdersService } from '../orders/orders.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly bookService: BooksService,
    private readonly orderService: OrdersService,
  ) {}

  async createOrder(bookId, userId) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const { price: bookPrice } = await this.bookService.findOne(bookId);
      const userBalance = await this.userService.getUserBalance(userId);
      if (bookPrice > userBalance) {
        throw new Error('Low balance');
      }
      const result = await this.orderService.create({
        userId,
        bookId,
        amount: bookPrice,
      });
      await this.userService.updateUserPoints(userId, userBalance - bookPrice);
      await this.bookService.decreaseBookQuantity(bookId);
      return result;
    });
    return result;
  }

  getOrders(userId) {
    return this.orderService.findByUserId(userId);
  }

  async getProfile(userId) {
    const { password, ...rest } = await this.userService.findOne(userId);
    return rest;
  }
}

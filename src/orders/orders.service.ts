// orders/order.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(orderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: orderDto,
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findById(id: number) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  findByUserId(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        book: true,
      },
    });
  }
}

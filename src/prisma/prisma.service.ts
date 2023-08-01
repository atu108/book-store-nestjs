// src/prisma/prisma.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    try {
      await this.prisma.$connect();
      console.log('Prisma client connected successfully!');
    } catch (error) {
      console.error('Error connecting to Prisma client:', error);
      throw new Error('Failed to connect to the database.');
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}

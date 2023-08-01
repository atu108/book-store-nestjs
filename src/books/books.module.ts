// src/articles/articles.module.ts

import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [PrismaModule],
  exports: [BooksService],
})
export class BooksModule {}
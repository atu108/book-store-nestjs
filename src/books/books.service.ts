import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({ data: createBookDto });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  decreaseBookQuantity(id: number, by = 1) {
    return this.prisma.book.update({
      where: { id },
      data: { quantity: { decrement: by } },
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}

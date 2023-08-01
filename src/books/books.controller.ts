import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception.filter';
import { Roles } from '../utils /decorators/roles.decorator';
import { Role } from '@prisma/client';

const routeName = 'books';
@Controller(routeName)
@ApiTags(routeName)
@ApiBearerAuth('token')
@UseFilters(PrismaClientExceptionFilter)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const book = await this.booksService.findOne(+id);
    if (!book) {
      throw new NotFoundException(`Could not find book with ${id}.`);
    }
    return book;
  }
}

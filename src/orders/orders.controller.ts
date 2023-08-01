import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../utils /decorators/roles.decorator';
import { Role } from '@prisma/client';

const routeName = 'orders';
@ApiTags(routeName)
@ApiBearerAuth('token')
@Controller(routeName)
@Controller(routeName)
@Roles(Role.ADMIN)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return this.ordersService.create(createOrderDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ordersService.findById(+id);
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.ordersService.findById(+userId);
  }
}

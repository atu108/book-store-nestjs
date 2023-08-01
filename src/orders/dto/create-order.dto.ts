// orders/dto/order.dto.ts

import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

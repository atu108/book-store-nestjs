// orders/dto/order.dto.ts

import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;
}

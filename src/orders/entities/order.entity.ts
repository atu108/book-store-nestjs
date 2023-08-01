import { Order } from '@prisma/client';
export class OrderEntity implements Order {
  id: number;
  userId: number;
  bookId: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

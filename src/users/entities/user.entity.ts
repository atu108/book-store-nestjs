import { Role, User } from '@prisma/client';
export class UserEntity implements User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: Role;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

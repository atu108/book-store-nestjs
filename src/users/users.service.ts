import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    /*
      pagination not implemented can be easily done
      also no columns are hidden like password
    */
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByEmail(email) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUserBalance(id) {
    return (await this.findOne(id)).points;
  }
  async updateUserPoints(id, points) {
    return this.prisma.user.update({
      where: { id },
      data: { points },
    });
  }
}

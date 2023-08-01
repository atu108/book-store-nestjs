import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { Roles } from '../utils /decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const routeName = 'users';
@Controller(routeName)
@ApiTags(routeName)
@ApiBearerAuth('token')
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

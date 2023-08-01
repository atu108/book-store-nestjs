// auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(createUserDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = {
      ...createUserDto,
      password: hashedPassword,
      points: 100,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.usersService.create(user);
    return rest;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByEmail(loginDto.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const payload = { id: user.id, email: user.email, type: user.type };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
    });

    return {
      accessToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}

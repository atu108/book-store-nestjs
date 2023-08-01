// auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../utils /decorators/public.decorator';

const routeName = 'auth';
@ApiTags(routeName)
@Controller(routeName)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body(ValidationPipe) register: RegisterDto) {
    try {
      return await this.authService.register(register);
    } catch (error) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}

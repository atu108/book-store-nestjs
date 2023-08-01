// auth/dto/create-user.dto.ts

import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

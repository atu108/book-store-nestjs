import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  coverImage: string;

  @IsString()
  price: number;

  @IsString()
  tag: string[];

  @IsString()
  writer: string;

  @IsNumber()
  quantity: number;
}

import { Role } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

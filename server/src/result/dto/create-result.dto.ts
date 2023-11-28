// create-timestamp.dto.ts

import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateResultDto {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsString()
  timestamp: string;
}

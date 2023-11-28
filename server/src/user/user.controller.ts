import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.userService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() res: Response) {
    return this.userService.findOne(id, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.update(id, updateUserDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    return this.userService.remove(id, res);
  }
}

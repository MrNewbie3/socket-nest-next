import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto, res: Response): Promise<any> {
    try {
      const isExist = await this.prismaService.user.findUnique({
        where: {
          username: createUserDto.username,
        },
      });
      if (isExist) {
        return res.status(HttpStatus.CONFLICT).send({
          success: false,
          code: HttpStatus.CONFLICT,
          message: 'Already exist',
          data: createUserDto,
        });
      }
      const currentPass = createUserDto.password;
      const password = await bcrypt.hash(currentPass, 10);
      const user = await this.prismaService.user.create({
        data: { ...createUserDto, password },
      });
      return res.status(HttpStatus.CREATED).send({
        success: true,
        code: HttpStatus.CREATED,
        message: 'Success provide request',
        data: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: createUserDto,
      });
    }
  }

  async findAll(res: Response): Promise<any> {
    try {
      const user = await this.prismaService.user.findMany();
      return res.status(HttpStatus.OK).send({
        success: true,
        code: HttpStatus.OK,
        message: 'Success provide request',
        data: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: [],
      });
    }
  }

  async findOne(id: number, res: Response): Promise<any> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          code: HttpStatus.NOT_FOUND,
          message: 'user not found',
          data: null,
        });
      }
      return res.status(HttpStatus.OK).send({
        success: true,
        code: HttpStatus.OK,
        message: 'Success provide request',
        data: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: [],
      });
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    res: Response,
  ): Promise<any> {
    let password: string;
    let data = updateUserDto;
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          code: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        });
      }

      if (updateUserDto.password) {
        password = await bcrypt.hash(updateUserDto.password, 10);
        data = { ...data, password };
      }
      // Update user properties based on updateUserDto
      const updatedUser = await this.prismaService.user.update({
        where: {
          id: Number(id),
        },
        data,
      });

      return res.status(HttpStatus.OK).send({
        success: true,
        code: HttpStatus.OK,
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
        data: null,
      });
    }
  }

  async remove(id: number, res: Response): Promise<any> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          code: HttpStatus.NOT_FOUND,
          message: 'user not found',
          data: null,
        });
      }
      const deleteData = await this.prismaService.user.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(HttpStatus.OK).send({
        success: true,
        code: HttpStatus.OK,
        message: 'Success provide request',
        data: deleteData,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: [],
      });
    }
  }
}

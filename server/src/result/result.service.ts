import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class ResultService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createResultDto: CreateResultDto, res: Response) {
    try {
      const id = createResultDto.userId;
      const isUserExist = await this.prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!isUserExist) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          code: HttpStatus.NOT_FOUND,
          message: 'user not found',
          data: null,
        });
      }
      const result = await this.prismaService.result.create({
        data: createResultDto,
      });
      return res.status(HttpStatus.CREATED).send({
        success: true,
        code: HttpStatus.CREATED,
        message: 'success providing service',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: createResultDto,
      });
    }
  }

  // return res.status(HttpStatus.NOT_FOUND).send({
  //   success: false,
  //   code: HttpStatus.NOT_FOUND,
  //   message: 'user not found',
  //   data: null,
  // });
  async findAll(res: Response) {
    try {
      const result = await this.prismaService.result.findMany();
      if (result.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          code: HttpStatus.NOT_FOUND,
          message: 'no result found',
          data: null,
        });
      }
      return res.status(HttpStatus.OK).send({
        success: true,
        code: HttpStatus.OK,
        message: 'success provided service',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: null,
      });
    }
  }

  async findOne(id: number, res: Response) {
    try {
      const data = await this.prismaService.result.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!data) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          code: HttpStatus.NOT_FOUND,
          message: 'no data found',
          data: null,
        });
      }

      return res.status(HttpStatus.OK).send({
        success: true,
        code: HttpStatus.OK,
        message: 'success providing service',
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: null,
      });
    }
  }

  async update(id: number, updateResultDto: UpdateResultDto, res: Response) {
    try {
      const isUserExist = await this.prismaService.result.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!isUserExist) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          code: HttpStatus.NOT_FOUND,
          message: 'user not found',
          data: null,
        });
      }
      const result = await this.prismaService.result.update({
        data: updateResultDto,
        where: {
          id: Number(id),
        },
      });
      return res.status(HttpStatus.OK).send({
        success: true,
        code: HttpStatus.OK,
        message: 'success providing service',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: updateResultDto,
      });
    }
  }

  async remove(id: number, res: Response) {
    try {
      const data = await this.prismaService.result.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!data) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          code: HttpStatus.NOT_FOUND,
          message: 'user not found',
          data: null,
        });
      }
      const result = await this.prismaService.result.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(HttpStatus.OK).send({
        success: true,
        code: HttpStatus.OK,
        message: 'success providing service',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        data: null,
      });
    }
  }
}

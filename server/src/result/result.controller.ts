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
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Response } from 'express';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto, @Res() res: Response) {
    return this.resultService.create(createResultDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.resultService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() res: Response) {
    return this.resultService.findOne(id, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateResultDto: UpdateResultDto,
    @Res() res: Response,
  ) {
    return this.resultService.update(id, updateResultDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    return this.resultService.remove(id, res);
  }
}

import {
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  Res,
  Response,
  HttpCode,
} from '@nestjs/common';
import { Exam } from '../database/exam.model';
import { Observable, map } from 'rxjs';
import { ExamService } from './exam.service';
import { ExamDto } from './exam.dto';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

@Controller({ path: '/exam' })
export class ExamController {
  constructor(private ExamService: ExamService) {}
  @Get('start-exam')
  startExam(@Query('exam-date') date?: string) {
    return this.ExamService.startExam(date);
  }
}

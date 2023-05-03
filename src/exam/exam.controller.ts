import { Controller, Get, Query, Res } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

export class ExamQueryDto {
  @ApiProperty({ default: '2023/03/05', required: false })
  date: string;
}

@Controller({ path: '/exam' })
export class ExamController {
  constructor(private ExamService: ExamService) {}

  @ApiQuery({ type: ExamQueryDto })
  @Get('start-exam')
  async startExam(@Query('date') date = '2023/03/05', @Res() res: any) {

    const result =  await this.ExamService.startExam(date)
    if (typeof result.message != "undefined") {
      return res.status(500).send({message: result.message});
    }
    return res
    .status(200)
    .send({ message: 'exam and university placement completed' });
    
  }
}

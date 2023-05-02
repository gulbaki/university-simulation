import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { EXAM_MODEL } from '../database/database.constants';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Exam } from 'src/database/exam.model';

const URL =
  'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/tr.wikipedia/all-access';
@Injectable()
export class ExamDataInitializerService implements OnModuleInit {
  constructor(
    @Inject(EXAM_MODEL) private examModel: Model<Exam>,
    private readonly httpService: HttpService,
  ) {}

  async onModuleInit(): Promise<void> {
    const oneDaysAgo = new Date(new Date().setDate(new Date().getDate() - 1));
    const fullDate = `${oneDaysAgo.getFullYear()}/${
      oneDaysAgo.getMonth() + 1 < 10
        ? '0' + oneDaysAgo.getMonth()
        : oneDaysAgo.getMonth() + 1
    }/${
      oneDaysAgo.getDate() < 10
        ? '0' + oneDaysAgo.getDate()
        : oneDaysAgo.getDate()
    }`;

    console.log('(Exam) is initialized...');
    await this.examModel.deleteMany({});
    const examData = await lastValueFrom(
      this.httpService.get(`${URL}/${fullDate}`, {}),
    );
    const examArr = [];
    for (const exam of examData.data.items[0].articles) {
      examArr.push({
        // date:  fullDate,
        questions: exam.article,
      });
    }

    await Promise.all([this.examModel.create(examArr)])
      .then
      //   data => console.log(data)
      ();
  }
}

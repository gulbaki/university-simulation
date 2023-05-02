import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {
  EXAM_MODEL,
  STUDENT_MODEL,
  UNIVERSITY_MODEL,
} from '../database/database.constants';
import { ExamModel } from 'src/database/exam.model';
import { StudentModel } from 'src/database/student.model';
import { UniversityModel } from 'src/database/university.model';
import { HttpService } from '@nestjs/axios';

const URL =
  'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/tr.wikipedia/all-access';
@Injectable()
export class ExamService {
  constructor(
    @Inject(EXAM_MODEL) private examModel: ExamModel,
    @Inject(STUDENT_MODEL) private studentModel: StudentModel,
    @Inject(UNIVERSITY_MODEL) private universityModel: UniversityModel,
    private readonly httpService: HttpService,
  ) {}
  public async startExam(date): Promise<any> {
    // const examData = await lastValueFrom(
    //   this.httpService.get(`${URL}/${date}`, {}),
    // );
    const examArr = [];
    // await this.examModel.deleteMany({});

    const [examData] = await Promise.all([
      lastValueFrom(this.httpService.get(`${URL}/${date}`, {})),
      this.examModel.deleteMany({}),
    ]);
    for (const exam of examData.data.items[0].articles) {
      examArr.push({
        questions: exam.article,
      });
    }
    // await this.examModel.create(examArr);

    // const examQuestions = await this.examModel.find({}, { questions: 1 });
    const students = await this.studentModel.find(
      {},
      { name: 1, surname: 1, points: 1 },
    );

    const studentWithScore = [];

    for (const student of students) {
      const clearStudent = this.remDup(student.name + student.surname);
      let points = 0;
      for (const examQuestion of examArr) {
        points += this.calculateScore(
          clearStudent,
          this.remDup(examQuestion.questions),
        );
      }

      student.points = points;
      studentWithScore.push({
        updateOne: {
          filter: { _id: student._id },
          update: { $set: { points: student.points } },
          upsert: false,
        },
      });
    }
    await this.studentModel.bulkWrite(studentWithScore);

    const [studentsUniversity, universities] = await Promise.all([
      this.studentModel
        .find({}, { name: 1, surname: 1, points: 1 })
        .sort({ points: -1 }),
      this.universityModel.find({}, { _id: 1 }).sort({ _id: 1 }),
    ]);
    const res = [];
    const chunkedArray = studentsUniversity.reduce(
      (resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 5);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // yeni bir alt dizi oluştur
        }

        resultArray[chunkIndex].push(item._id);

        return resultArray;
      },
      [],
    );

    for (
      let universityIndex = 0;
      universityIndex < universities.length;
      universityIndex++
    ) {
      if (typeof chunkedArray[universityIndex] == 'undefined') break;
      res.push({
        updateOne: {
          filter: { _id: universities[universityIndex]._id },
          update: { $set: { students: chunkedArray[universityIndex] } },
          upsert: false,
        },
      });
    }

    const updatedPoint = await this.universityModel.bulkWrite(res);
    if (updatedPoint.matchedCount > 0) return true;

    return false;
  }

  public remDup = (e) => [...new Set(e)].sort().join('');

  public calculateScore(studentName, articleTitle) {
    let score = 0;
    const matchedChars = [];

    // öğrenci adındaki tüm harfleri döngüye sokuyoruz
    for (let i = 0; i < studentName.length; i++) {
      const char = studentName[i].toLowerCase();
      // eğer bu harf başlıkta daha önce eşleştirildiyse, tekrar eşleştirme yapılmayacak
      if (matchedChars.includes(char)) {
        continue;
      }

      // eğer bu harf başlıkta varsa puan artırılacak ve eşleştirildiği harfler listesine eklenecek
      if (articleTitle.toLowerCase().includes(char)) {
        score++;
        matchedChars.push(char);
      }
    }

    return score;
  }
}

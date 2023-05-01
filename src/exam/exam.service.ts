import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EMPTY, from, lastValueFrom, Observable, of, throwError } from 'rxjs';
import { mergeMap, tap, throwIfEmpty, catchError, map } from 'rxjs/operators';
import { EXAM_MODEL, STUDENT_MODEL, UNIVERSITY_MODEL } from '../database/database.constants';
import { ExamDto } from './exam.dto';
import { Exam, ExamModel } from 'src/database/exam.model';
import { Student, StudentModel } from 'src/database/student.model';
import { UniversityModel } from 'src/database/university.model';
import { HttpService } from '@nestjs/axios';


const URL = "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/tr.wikipedia/all-access"
@Injectable()
export class UniversityService {
    constructor(
        @Inject(EXAM_MODEL) private examModel: ExamModel,
        @Inject(STUDENT_MODEL) private studentModel: StudentModel,
        @Inject(UNIVERSITY_MODEL) private universityModel: UniversityModel,
        private readonly httpService: HttpService
    ) { }
    public async startExam(date): Promise<any> { 
        
        const examData = await lastValueFrom(this.httpService.get( `${URL}/${date}`, {}))
        const examArr = []
        await this.examModel.deleteMany({});
        for (const exam of examData.data.items[0].articles) {
            examArr.push(
                {
                    questions:  exam.article
                }
            )
        }
        await this.examModel.create(examArr)
        const remDup = e => [...new Set(e)].sort().join("");
        const examQuestions = await this.examModel.find({}, { questions: 1 });
        const students = await this.studentModel.find({}, { name: 1, surname: 1, points:1 });

        const studentWithScore = [];
        for (const student of students) {
            const clearStudent = remDup(student.name + student.surname)
            let points = 0;
            for (const examQuestion of examQuestions) {
                points += this.calculateScore(clearStudent, remDup(examQuestion.questions))
            }

            student.points = points
            studentWithScore.push(
                {
                    updateOne:
                    {
                        "filter": { _id: student._id },
                        "update": { '$set': { points: student.points } },
                        "upsert": false,
                    }
                }
            )
        }
        await this.studentModel.bulkWrite(studentWithScore)


        const studentsUniversity = await this.studentModel.find({}, { name: 1, surname: 1, points: 1 }).sort({ points: -1 });
        const universities = await this.universityModel.find({}, { _id: 1 }).sort({ _id: 1 });
        let res = []
        const chunkedArray = studentsUniversity.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / 5)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // yeni bir alt dizi oluştur
            }

            resultArray[chunkIndex].push( item._id )

            return resultArray
        }, [])



        for (let universityIndex = 0; universityIndex < universities.length; universityIndex++) {
            if (typeof chunkedArray[universityIndex] == 'undefined') break;
            res.push({
                updateOne:
                {
                    "filter": { _id: universities[universityIndex]._id },
                    "update": { '$set': { students:  chunkedArray[universityIndex] } },
                    "upsert": false,
                },
            })
        }
            this.universityModel.bulkWrite(res)
    }

    public calculateScore(studentName, articleTitle) {
        let score = 0;
        let matchedChars = [];

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
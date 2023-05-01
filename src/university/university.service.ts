import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { mergeMap, tap, throwIfEmpty, catchError, map } from 'rxjs/operators';
import { STUDENT_MODEL, UNIVERSITY_MODEL } from '../database/database.constants';
import { Student, StudentModel } from '../database/student.model';
import { UniversityDto } from './university.dto';
import { University, UniversityModel } from 'src/database/university.model';
import { Schema, Types } from 'mongoose'
@Injectable()
export class UniversityService {
    constructor(
        @Inject(UNIVERSITY_MODEL) private UniversityModel: UniversityModel,
        @Inject(STUDENT_MODEL) private studentModel: StudentModel,
    ) { }
    findUniversityAll(skip = 0, limit = 10): Observable<University[]> {
        return from(this.UniversityModel.find({}).skip(skip).limit(limit).exec());
    }
    async getUniversityWithStudentById(id: string) {
        //  const UniversityQuery = this.UniversityModel.findOne({ _id: "644eaadf168613d20c864601" });
        const UniversityQuery = await this.UniversityModel.aggregate([
            {
                "$match": {
                    _id: new Types.ObjectId("644f723f26852e1a5a2bf32a")
                },
            },
            {
                $lookup: {
                    from: "students",
                    localField: "students",
                    foreignField: "_id",
                    as: "students",
                },
            },

        ]);
        return UniversityQuery
    }
    deleteUniversityByAll(): Observable<any> {
        return from(this.UniversityModel.deleteMany({}).exec());
    }
    deleteUniversityById(id: string): Observable<University> {
        return from(this.UniversityModel.findOneAndDelete({ _id: id }).exec()).pipe(
            mergeMap((p) => (p ? of(p) : EMPTY)),
            throwIfEmpty(() => new NotFoundException(`student:$id was not found`)),
        );


    }
}
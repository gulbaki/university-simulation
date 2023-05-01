import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { mergeMap, tap, throwIfEmpty, catchError, map } from 'rxjs/operators';
import { STUDENT_MODEL } from '../database/database.constants';
import { Student, StudentModel } from '../database/student.model';
import { StudentDto } from './student.dto';

@Injectable()
export class StudentService {
    constructor(
        @Inject(STUDENT_MODEL) private StudentModel: StudentModel,
        // private sendgridService: SendgridService,
    ) { }

    findStudentAll(skip = 0, limit = 10): Observable<Student[]> {
        return from(this.StudentModel.find({}).skip(skip).limit(limit).exec());
    }
    getStudentById(id: string): Observable<Student> {
        const StudentQuery = this.StudentModel.findOne({ _id: id });
        return from(StudentQuery.exec()).pipe(
            mergeMap((p) => (p ? of(p) : EMPTY)),
            throwIfEmpty(() => new NotFoundException(`Student:${id} was not found`)),
        );
    }
    createStudent(data: StudentDto): Observable<Student> {
            console.log(data)
        const createStudent: Promise<Student> = this.StudentModel.create({
            ...data,
        });
        return from(createStudent);
    }
    deleteStudentByAll(): Observable<any> {
        return from(this.StudentModel.deleteMany({}).exec());
    }
    deleteStudentById(id: string): Observable<Student> {
        return from(this.StudentModel.findOneAndDelete({ _id: id }).exec()).pipe(
            mergeMap((p) => (p ? of(p) : EMPTY)),
            throwIfEmpty(() => new NotFoundException(`student:$id was not found`)),
        );


    }
}
import {
    Inject,
    Injectable,
    OnModuleInit
} from '@nestjs/common';
import { Model } from 'mongoose';
import { STUDENT_MODEL } from '../database/database.constants';
import { Student } from '../database/student.model';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

const URL = "https://randomuser.me/api/?page=1&results=1000&seed=abc&nat=tr"
@Injectable()
export class UserDataInitializerService
    implements OnModuleInit {
    constructor(@Inject(STUDENT_MODEL) private studentModel: Model<Student>,
        private readonly httpService: HttpService) { }

    async onModuleInit(): Promise<void> {
        console.log('(StudentModule) is initialized...');
       await this.studentModel.deleteMany({});
        const studentData = await lastValueFrom(this.httpService.get(URL, {}))
        const studentArr = []
        for (const student of studentData.data.results) {
            studentArr.push(
                {
                    name: student.name.first,
                    surname: student.name.last,
                    email: student.email,
                    university: null,
                    points: 0
                }
            )
        }

        await Promise.all(
            [
             this.studentModel.create(studentArr),
            ]
        ).then(
            //data => console.log(data)
        );
    }

}

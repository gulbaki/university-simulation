import {
    Inject,
    Injectable,
    OnModuleInit
} from '@nestjs/common';
import { Model } from 'mongoose';
import { UNIVERSITY_MODEL } from '../database/database.constants';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { University } from 'src/database/university.model';

const URL = "http://universities.hipolabs.com/search?country=turkey"
@Injectable()
export class UniversityDataInitializerService
    implements OnModuleInit {
    constructor(@Inject(UNIVERSITY_MODEL) private universityModel: Model<University>,
        private readonly httpService: HttpService) { }

    async onModuleInit(): Promise<void> {
       
        console.log('(University) is initialized...');
     await this.universityModel.deleteMany({});
        const universityData = await lastValueFrom(this.httpService.get( `${URL}`, {}))
        const universityArr = []
        for (const university of universityData.data) {
            universityArr.push(
                {
                    name: university.name,
                    points: 0
                }
            )
        }

        await Promise.all(
            [
           this.universityModel.create(universityArr),
            ]
        ).then(
          //  data => console.log(data)
        );
    }

}

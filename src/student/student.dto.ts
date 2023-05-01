import { University } from '../database/university.model';
import { IsNotEmpty } from 'class-validator';

export class StudentDto {
    
@IsNotEmpty()
readonly name: string;
@IsNotEmpty()
readonly surname: string;
@IsNotEmpty()
readonly email: string;
readonly university?: Partial<University>;
readonly points: number;
}

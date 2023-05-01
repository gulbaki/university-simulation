import { Student } from 'src/database/student.model';
import { University } from '../database/university.model';
import { IsNotEmpty } from 'class-validator';

export class ExamDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly city: string;
  @IsNotEmpty()
  readonly quota: string;
  readonly students?: Partial<Student>;
}

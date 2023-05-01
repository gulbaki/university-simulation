import { Connection } from 'mongoose';
import {
  DATABASE_CONNECTION,
  STUDENT_MODEL,
  UNIVERSITY_MODEL,
  EXAM_MODEL,
} from './database.constants';
import { createStudentModel } from './student.model';
import { createUniversityModel } from './university.model';
import { createExamModel } from './exam.model';


export const databaseModelsProviders = [
  {
    provide: STUDENT_MODEL,
    useFactory: (connection: Connection) => createStudentModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: UNIVERSITY_MODEL,
    useFactory: (connection: Connection) => createUniversityModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: EXAM_MODEL,
    useFactory: (connection: Connection) => createExamModel(connection),
    inject: [DATABASE_CONNECTION],
  },
];

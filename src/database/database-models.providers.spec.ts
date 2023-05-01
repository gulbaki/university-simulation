import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';
import {
  DATABASE_CONNECTION,
  STUDENT_MODEL,
  UNIVERSITY_MODEL,
  EXAM_MODEL,
} from './database.constants';
import { databaseModelsProviders } from './database-models.providers';
import { Student, StudentModel } from './student.model';
import { University, UniversityModel } from './university.model';
import { Exam, ExamModel } from './exam.model';

describe('DatabaseModelsProviders', () => {
  let conn: any;
  let studentModel: any;
  let universityModel: any;
  let examModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...databaseModelsProviders,

        {
          provide: DATABASE_CONNECTION,
          useValue: {
            model: jest
              .fn()
              .mockReturnValue({} as Model<Student | University | Exam>),
          },
        },
      ],
    }).compile();

    conn = module.get<Connection>(DATABASE_CONNECTION);
    studentModel = module.get<StudentModel>(STUDENT_MODEL);
    universityModel = module.get<UniversityModel>(UNIVERSITY_MODEL);
    examModel = module.get<ExamModel>(EXAM_MODEL);
  });

  it('DATABASE_CONNECTION should be defined', () => {
    expect(conn).toBeDefined();
  });

  it('STUDENT_MODEL should be defined', () => {
    expect(studentModel).toBeDefined();
  });

  it('UNIVERSITY_MODEL should be defined', () => {
    expect(universityModel).toBeDefined();
  });

  it('EXAM_MODEL should be defined', () => {
    expect(examModel).toBeDefined();
  });
});

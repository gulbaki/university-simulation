import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { lastValueFrom, of } from 'rxjs';

describe('UserController', () => {
  let controller: StudentController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StudentService,
          useValue: {},
        },
      ],
      controllers: [StudentController],
    }).compile();

    controller = app.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

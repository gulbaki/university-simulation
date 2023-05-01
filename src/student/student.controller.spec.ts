import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { lastValueFrom, of } from 'rxjs';

describe('UserController', () => {
  let controller: StudentController;
  let service: StudentService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StudentService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
      controllers: [StudentController],
    }).compile();

    controller = app.get<StudentController>(StudentController);
    service = app.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getStudentById', async () => {
    jest
      .spyOn(service, 'getStudentById')
      .mockImplementationOnce((id: string) =>
        of({
          name: 'hantsy',
          surname: 'surname',
          email: 'hantsy@example.com',
          points: 0
        } as any),
      );
    const student = await lastValueFrom(controller.getStudentById('id'));
    expect(student.name).toBe('hantsy');
    expect(student.surname).toBe('surname');
    expect(student.email).toBe('hantsy@example.com');
    expect(student.points).toBe(0);
    expect(service.getStudentById).toBeCalledWith('id');
  });
});

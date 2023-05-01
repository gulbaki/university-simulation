import { Test, TestingModule } from '@nestjs/testing';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

describe('UniversityController', () => {
  let controller: UniversityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UniversityService,
          useValue: {},
        },
      ],
      controllers: [UniversityController],
    }).compile();

    controller = module.get<UniversityController>(UniversityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

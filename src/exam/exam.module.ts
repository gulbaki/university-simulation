import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UniversityService } from './exam.service';
import { UniversityController } from './exam.controller';
import { ExamDataInitializerService } from './exam-data-initializer.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [UniversityService, ExamDataInitializerService],
  exports: [UniversityService],
  controllers: [ UniversityController],
})
export class ExamModule {}

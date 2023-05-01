import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamDataInitializerService } from './exam-data-initializer.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [ExamService, ExamDataInitializerService],
  exports: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { UserDataInitializerService } from './student-data-initializer.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [StudentService, UserDataInitializerService],
  exports: [StudentService],
  controllers: [ StudentController],
})
export class StudentModule {}

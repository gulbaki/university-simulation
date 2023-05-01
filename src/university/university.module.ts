import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { UniversityDataInitializerService } from './university-data-initializer.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [UniversityService, UniversityDataInitializerService],
  exports: [UniversityService],
  controllers: [ UniversityController],
})
export class UniversityModule {}

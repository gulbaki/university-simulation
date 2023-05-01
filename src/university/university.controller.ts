import { Controller, DefaultValuePipe, Get, Post, Delete,  Param, Query, Body, ParseIntPipe, Res, Response, HttpCode } from '@nestjs/common';
import { University } from '../database/university.model';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from '../shared/pipe/parse-object-id.pipe';
import { UniversityService } from './university.service';
import { UniversityDto } from './university.dto';

@Controller({ path: "/universities" })
export class UniversityController {

  constructor(private UniversityService: UniversityService) { }

  @Get('')
  findUniversityAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ) {
    return this.UniversityService.findUniversityAll( skip, limit);
  }

  @Get(':id/students')
  getUniversityWithStudentById(
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.UniversityService.getUniversityWithStudentById(id);
  }

  @Delete('')
  deleteUniversityByAll(
    @Res() response: any,
  ): Observable<Response> {
    return this.UniversityService.deleteUniversityByAll().pipe(
      map((student) => {
       return response.status(200).send({'message': "Universities deleted success"});
      }),
    );
  }

  @Delete(':id')
  deleteUniversityById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() response: any,
  ): Observable<Response> {
    
    return this.UniversityService.deleteUniversityById(id).pipe(
      map((student) => {
       return response.status(200).send({'message': "University deleted success"});
      }),
    );
  }
  

}

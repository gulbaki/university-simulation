import {
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  Res,
  Response,
  HttpCode,
} from '@nestjs/common';
import { Student } from '../database/student.model';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from '../shared/pipe/parse-object-id.pipe';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';

@Controller({ path: '/students' })
export class StudentController {
  constructor(private StudentService: StudentService) {}

  @Get('')
  findStudentAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ) {
    return this.StudentService.findStudentAll(skip, limit);
  }

  @Get(':id')
  getStudentById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Observable<Partial<Student>> {
    return this.StudentService.getStudentById(id);
  }

  @Post('')
  createStudent(
    @Body() student: StudentDto,
    @Res() res: any,
  ): Observable<Response> {
    return this.StudentService.createStudent(student).pipe(
      map((student) => {
        return res.status(201).send();
      }),
    );
  }

  @Delete('')
  deleteStudentByAll(@Res() response: any): Observable<Response> {
    return this.StudentService.deleteStudentByAll().pipe(
      map((student) => {
        return response
          .status(200)
          .send({ message: 'Students deleted success' });
      }),
    );
  }

  @Delete(':id')
  deleteStudentById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() response: any,
  ): Observable<Response> {
    return this.StudentService.deleteStudentById(id).pipe(
      map((student) => {
        return response
          .status(200)
          .send({ message: 'Student deleted success' });
      }),
    );
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.StudentService.create(createUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.StudentService.remove(+id);
  // }
}

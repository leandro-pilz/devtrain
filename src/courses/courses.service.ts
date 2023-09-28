import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do framework NestJs',
      description: 'Fundamentos do framework NestJs',
      tags: ['node.js', 'nestjs', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((course) => course.id === Number(id));

    if (!course) {
      throw new HttpException(`Course ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return course;
  }

  create(courseDto: any) {
    this.courses.push(courseDto);
    return courseDto;
  }

  update(id: string, courseDto: any) {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );
    this.courses[indexCourse] = courseDto;
  }

  delete(id: string) {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (indexCourse >= 0) {
      this.courses.splice(indexCourse);
    }
  }
}

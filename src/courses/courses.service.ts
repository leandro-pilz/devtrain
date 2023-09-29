import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id: +id,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return course;
  }

  create(courseDto: CreateCourseDto) {
    const course = this.courseRepository.create(courseDto);
    return this.courseRepository.save(course);
  }

  async update(id: number, courseDto: UpdateCourseDto) {
    const course = await this.courseRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    course.name = courseDto.name;
    course.description = courseDto.description;
    course.tags = courseDto.tags;

    return this.courseRepository.save(course);
  }

  async delete(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return this.courseRepository.remove(course);
  }
}

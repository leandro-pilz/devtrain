import { CoursesService } from './courses.service';
import { randomUUID } from 'node:crypto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Tag } from './entities/tag.entity';

describe('CourseService unit test', () => {
  let service: CoursesService;
  let id: string;
  let createdAt: Date;
  let expectOutputTags: any;
  let expectOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    createdAt = new Date();

    expectOutputTags = [
      {
        id,
        name: 'nestjs',
        createdAt,
      },
    ];

    expectOutputCourses = [
      {
        id,
        name: 'test',
        description: 'test decription',
        createdAt,
        tags: expectOutputTags,
      },
    ];

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    //@ts-expect-error definded part of method
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error definded part of method
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDto = {
      name: 'test',
      description: 'test decription',
      tags: ['nestjs'],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockTagRepository.findOne).toHaveBeenCalled();
    expect(mockTagRepository.create).toBeCalledTimes(0);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.create).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse);
  });

  it('should update a course', async () => {
    //@ts-expect-error definded part of method
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error definded part of method
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDto = {
      name: 'test',
      description: 'test decription',
      tags: ['nestjs'],
    };

    const course = await service.update(id, updateCourseDTO);

    expect(mockTagRepository.findOne).toHaveBeenCalled();
    expect(mockTagRepository.create).toBeCalledTimes(0);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it('should list all courses', async () => {
    //@ts-expect-error definded part of method
    service['courseRepository'] = mockCourseRepository;

    const courses = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses);
  });

  it('should get a course by id', async () => {
    //@ts-expect-error definded part of method
    service['courseRepository'] = mockCourseRepository;

    const course = await service.findOne(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it('should delete a course', async () => {
    //@ts-expect-error definded part of method
    service['courseRepository'] = mockCourseRepository;

    const course = await service.delete(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });
});

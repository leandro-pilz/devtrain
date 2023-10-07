import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Course } from './entities/course.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CoursesModule } from './courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; //Deve utilizar para fazer a requisição no teste.

describe('CoursesController e2e tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let courses: Course[];

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433, //Porta para o banco de dados de teste
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: true, //Ativar somente para o banco de dados de teste, pois não usa migrations.
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest;
          },
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    data = {
      name: 'Node.js',
      description: 'Node.js',
      tags: ['nodejs', 'nestjs'],
    };
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize();
    const repository = dataSource.getRepository(Course);
    courses = await repository.find();
    await dataSource.destroy();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('POST /courses', () => {
    it('should create a coures', async () => {
      const res = await request(app.getHttpServer())
        .post('/courses')
        .send(data)
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(data.name);
      expect(res.body.description).toEqual(data.description);
      expect(res.body.createdAt).toBeDefined();
      expect(res.body.tags[0].name).toEqual(data.tags[0]);
      expect(res.body.tags[1].name).toEqual(data.tags[1]);
    });
  });

  describe('GET /courses', () => {
    it('should list all coures', async () => {
      const res = await request(app.getHttpServer())
        .get('/courses')
        .expect(200);

      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].name).toEqual(data.name);
      expect(res.body[0].description).toEqual(data.description);
      expect(res.body[0].createdAt).toBeDefined();

      res.body.map((item) =>
        expect(item).toEqual({
          id: item.id,
          name: item.name,
          description: item.description,
          createdAt: item.createdAt,
          tags: [...item.tags],
        }),
      );
    });
  });

  describe('GET /courses/:id', () => {
    it('should gets a course by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/courses/${courses[0].id}`)
        .expect(200);
      expect(res.body.id).toEqual(courses[0].id);
      expect(res.body.name).toEqual(courses[0].name);
      expect(res.body.description).toEqual(courses[0].description);
    });
  });

  describe('PATCH /courses/:id', () => {
    it('should update a course', async () => {
      const updateData = {
        name: 'new name',
        description: 'new description',
        tags: ['one', 'two'],
      };

      const res = await (await request(app.getHttpServer()))
        .patch(`/courses/${courses[0].id}`)
        .send(updateData)
        .expect(200);

      expect(res.body.id).toEqual(courses[0].id);
      expect(res.body.name).toEqual('new name');
      expect(res.body.description).toEqual('new description');
      expect(res.body.tags).toHaveLength(2);
      expect(res.body.tags[0].name).toEqual('one');
      expect(res.body.tags[1].name).toEqual('two');
    });
  });

  describe('DELETE /courses/:id', () => {
    it('should delete a course', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/courses/${courses[0].id}`)
        .expect(204)
        .expect({});
    });
  });
});

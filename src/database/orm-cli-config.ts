import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCoursesTable1696285831958 } from 'src/migations/1696285831958-CreateCoursesTable';
import { CreateTagsTable1696287292395 } from '../migations/1696287292395-CreateTagsTable';
import { CreateCoursesTagsTable1696288522955 } from '../migations/1696288522955-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagTable1696289027005 } from '../migations/1696289027005-AddCouresIdToCoursesTagTable';
import { AddTagIdToCoursesTagTable1696289710632 } from '../migations/1696289710632-AddTagIdToCoursesTagTable';

export const database = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1696285831958,
    CreateTagsTable1696287292395,
    CreateCoursesTagsTable1696288522955,
    AddCoursesIdToCoursesTagTable1696289027005,
    AddTagIdToCoursesTagTable1696289710632,
  ],
});

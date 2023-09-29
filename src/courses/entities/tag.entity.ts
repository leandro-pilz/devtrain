import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    primaryKeyConstraintName: 'tag_pk',
  })
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];
}

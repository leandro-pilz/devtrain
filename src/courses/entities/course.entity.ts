import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curso')
export class Course {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    primaryKeyConstraintName: 'curso_pk',
  })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json', { nullable: true })
  tags: string[];
}

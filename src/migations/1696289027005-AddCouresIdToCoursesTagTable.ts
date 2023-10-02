import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCoursesIdToCoursesTagTable1696289027005
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'course_tags_tag',
      new TableColumn({
        name: 'courseId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'course_tags_tag',
      new TableForeignKey({
        name: 'curso_tag_fk_curso',
        columnNames: ['courseId'],
        referencedTableName: 'course',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('course_tags_tag', 'curso_tag_fk_curso');
    await queryRunner.dropColumn('course_tags_tag', 'courseId');
  }
}

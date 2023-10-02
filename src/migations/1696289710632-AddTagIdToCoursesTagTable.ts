import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTagIdToCoursesTagTable1696289710632
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'course_tags_tag',
      new TableColumn({
        name: 'tagId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'course_tags_tag',
      new TableForeignKey({
        name: 'curso_tag_fk_tag',
        columnNames: ['tagId'],
        referencedTableName: 'tag',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('course_tags_tag', 'curso_tag_fk_tag');
    await queryRunner.dropColumn('course_tags_tag', 'tagId');
  }
}

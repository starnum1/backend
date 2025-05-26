import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDeletedAtToForm20241219160000 implements MigrationInterface {
  name = 'AddDeletedAtToForm20241219160000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 添加 deletedAt 字段到 form 表
    await queryRunner.addColumn(
      'form',
      new TableColumn({
        name: 'deletedAt',
        type: 'datetime',
        isNullable: true,
        default: null,
        comment: '逻辑删除时间戳',
      }),
    );

    // 为 deletedAt 字段添加索引，提高查询性能
    await queryRunner.query(
      `CREATE INDEX IDX_form_deletedAt ON form (deletedAt)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 删除索引
    await queryRunner.query(`DROP INDEX IDX_form_deletedAt ON form`);
    
    // 删除 deletedAt 字段
    await queryRunner.dropColumn('form', 'deletedAt');
  }
}

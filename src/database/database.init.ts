import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseInitService.name);

  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      // 创建数据库
      await this.dataSource.query('CREATE DATABASE IF NOT EXISTS `project_test` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
      this.logger.log('数据库 project_test 创建成功或已存在');

      // 切换到新创建的数据库
      await this.dataSource.query('USE `project_test`');
      this.logger.log('已切换到 project_test 数据库');

      // 这里可以添加其他初始化操作，如创建表等
    } catch (error) {
      this.logger.error('数据库初始化失败', error);
      throw error;
    }
  }
}

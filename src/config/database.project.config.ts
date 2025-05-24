import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const projectDatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '0000',
  database: 'project_test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // 开发环境使用，生产环境应设为false
};

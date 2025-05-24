import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '0000',
  database: 'mysql', // 先连接到mysql系统数据库
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // 暂时关闭自动同步
};

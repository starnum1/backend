import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { projectDatabaseConfig } from '../config/database.project.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(projectDatabaseConfig),
  ],
})
export class ProjectDatabaseModule {}

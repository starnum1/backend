import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';
import { DatabaseInitService } from './database.init';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig)],
  providers: [DatabaseInitService],
})
export class DatabaseModule {}

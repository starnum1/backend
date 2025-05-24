import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProjectDatabaseModule } from './database/project-database.module';
import { UsersModule } from './users/users.module';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [DatabaseModule, ProjectDatabaseModule, UsersModule, FormsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

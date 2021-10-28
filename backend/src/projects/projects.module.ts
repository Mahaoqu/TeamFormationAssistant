import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Requirement } from './entities/requirement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Requirement, Project])], 
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}

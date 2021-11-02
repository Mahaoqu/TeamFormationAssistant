import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Candidate } from './entities/candidate.entity';
import { Requirement } from 'src/projects/entities/requirement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Application, Candidate, Requirement]),
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}

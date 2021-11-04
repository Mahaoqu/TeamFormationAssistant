import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Candidate } from './entities/candidate.entity';
import { Requirement } from 'src/projects/entities/requirement.entity';

/**
 * common model files with relationships defined
 * we can use candidate.modules like:
 * candidateController -> candidateService -> candidateRepository -> candidateModel
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Application, Candidate, Requirement]),
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}

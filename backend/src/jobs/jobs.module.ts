import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from '../job-applications/entities/job-application.entity';

/**
 * common model files with relationships defined
 * we can use job.modules like:
 * jobController -> jobService -> jobRepository -> jobModel
 */

@Module({
  imports: [TypeOrmModule.forFeature([Job]), TypeOrmModule.forFeature([JobApplication])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

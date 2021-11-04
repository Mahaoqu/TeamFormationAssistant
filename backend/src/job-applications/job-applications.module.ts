import { Module } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';

/**
 * common model files with relationships defined
 * we can use job-applications.modules like:
 * job-applicationsController -> job-applicationsService -> job-applicationsRepository -> job-applicationsModel
 */

@Module({
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationsService } from './job-applications.service';

/**
 * spec file of job application service
 * is an unit test for your source files
 */

describe('JobApplicationsService', () => {
  let service: JobApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobApplicationsService],
    }).compile();

    service = module.get<JobApplicationsService>(JobApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

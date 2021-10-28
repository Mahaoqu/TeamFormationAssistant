import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationsController } from './job-applications.controller';
import { JobApplicationsService } from './job-applications.service';

describe('JobApplicationsController', () => {
  let controller: JobApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobApplicationsController],
      providers: [JobApplicationsService],
    }).compile();

    controller = module.get<JobApplicationsController>(
      JobApplicationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

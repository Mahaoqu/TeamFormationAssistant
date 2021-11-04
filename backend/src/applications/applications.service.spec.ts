import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';

/**
 * spec file of application service
 * is an unit test for your source files
 */

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationsService],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

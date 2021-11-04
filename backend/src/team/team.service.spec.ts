import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';

/**
 * spec file of team service
 * is an unit test for your source files
 */

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamService],
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';

/**
 * spec file of members service
 * is an unit test for your source files
 */

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

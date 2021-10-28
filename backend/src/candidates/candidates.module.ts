import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}

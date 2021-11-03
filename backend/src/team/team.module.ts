import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Member } from 'src/members/entities/member.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Requirement } from 'src/projects/entities/requirement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Member, Team, Requirement])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}

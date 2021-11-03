import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/members/entities/member.entity';
import { Project } from 'src/projects/entities/project.entity';
import { FakeController } from './fake.controller';
import { FakeService } from './fake.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Project])],
  controllers: [FakeController],
  providers: [FakeService],
})
export class FakeModule {}

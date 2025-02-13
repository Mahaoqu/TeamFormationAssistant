import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/applications/entities/application.entity';
import { Member } from 'src/members/entities/member.entity';
import { Project } from 'src/projects/entities/project.entity';
import { FakeController } from './fake.controller';
import { FakeService } from './fake.service';

/**
 * common model files with relationships defined
 * we can use fake.modules like:
 * fakeController -> fakeService -> fakeRepository -> fakeModel
 */

@Module({
  imports: [TypeOrmModule.forFeature([Member, Project, Application])],
  controllers: [FakeController],
  providers: [FakeService],
})
export class FakeModule {}

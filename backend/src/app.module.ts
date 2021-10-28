import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { MembersModule } from './members/members.module';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { CandidatesModule } from './candidates/candidates.module';
import { TeamModule } from './team/team.module';
import { AppController } from './app.controller';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    JobsModule,
    ApplicationsModule,
    MembersModule,
    ProjectsModule,
    JobApplicationsModule,
    TeamModule,
    CandidatesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule { }

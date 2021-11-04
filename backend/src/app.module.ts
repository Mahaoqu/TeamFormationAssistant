import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FakeModule } from './fake/fake.module';

/**
 * web application module
 * common model files with relationships defined
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '../.env'],
    }),

    // Read db config async
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const type = configService.get('DB_TYPE');
        const host = configService.get('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const database = configService.get('DB_DATABASE');
        return {
          type,
          host,
          port,
          username,
          password,
          database,
          entities: ['dist/**/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    JobsModule,
    ApplicationsModule,
    MembersModule,
    ProjectsModule,
    JobApplicationsModule,
    TeamModule,
    CandidatesModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    FakeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

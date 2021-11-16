import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';

/**
 * Collect data from the controller, perform validation and business logic, and call the repository for data manipulation.
 */

@Injectable()
export class JobApplicationsService {
  create(createJobApplicationDto: CreateJobApplicationDto) {
    return '';
  }

  findAll() {
    return `This action returns all jobApplications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobApplication`;
  }

  update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    return `This action updates a #${id} jobApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobApplication`;
  }
}

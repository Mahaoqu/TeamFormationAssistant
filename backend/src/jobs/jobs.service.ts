import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

/**
 * Collect data from the controller, perform validation and business logic, and call the repository for data manipulation.
 */

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  // Object with no id will insert in database every time restarting server
  // async onModuleInit(){
  //   console.log('initialize some jobs');
  //   const p0: Job={
  //     id: 0,
  //     name: 'TestInitJob1',
  //     projectId: '545456465',
  //     phone: '1234567777',
  //     role: 'sde',
  //     description: 'SDE',
  //     address: 'Raleigh',
  //   };
  //   await this.jobsRepository.save(p0);
  // }

  async create(createJobDto: CreateJobDto) {
    const jobs = new Job();
    const a = this.jobsRepository.findAndCount({
      name: createJobDto.name,
    });
    const b = this.jobsRepository.findAndCount({
      projectId: createJobDto.projectId,
    });
    const c = this.jobsRepository.findAndCount({
      phone: createJobDto.phone,
    });
    const d = this.jobsRepository.findAndCount({
      role: createJobDto.role,
    });
    const e = this.jobsRepository.findAndCount({
      description: createJobDto.description,
    });
    const f = this.jobsRepository.findAndCount({
      address: createJobDto.address,
    });

    jobs.name = createJobDto.name;
    jobs.projectId = createJobDto.projectId;
    jobs.phone = createJobDto.phone;
    jobs.role = createJobDto.role;
    jobs.description = createJobDto.description;
    jobs.address = createJobDto.address;

    await this.jobsRepository.save(jobs);
  }

  async findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const jobs = await this.jobsRepository.findOne(id);
    jobs.name = updateJobDto.name;
    jobs.projectId = updateJobDto.projectId;
    jobs.phone = updateJobDto.phone;
    jobs.role = updateJobDto.role;
    jobs.description = updateJobDto.description;
    jobs.address = updateJobDto.address;
    return this.jobsRepository.save(jobs);
  }

  remove(id: number) {
    return this.jobsRepository.delete(id);
  }
}

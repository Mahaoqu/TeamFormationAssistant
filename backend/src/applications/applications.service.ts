import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationsRepository: Repository<Application>,
  ) {}

  create(createApplicationDto: CreateApplicationDto) {
    return 'This action adds a new application';
  }

  async findAll(): Promise<Application[]> {
    return this.applicationsRepository.find();
  }

  findOne(id: number): Promise<Application> {
    return this.applicationsRepository.findOne(id);
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  async remove(id: number): Promise<void>{
    await this.applicationsRepository.delete(id);
  }
}

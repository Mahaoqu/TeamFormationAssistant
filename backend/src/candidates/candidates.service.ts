import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Project } from 'src/projects/entities/project.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Candidate } from './entities/candidate.entity';
import { Requirement } from 'src/projects/entities/requirement.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,

    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,

    @InjectRepository(Requirement)
    private readonly requirementRepository: Repository<Requirement>,
  ) {}
  
  async assign() {
    const requirementsIDs = await this.requirementRepository.find();
    const employee = await this.applicationRepository.find();
    // for (const proj of projs) {
    //   for (const r of proj.requirements) {
        
    //   }
    // }

    const c = new Candidate();
    // c.project = 
    await this.candidateRepository.save(c);
  }

  create(createCandidateDto: CreateCandidateDto) {
    return 'This action adds a new candidate';
  }

  findAll() {
    return `This action returns all candidates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}

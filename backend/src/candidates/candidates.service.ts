import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Project } from '../projects/entities/project.entity';
import { Application } from '../applications/entities/application.entity';
import { Candidate } from './entities/candidate.entity';
import { Requirement } from '../projects/entities/requirement.entity';

/*
  Match Team
*/
function candidateMatch(
  employees: Application[],
  requirements: Requirement[],
): Candidate[] {
  let candidates: Candidate[] = [];

  // Choose each requirement from application
  // find the highest score
  for (const r of requirements) {
    let selected_employ = null;
    let highScore = 0;

    for (const e of employees) {
      const memscore =
        (r.skillWeight * e.skillScore +
          r.experienceWeight * 1 +
          r.languageWeight * 0) /
        (r.skillWeight + r.experienceWeight + r.languageWeight);

      if (memscore > highScore) {
        selected_employ = e;
        highScore = memscore;
      }
    }

    // TODO: Remove from list?
    // employees.remove()
    const c = new Candidate();
    c.application = selected_employ;
    c.project = r.project;

    candidates.push(c);
  }

  return candidates;
}

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,

    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  async assign() {
    const projs = await this.projectRepository.find({
      isAssignmentComplete: false
    });
    const applications = await this.applicationRepository.find();

    for (const proj of projs) {
      const c = candidateMatch(applications, proj.requirements);
      await this.candidateRepository.save(c);

      if (c.length == proj.requirements.length)
        proj.isAssignmentComplete = true;

      await this.projectRepository.save(proj);
    }
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

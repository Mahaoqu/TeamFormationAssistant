import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Project } from '../projects/entities/project.entity';
import { Application } from '../applications/entities/application.entity';
import { Candidate } from './entities/candidate.entity';
import { Requirement } from '../projects/entities/requirement.entity';

/**
 * Collect data from the controller, perform validation and business logic, and call the repository for data manipulation.
 */

/*
  Match Team
*/
function candidateMatch(
  employees: Application[],
  requirements: Requirement[],
): Candidate[] {
  const candidates: Candidate[] = [];

  // Choose each requirement from application
  // find the highest score
  requirements.forEach((r) => {
    console.log(r);

    let selected_employ: Application;
    let highScore = 0;

    employees.forEach((e) => {
      const memscore =
        (r.skillWeight * e.skillScore +
          r.experienceWeight * 1 +
          r.languageWeight * 0) /
        (r.skillWeight + r.experienceWeight + r.languageWeight);

      if (memscore > highScore) {
        selected_employ = e;
        highScore = memscore;
      }
    });

    // TODO: Remove from list?
    // employees.remove()
    const c = new Candidate();
    c.application = selected_employ;
    c.project = r.project;

    console.log(
      `Match.. candidate in ${selected_employ.name} proj: ${r.project.name}`,
    );

    candidates.push(c);
  });

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
      isAssignmentComplete: false,
    });
    console.log(`finding... ${projs.length} projs`);
    const applications = await this.applicationRepository.find();

    for (const proj of projs) {
      if (proj.requirements) {
        console.log(`Matching... ${proj.id}`);
        const c = candidateMatch(applications, proj.requirements || []);
        await this.candidateRepository.save(c);

        if (c.length == proj.requirements.length)
          proj.isAssignmentComplete = true;

        await this.projectRepository.save(proj);
      }
    }
  }

  create(createCandidateDto: CreateCandidateDto) {
    return 'This action adds a new candidate';
  }

  findAll() {
    return this.candidateRepository.find();
  }

  findOne(id: number) {
    return this.candidateRepository.findOne(id);
  }

  remove(id: number) {
    return this.candidateRepository.delete(id);
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }
}

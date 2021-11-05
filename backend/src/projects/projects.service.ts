import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Requirement } from './entities/requirement.entity';

/**
 * Collect data from the controller, perform validation and business logic, and call the repository for data manipulation.
 */
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>, // @InjectRepository(Requirement) // private readonly requirementsRepository: Repository<Requirement>,
  ) {}
  // async onModuleInit() {
  //   console.log('initialize some projects');
  //   const p0: Project = {
  //     id: 0,
  //     name: 'CaloriesTracker',
  //     endDate: new Date('December 17, 1995 03:24:00'),
  //     teamSize: 2,
  //     budget: 10000,
  //     tools: 'Python',
  //     isAssignmentComplete: false,
  //     priority: 1,
  //     requirements: [],
  //   };
  //   const p1: Project = {
  //     id: 1,
  //     name: 'CaloriesTracker II',
  //     endDate: new Date('December 18, 1995 03:24:00'),
  //     teamSize: 1,
  //     budget: 500,
  //     tools: 'Python',
  //     isAssignmentComplete: false,
  //     priority: 1,
  //     requirements: [],
  //   };
  //   const p2: Project = {
  //     id: 2,
  //     name: 'CaloriesTracker III',
  //     endDate: new Date('December 18, 1995 03:24:00'),
  //     teamSize: 20,
  //     budget: 10000,
  //     tools: 'C++',
  //     isAssignmentComplete: false,
  //     priority: 1,
  //     requirements: [],
  //   };
  //   await this.projectRepository.save(p0);
  //   await this.projectRepository.save(p1);
  //   await this.projectRepository.save(p2);
  // }

  async create(createProjectDto: CreateProjectDto) {
    const proj = new Project();
    proj.name = createProjectDto.name;
    proj.budget = createProjectDto.budget;
    proj.endDate = createProjectDto.endDate;
    proj.priority = createProjectDto.priority;
    proj.isAssignmentComplete = false;
    proj.teamSize = createProjectDto.teamSize;
    proj.tools = createProjectDto.tools;

    proj.requirements = createProjectDto.requirements.map((r) => {
      console.log(r);
      const req = new Requirement();
      req.budgetWeight = r.budgetWeight;
      req.experienceWeight = r.experienceWeight;
      req.hoursWeight = r.hoursWeight;
      req.languageWeight = r.languageWeight;
      req.skillWeight = r.skillWeight;
      return req;
    });

    await this.projectRepository.save(proj);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return this.projectRepository.findOne(id);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const proj = await this.projectRepository.findOne(id);
    //proj.id = updateProjectDto.project_id;
    proj.name = updateProjectDto.name;
    proj.budget = updateProjectDto.budget;
    proj.endDate = updateProjectDto.endDate;
    proj.isAssignmentComplete = updateProjectDto.isAssignmentComplete;
    proj.priority = updateProjectDto.priority;
    proj.teamSize = updateProjectDto.teamSize;
    proj.tools = updateProjectDto.tools;
    return this.projectRepository.save(proj);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}

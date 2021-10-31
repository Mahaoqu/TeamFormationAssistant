import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Requirement } from './entities/requirement.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) // @InjectRepository(Requirement)
  // private readonly requirementsRepository: Repository<Requirement>,
  {}
  async onModuleInit(){
    console.log('initialize some projects');
    const p1: Project={
      id: 1,
      name: 'CaloriesTracker',
      endDate: new Date('December 17, 1995 03:24:00'),
      teamSize: 2,
      budget: 10000,
      tools: 'Python',
      isAssignmentComplete: false,
      priority: 1,
      requirements: []
    };
    await this.projectRepository.save(p1);
  }

  async create(createProjectDto: CreateProjectDto) {
    const proj = new Project();
    const n = this.projectRepository.findAndCount({
      name:createProjectDto.project_name
    });
    const b = this.projectRepository.findAndCount({
      budget:createProjectDto.project_budget
    });
    const e = this.projectRepository.findAndCount({
      endDate:createProjectDto.project_end_date
    });
    const p = this.projectRepository.findAndCount({
      priority:createProjectDto.project_priority
    });
    const a = this.projectRepository.findAndCount({
      isAssignmentComplete:createProjectDto.project_is_assignment_complete
    });
    const te = this.projectRepository.findAndCount({
      teamSize:createProjectDto.project_team_size
    });
    const to = this.projectRepository.findAndCount({
      tools:createProjectDto.project_tool
    });
    proj.name = createProjectDto.project_name;
    proj.budget = createProjectDto.project_budget;
    proj.endDate = createProjectDto.project_end_date;
    proj.priority = createProjectDto.project_priority;
    proj.isAssignmentComplete = createProjectDto.project_is_assignment_complete;
    proj.teamSize = createProjectDto.project_team_size
    proj.tools = createProjectDto.project_tool;

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
    proj.id = updateProjectDto.project_id;
    proj.name = updateProjectDto.project_name;
    proj.budget = updateProjectDto.project_budget;
    proj.endDate = updateProjectDto.project_end_date;
    proj.isAssignmentComplete = updateProjectDto.project_is_assignment_complete;
    proj.priority = updateProjectDto.project_priority;
    proj.teamSize = updateProjectDto.project_team_size;
    proj.tools = updateProjectDto.project_tool;
    return this.projectRepository.save(proj);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';
import { Project } from '../projects/entities/project.entity';
import { Requirement } from '../projects/entities/requirement.entity';
import { Team } from './entities/team.entity';

/**
 * Collect data from the controller, perform validation and business logic, and call the repository for data manipulation.
 */

function teamMatch(employees: Member[], requirements: Requirement[]): Team[] {
  const teams: Team[] = [];

  // Choose each requirement from application
  // find the highest score
  requirements.forEach((r) => {
    let selected_employ: Member = null;
    let highScore = 0;

    employees.forEach((e) => {
      const memscore =
        (r.skillWeight * e.skillScore) / 100 +
        (r.experienceWeight * e.experience) / 10 +
        (r.hoursWeight * e.availableHoursPerWeek) / 40 +
        (r.languageWeight * 0) / 5 +
        (r.budgetWeight * e.hourlyRate) / 100;

      if (memscore > highScore) {
        selected_employ = e;
        highScore = memscore;
      }
    });

    // TODO: Remove from list?
    // employees.remove()
    const t = new Team();
    t.member = selected_employ;
    t.project = r.project;

    teams.push(t);
  });

  return teams;
}

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async assign() {
    const members = await this.memberRepository.find({
      isAssigned: false,
    });
    const projs = await this.projectRepository.find({
      isAssignmentComplete: false,
    });

    for (const proj of projs) {
      if (proj.requirements) {
        const c = teamMatch(members, proj.requirements || []);
        await this.teamRepository.save(c);
      }
    }
  }

  // create(createTeamDto: CreateTeamDto) {
  //   return 'This action adds a new team';
  // }

  findAll() {
    return this.teamRepository.find();
  }

  findOne(id: number) {
    return this.teamRepository.findOne(id);
  }

  // update(id: number, updateTeamDto: UpdateTeamDto) {
  //   return `This action updates a #${id} team`;
  // }

  remove(id: number) {
    return this.teamRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as faker from 'faker';
import { Member } from 'src/members/entities/member.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Requirement } from 'src/projects/entities/requirement.entity';
import { Repository } from 'typeorm';

/**
 * Collect data from the controller, perform validation and business logic, and call the repository for data manipulation.
 */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFromArr(arr, n) {
  let len = arr.length;
  const result = new Array(n),
    taken = new Array(len);

  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function randomLanguage(num) {
  const langs = [
    'C',
    'C++',
    'Java',
    'Python',
    'JavaScript',
    'Ruby',
    'Go',
    'Scala',
    'Matlab',
    'R',
    'Rust',
    'SQL',
  ];
  const arr = getRandomFromArr(langs, num);
  return arr.join(',');
}

@Injectable()
export class FakeService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  generate_fake_data() {
    // Generate 10 members
    for (let index = 0; index < 10; index++) {
      const m = this.generate_random_member();
      this.memberRepository.save(m);
    }

    // Generate 5 projects
    for (let index = 0; index < 5; index++) {
      const m = this.generate_random_project();
      this.projectRepository.save(m);
    }
  }

  generate_random_member() {
    const m = new Member();
    m.name = faker.name.findName();
    m.isAssigned = false;
    m.role = 'SDE' + getRandomInt(1, 3);
    m.hourlyRate = getRandomInt(60, 100);
    m.birthday = faker.date.between('1970-1-1', '2001-1-1');
    m.experience = getRandomInt(0, 5);
    m.languages = randomLanguage(getRandomInt(1, 3));
    m.skillScore = getRandomInt(0, 50);
    m.availableHoursPerWeek = getRandomInt(10, 40);
    return m;
  }

  generate_random_project() {
    const p = new Project();
    p.teamSize = getRandomInt(2, 5);
    p.budget = 100 * getRandomInt(50, 100);
    p.isAssignmentComplete = false;
    p.name = faker.commerce.productName();
    p.priority = getRandomInt(0, 3);
    p.endDate = faker.date.future();
    p.tools = randomLanguage(1);
    p.requirements = [];

    for (let i = 0; i < getRandomInt(1, 3); i++) {
      const r = new Requirement();
      r.languagePreferred = p.tools;
      r.memberRole = 'SDE' + getRandomInt(1, 3);

      let weight = 100;
      const weights = [];
      for (let i = 0; i < 4; i++) {
        const w = Math.floor(weight * Math.random());
        weights.push(w);
        weight -= w;
      }
      weights.push(weight);

      r.experienceWeight = weights[0];
      r.budgetWeight = weights[1];
      r.hoursWeight = weights[2];
      r.languageWeight = weights[3];
      r.skillWeight = 100 - weights[0] - weights[1] - weights[2] - weights[3];

      p.requirements.push(r);
    }

    return p;
  }
}

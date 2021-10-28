import { Member } from 'src/members/entities/member.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project)
  project: Project;

  @ManyToOne(() => Member)
  member: Member;
}

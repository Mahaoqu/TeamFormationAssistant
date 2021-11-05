import { Member } from '../../members/entities/member.entity';
import { Project } from '../../projects/entities/project.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

/**
 * team's entity 
 * which contain the table name in the database
 */

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project)
  project: Project;

  @ManyToOne(() => Member)
  member: Member;
}

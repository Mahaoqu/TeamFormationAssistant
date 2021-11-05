import { Project } from '../../projects/entities/project.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

/**
 * requirement's entity
 * which contain the table name in the database mentioned with the help of an annotation.
 */

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  languagePreferred: string;

  @Column({ nullable: false })
  skill: number;

  @Column()
  memberRole: string;

  @Column()
  availableHoursPerWeek: number;

  @Column()
  skillWeight: number;

  @Column()
  experienceWeight: number;

  @Column()
  hoursWeight: number;

  @Column()
  languageWeight: number;

  @Column()
  budgetWeight: number;

  @ManyToOne(() => Project, (project) => project.requirements)
  project: Project;
}

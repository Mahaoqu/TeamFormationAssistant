import { Requirement } from '../../projects/entities/requirement.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

/**
 * project's entity
 * which contain the table name in the database
 */

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  endDate: Date;

  @Column()
  teamSize: number;

  @Column('float')
  budget: number;

  @Column()
  tools: string;

  @Column()
  isAssignmentComplete: boolean;

  @Column()
  priority: number;

  @OneToMany(() => Requirement, (requirement) => requirement.project, {
    cascade: true,
    eager: true,
  })
  requirements: Requirement[];
}

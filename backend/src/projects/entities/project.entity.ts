import { Requirement } from 'src/projects/entities/requirement.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Requirement, (requirement) => requirement.project)
  requirements: Requirement[];
}

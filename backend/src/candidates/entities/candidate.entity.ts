import { Application } from 'src/applications/entities/application.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

/**
 * candidate's entity 
 * which contain the table name in the database.
 */
@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project)
  project: Project;

  @ManyToOne(() => Application)
  application: Application;
}

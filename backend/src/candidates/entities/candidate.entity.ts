import { Application } from 'src/applications/entities/application.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project)
    project: Project;

    @ManyToOne(() => Application)
    application: Application;
}
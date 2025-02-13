import { Application } from '../../applications/entities/application.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

/**
 * job application's entity
 * which contain the table name in the database.
 */
@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Application)
  application: Application;
}

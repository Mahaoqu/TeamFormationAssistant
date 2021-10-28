import { Application } from 'src/applications/entities/application.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column()
  birthday: Date;

  @Column()
  languages: string;

  @Column()
  isAssigned: boolean;

  @Column('float')
  hourlyRate: number;

  @Column()
  role: string;

  @Column()
  experience: number;

  @Column()
  skillScore: number;

  @Column()
  availableHoursPerWeek: number;
}

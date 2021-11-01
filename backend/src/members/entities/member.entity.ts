import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column()
  dob: Date;

  @Column()
  languages: string;

  @Column()
  isAssigned: boolean;

  @Column('float')
  hourlyRate: number;

  @Column()
  memberRole: string;

  @Column()
  experience: number;

  @Column()
  skillScore: number;

  @Column()
  availableHoursPerWeek: number;
}

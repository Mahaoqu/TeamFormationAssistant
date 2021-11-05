import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * job's entity
 * which contain the table name in the database.
 */

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column()
  description: string;

  @Column()
  projectId: string;

  @Column()
  address: string;
}

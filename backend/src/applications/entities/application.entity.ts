import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    languages: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column()
    skillScore: number

    @Column()
    experience: number
}

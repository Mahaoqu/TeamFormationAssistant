import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    MANAGER = "ROLE_MANAGER",
    USER = "ROLE_USER"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: string;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'USER',
  Admin = 'admin',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // UUID string ID
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  payments: any;
}

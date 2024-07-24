import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from './Enrollment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  username: string | undefined;

  @Column()
  password: string | undefined;

  @OneToMany(() => Enrollment, (enrollment: { user: any; }) => enrollment.user)
  enrollments: Enrollment[] | undefined;
  role: any;
}
// src/entities/Enrollment.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Course } from './Course';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Course, (course: { enrollments: any; }) => course.enrollments)
  course!: Course;

  @ManyToOne(() => User, (user: { enrollments: any; }) => user.enrollments)
  user!: User;
}

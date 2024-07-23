import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './Course';
import { User } from './user';  // Assuming there's a User entity

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.enrollments)
  user!: User;

  @ManyToOne(() => Course, course => course.enrollments)
  course!: Course;

  @Column({ type: 'date', nullable: false })
  enrollmentDate!: Date;
}

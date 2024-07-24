// src/entities/Course.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from './Enrollment';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @OneToMany(() => Enrollment, (enrollment: Enrollment) => enrollment.course)
  enrollments: Enrollment[] = [];
}

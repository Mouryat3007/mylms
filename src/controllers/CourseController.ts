import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Course } from '../entities/Course';
import { Enrollment } from '../entities/Enrollment';

export const getCourses = async (req: Request, res: Response) => {
  const courseRepository = getRepository(Course);
  const courses = await courseRepository.find();
  res.render('courses', { courses });
};

export const getCourseDetail = async (req: Request, res: Response) => {
  const courseRepository = getRepository(Course);
  const course = await courseRepository.findOne(req.params.courseId);
  res.render('course_detail', { course });
};

export const enroll = async (req: Request, res: Response) => {
  const enrollmentRepository = getRepository(Enrollment);
  const enrollment = new Enrollment();
  enrollment.user = req.user!;
  enrollment.course = await getRepository(Course).findOne(req.params.courseId)!;

  await enrollmentRepository.save(enrollment);
  res.redirect('/dashboard');
};

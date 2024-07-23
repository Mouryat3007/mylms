import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Course } from '../entities/Course';
import { Enrollment } from '../entities/Enrollment';

export const getCourses = async (req: Request, res: Response) => {
  const courseRepository = getRepository(Course);

  try {
    const courses = await courseRepository.find();
    res.render('courses', { courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Internal server error');
  }
};

export const getCourseDetail = async (req: Request, res: Response) => {
  const courseRepository = getRepository(Course);

  try {
    const course = await courseRepository.findOne(req.params.courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.render('course_detail', { course });
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).send('Internal server error');
  }
};

export const enroll = async (req: Request, res: Response) => {
  const enrollmentRepository = getRepository(Enrollment);

  try {
    if (!req.user) {
      return res.status(401).send('User not authenticated');
    }

    const course = await getRepository(Course).findOne(req.params.courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }

    const enrollment = new Enrollment();
    enrollment.user = req.user;
    enrollment.course = course;

    await enrollmentRepository.save(enrollment);
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).send('Internal server error');
  }
};

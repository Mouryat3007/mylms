// src/controllers/CourseController.ts

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Course } from '../entities/Course';
import { Enrollment } from '../entities/Enrollment';
import { User } from '../entities/User';
import { ValidationError } from 'class-validator'; // Example for validation error

// Function to get all courses
export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseRepository = getRepository(Course);
    const courses = await courseRepository.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: 'Internal server error' });
  }
};

// Function to get course detail by ID
export const getCourseDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseId = req.params.courseId;
    const courseRepository = getRepository(Course);
    const course = await courseRepository.findOne(courseId);

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course detail:', error);
    res.status(500).json({ message: 'Error fetching course detail', error: 'Internal server error' });
  }
};

// Function to enroll a user in a course
export const enroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id; // Ensure req.user is properly set

    if (!courseId || !userId) {
      res.status(400).json({ message: 'Missing course ID or user ID' });
      return;
    }

    const courseRepository = getRepository(Course);
    const userRepository = getRepository(User);
    const enrollmentRepository = getRepository(Enrollment);

    const course = await courseRepository.findOne(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const user = await userRepository.findOne(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if the user is already enrolled
    const existingEnrollment = await enrollmentRepository.findOne({ where: { course, user } });
    if (existingEnrollment) {
      res.status(400).json({ message: 'User is already enrolled in this course' });
      return;
    }

    const enrollment = new Enrollment();
    enrollment.course = course;
    enrollment.user = user;

    await enrollmentRepository.save(enrollment);

    res.status(201).json({ message: 'User enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling user in course:', error);
    res.status(500).json({ message: 'Error enrolling user in course', error: 'Internal server error' });
  }
};

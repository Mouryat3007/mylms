import { Router } from 'express';
import { getCourses, getCourseDetail, enroll } from '../controllers/CourseController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Route to get the dashboard which lists all courses
router.get('/dashboard', authMiddleware, getCourses);

// Route to get all courses
router.get('/courses', authMiddleware, getCourses);

// Route to get details of a specific course
router.get('/courses/:courseId', authMiddleware, getCourseDetail);

// Route to enroll in a specific course
router.post('/courses/:courseId/enroll', authMiddleware, enroll);

export default router;

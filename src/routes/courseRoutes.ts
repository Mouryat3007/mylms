import { Router } from 'express';
import { getCourses, getCourseDetail, enroll } from '../controllers/CourseController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/dashboard', authMiddleware, getCourses);
router.get('/courses', authMiddleware, getCourses);
router.get('/course/:courseId', authMiddleware, getCourseDetail);
router.get('/enroll/:courseId', authMiddleware, enroll);

export default router;

import { Router } from 'express';

import { authRouter } from './modules/auth/auth.router';
import { classRouter } from './modules/class/class.router';
import { documentRouter } from './modules/document/document.router';
import { frequencysRouter } from './modules/frequencys/frequencys.router';
import { lessonRouter } from './modules/lesson/lesson.router';
import { majorRouter } from './modules/major/major.router';
import { studentRouter } from './modules/student/student.router';
import { subjectRouter } from './modules/subject/subject.router';
import { userRouter } from './modules/user/user.router';

export const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/student', studentRouter);
router.use('/major', majorRouter);
router.use('/document', documentRouter);
router.use('/subject', subjectRouter);
router.use('/class', classRouter);
router.use('/lesson', lessonRouter);
router.use('/frequencys', frequencysRouter);

import { Router } from 'express';

import { authRouter } from './modules/auth/auth.router';
import { documentRouter } from './modules/document/document.router';
import { classRouter } from './modules/class/class.router';
import { majorRouter } from './modules/major/major.router';
import { subjectRouter } from './modules/subject/subject.router';

export const router = Router();

// router.use('/user');
router.use('/auth', authRouter);
router.use('/major', majorRouter);
router.use('/document', documentRouter);
router.use('/subject', subjectRouter);
router.use('/class', classRouter);

import { Router } from 'express';

import { authRouter } from './modules/auth/auth.router';
import { documentRouter } from './modules/document/document.router';
import { majorRouter } from './modules/major/major.router';

export const router = Router();

// router.use('/user');
router.use('/auth', authRouter);
router.use('/major', majorRouter);
router.use('/document', documentRouter);

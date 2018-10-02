import * as express from 'express';

import apiRouter from './api';
import authRouter from './auth';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', apiRouter);

export default router;
import * as express from 'express';
import usersRouter from './users';
import blogsRouter from './blogs';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/blogs', blogsRouter);

export default router;
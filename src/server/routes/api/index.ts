import * as express from 'express';
import * as passport from 'passport';

import usersRouter from './users';
import blogsRouter from './blogs';

const router = express.Router();

router.use(passport.authenticate('bearer', { session: false }));

router.use('/users', usersRouter);
router.use('/blogs', blogsRouter);

export default router;
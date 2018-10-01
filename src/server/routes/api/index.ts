import * as express from 'express';
import usersRouter from './users';
import blogsRouter from './blogs';
import TableRouter from './tablerouter';
import * as tables from '../../db'

const router = express.Router();

router.use('/users', new TableRouter<tables.IUser>(tables.Users).Router);
router.use('/blogs', new TableRouter<tables.IBlog>(tables.Blogs).Router);

export default router;
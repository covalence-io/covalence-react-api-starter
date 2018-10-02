import { RequestHandler } from 'express';

import TableRouter from 'tablerouter';
import { IBlog, Blogs } from '../../db';

const isAdmin: RequestHandler = (req, res, next) => {

    if(!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    }

    return next();
}

export default new TableRouter<IBlog>(Blogs, {
    canDelete: isAdmin,
    canWrite: isAdmin
}).Router
import { RequestHandler } from 'express';

import TableRouter from 'tablerouter';
import { Users, IUser } from '../../db';

const isAdmin: RequestHandler = (req, res, next) => {

    if(!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    }

    return next();
}

export default new TableRouter<IUser>(Users, {
    canDelete: isAdmin,
    canRead: isAdmin,
    canWrite: isAdmin
}).Router
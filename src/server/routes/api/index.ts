import * as express from 'express';
import * as passport from 'passport';

import usersRouter from './users';
import blogsRouter from './blogs';
import queriesRouter from './queries';

const router = express.Router();

//Passport bearer authentication comes before any other api routes
//Calling from inside another request handler in order to continue even on auth failure
//We send back failures from within each router, but authenticate will populate the user on the request, etc.
router.use((req, res, next) => { 
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/users', usersRouter);
router.use('/blogs', blogsRouter);
router.use('/q', queriesRouter);

export default router;
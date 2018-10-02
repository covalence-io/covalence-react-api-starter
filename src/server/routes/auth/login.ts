import * as express from 'express';
import * as passport from 'passport';

import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req, res, next) => {

    try {
        res.json(await CreateToken({ userid: req.user.id }));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    
});

export default router;
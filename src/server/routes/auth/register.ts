import * as express from 'express';

import { Users } from '../../db';
import { HashPassword } from '../../utils/security/passwords';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {

    try {
        let user = req.body;
        user.password = HashPassword(req.body.password);
        let result = await Users.insert(user);
        let token = await CreateToken({ userid: result.id });
        res.json({
            token,
            role: 'guest',
            userid: result.id
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }

});

export default router;
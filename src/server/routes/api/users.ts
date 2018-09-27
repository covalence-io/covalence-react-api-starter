import * as express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {

    res.json([{
        id: 1,
        name: 'Matt Landers',
        email: 'haha@gtfo.com'
    }])

});

export default router;
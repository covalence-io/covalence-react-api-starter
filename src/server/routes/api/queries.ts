import * as express from 'express';
import { Queries } from '../../db';

const router = express.Router();

router.get('/blogsauthors', async (req, res, next) => {

    try {
        res.json(await Queries.GetBlogsAuthors());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
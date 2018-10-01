import * as express from 'express';
import { Blogs } from '../../db';

const router = express.Router();

router.get('/', async (req, res, next) => {
    
    try {
        res.json(await Blogs.all());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/:id', async (req, res, next) => {

    try {
        res.json(await Blogs.one(req.params.id));
    } catch(e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {

    try {
        res.json(await Blogs.insert(req.body));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res, next) => {

    try {
        res.json(await Blogs.update(req.params.id, req.body));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res, next) => {

    try {
        res.json(await Blogs.delete(req.params.id));
    } catch (e) {
        res.sendStatus(500);
    }
});

export default router;
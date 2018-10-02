import * as express from 'express';
import Table from '../../db/table';

export default class TableRouter<T> {

    public Router: express.Router = express.Router();

    constructor(table: Table<T>, authCheck?: express.RequestHandler) {

        if(!authCheck) {
            authCheck = (req, res, next) => next();
        }

        this.Router.get('/', authCheck, async (req, res, next) => {
            try {
                res.json(await table.all());
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }
        });

        this.Router.get('/:id', authCheck, async (req, res, next) => {
            try {
                res.json(await table.one(req.params.id));
            } catch(e) {
                res.sendStatus(500);
            }
        });

        this.Router.post('/', authCheck, async (req, res, next) => {
            try {
                res.json(await table.insert(req.body));
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }
        });

        this.Router.put('/:id', authCheck, async (req, res, next) => {
            try {
                res.json(await table.update(req.params.id, req.body));
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }
        });

        this.Router.delete('/:id', authCheck, async (req, res, next) => {
            try {
                res.json(await table.delete(req.params.id));
            } catch (e) {
                res.sendStatus(500);
            }
        });

        this.Router.post('/find', async (req, res, next) => {
            try {
                res.json(await table.find(req.body));
            } catch(e) {
                res.sendStatus(500);
            }
        });
    }
}
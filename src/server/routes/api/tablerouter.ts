import * as express from 'express';
import Table from '../../db/table';
import { runInNewContext } from 'vm';

const noAuthRequired: express.RequestHandler = (req, res, next) => next();

export default class TableRouter<T> {

    public Router: express.Router = express.Router();

    constructor(table: Table<T>, options?: ITableRouterOptions) {

        options = options || {};

        if(!options.canRead) {
            options.canRead = noAuthRequired;
        }
        
        if(!options.canWrite) {
            options.canWrite = noAuthRequired;
        }
        
        if(!options.canDelete) {
            options.canDelete = noAuthRequired;
        }

        this.Router.get('/', options.canRead, async (req, res, next) => {
            try {
                res.json(await table.all());
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }
        });

        this.Router.get('/:id', options.canRead, async (req, res, next) => {
            try {
                res.json(await table.one(req.params.id));
            } catch(e) {
                res.sendStatus(500);
            }
        });

        this.Router.post('/find', options.canRead, async (req, res, next) => {
            try {
                res.json(await table.find(req.body));
            } catch(e) {
                res.sendStatus(500);
            }
        });

        this.Router.post('/', options.canWrite, async (req, res, next) => {
            try {
                res.json(await table.insert(req.body));
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }
        });

        this.Router.put('/:id', options.canWrite, async (req, res, next) => {
            try {
                res.json(await table.update(req.params.id, req.body));
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }
        });

        this.Router.delete('/:id', options.canDelete, async (req, res, next) => {
            try {
                res.json(await table.delete(req.params.id));
            } catch (e) {
                res.sendStatus(500);
            }
        });
    }
}

export interface ITableRouterOptions {
    canRead?: express.RequestHandler;
    canWrite?: express.RequestHandler;
    canDelete?: express.RequestHandler;
}
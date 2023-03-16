import express, { Express, Request, Response } from 'express';
import { router } from './routes/index';

export const app: Express = express()
const PORT = process.env.PORT || 5000;

const start = async () => {
    if (process.env.NODE_ENV !== 'test') {
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}`);
        });
    }
};

if (process.env.NODE_ENV !== 'test') { start(); }

app.use('', router);
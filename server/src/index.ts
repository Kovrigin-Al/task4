require("dotenv").config();
import express, { Express } from 'express';
import { router } from './routes/index';
import { sequelize } from './db';
import { Users } from './models/usersModel';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { ROUTES } from './types/consts/routes';

const PORT = process.env.PORT || 5000;
export const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(ROUTES.PREFIX, router);
app.use('*', errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
        await Users.sync(process.env.NODE_ENV === 'development' ? { alter: true } : undefined);
        console.log("All models were synchronized successfully.");
        if (process.env.NODE_ENV !== 'test') {
            app.listen(PORT, () => {
                console.log(`Server has been started on ${PORT}`);
            });
        }
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
};

if (process.env.NODE_ENV !== 'test') {
    start();
}
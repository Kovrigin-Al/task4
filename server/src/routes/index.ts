import { Router } from "express";
import {router as userRoute} from './userRoute'

export const router = Router();

router.use('/user', userRoute );
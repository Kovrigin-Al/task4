import { Router } from "express";
import { PARAMS } from "../types/consts/routes";
import {router as userRoute} from './userRoute'
import {router as usersRoute} from './usersRoute'

export const router = Router();

router.use(PARAMS.USER, userRoute );
router.use(PARAMS.USERS, usersRoute);
import { Router } from "express";
import { UsersController } from "../controllers/Users/usersController";
import { checkToken } from '../middleware/checkToken'

export const router = Router();

router.get('/', checkToken, UsersController.getAllUsers);
router.put('/', checkToken, UsersController.updateUsers);
router.delete('/', checkToken, UsersController.deleteUsers);
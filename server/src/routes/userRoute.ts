import { Router } from 'express';
import { AuthController } from '../controllers/Auth/authController';
import { LoginController } from '../controllers/Auth/loginController';
import { RegistrationController } from '../controllers/Auth/registrationController';
import { checkToken } from '../middleware/checkToken'
import { PARAMS } from '../types/consts/routes';

export const router = Router();

router.post(PARAMS.REGISTRATION, AuthController.setRegistrationValidation(), RegistrationController.handleRregistratioin);
router.post(PARAMS.LOGIN, AuthController.setLoginValidation(), LoginController.handleLogin);
router.get(PARAMS.CHECK_AUTH, checkToken, AuthController.refreshToken);
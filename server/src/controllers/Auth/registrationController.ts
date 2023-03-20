import { Request, Response, NextFunction } from "express";
import { Users } from "../../models/usersModel";
import { HTTP_STATUS } from "../../types/consts/httpStatuses";
import { AuthController } from "./authController";
import bcrypt from "bcrypt";
import _ from 'lodash'
import { ErrorResponse } from "../errorController";


export class RegistrationController {
    static req: Request<{}, {}, {
        email: string,
        password: string,
        name: string
    }>;
    static res: Response;
    static next: NextFunction;

    static async handleRregistratioin(req: Request, res: Response, next: NextFunction) {
        RegistrationController.#initFields(req, res, next);
        if (AuthController.validateCredentials(req, next)) {
            await RegistrationController.#requestDatabase();
        }
    }

    static #initFields(req: Request, res: Response, next: NextFunction) {
        RegistrationController.req = req;
        RegistrationController.res = res;
        RegistrationController.next = next;
    }

    static async #requestDatabase() {
        try {
            await RegistrationController.#checkEmailForDublicates();
            await RegistrationController.#createUser();
        } catch (unextectedError) {
            RegistrationController.next(
                ErrorResponse.createInternalError('Internal Server Error when checking credentials: ' + unextectedError)
            )
        }
    }

    static async #checkEmailForDublicates() {
        const candidate = (await Users.findOne({ where: { email: RegistrationController.req.body.email } }))
            ?.get({ plain: true });
        if (candidate !== undefined) {
            RegistrationController.next(ErrorResponse.createBadRequestError("User with this email already exsists"));
        }
    }

    static async #createUser() {
        const { email, password, name } = RegistrationController.req.body;
        const hashPassword = await bcrypt.hash(password, 3);
        const {id, status} = (await Users.create({ password: hashPassword, email, name }))?.get({ plain: true });
        AuthController.sendJwtWithStatus(RegistrationController.res, { id, email, status }, HTTP_STATUS.CREATED_201);
    }
}
import { Request, Response, NextFunction } from "express";
import { Users } from "../../models/usersModel";
import { ICredentials } from "../../types/apiTypes";
import { HTTP_STATUS } from "../../types/consts/httpStatuses";
import { ErrorResponse } from "../errorController";
import bcrypt from "bcrypt";
import { IUser } from "../../types/databaseTypes";
import { AuthController } from "./authController";
import _ from 'lodash'

export class LoginController {

    static foundUser: IUser | undefined;
    static isPasswordCorrect: boolean;
    static req: Request<{}, {}, ICredentials>;
    static res: Response;
    static next: NextFunction;

    static async handleLogin(req: Request, res: Response, next: NextFunction) {
        if (AuthController.validateCredentials(req, next) === undefined) return;
        LoginController.#initFields(req, res, next);
        await LoginController.#verifyCredentials();
        LoginController.#handleCorrectCredentials();
    }

    static #initFields(req: Request, res: Response, next: NextFunction) {
        LoginController.req = req;
        LoginController.res = res;
        LoginController.next = next;
        LoginController.#setFoundUser(undefined);
        LoginController.#setIsPasswordCorrect(false);
    }

    static #handleCorrectCredentials() {
        if (LoginController.foundUser && LoginController.isPasswordCorrect) {
            const { id, email, status } = LoginController.foundUser;
            AuthController.sendJwtWithStatus(LoginController.res, { id, email, status }, HTTP_STATUS.OK_200);
        }
    }

    static async #verifyCredentials() {
        await LoginController.#requestDatabase();
        LoginController.#handleWrongCredentials();
    }

    static async #requestDatabase() {
        try {
            await LoginController.#verifyEmail();
            await LoginController.#verifyPassword();
        } catch (unextectedError) {
            LoginController.next(
                ErrorResponse.createInternalError('Internal Server Error when checking credentials: ' + unextectedError)
            )
        }
    }

    static #handleWrongCredentials() {
        if (!LoginController.foundUser || !LoginController.isPasswordCorrect) {
            LoginController.next(ErrorResponse.createNotFoundError("User is not found"));
        }
    }

    static async #verifyEmail() {
        const foundUser = (await Users.findOne({ where: { email: LoginController.req.body.email } }))
            ?.get(({ plain: true }));
        LoginController.#setFoundUser(foundUser);
    }

    static async #verifyPassword() {
        if (LoginController.foundUser === undefined) return
        LoginController.#setIsPasswordCorrect(
            await bcrypt.compare(LoginController.req.body.password, LoginController.foundUser.password)
            );
        LoginController.#setLoginDate();
    }

    static #setLoginDate() {
        Users.update({ last_login_time: new Date() }, {
            where: { id: LoginController.foundUser?.id }
        });
    }

    static #setFoundUser(user: IUser | undefined) {
        LoginController.foundUser = user;
    }

    static #setIsPasswordCorrect(isCorrect: boolean) {
        LoginController.isPasswordCorrect = isCorrect;
    }
}

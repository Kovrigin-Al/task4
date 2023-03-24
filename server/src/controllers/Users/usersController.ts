import { Request, Response, NextFunction } from "express";
import { Users } from "../../models/usersModel";
import { HTTP_STATUS } from "../../types/consts/httpStatuses";
import { IUser } from "../../types/databaseTypes";
import { ErrorResponse } from "../errorController";

export class UsersController {
    static req: Request;
    static res: Response;
    static next: NextFunction;

    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        UsersController.#initFields(req, res, next);
        await Users.findAll().then(responseObject => responseObject.map(u => u.get(({ plain: true }))))
            .then(plainResponse => res.status(HTTP_STATUS.OK_200).json(UsersController.#formatUsers(plainResponse)))
            .catch(unextectedError => UsersController.next(ErrorResponse.createInternalError(unextectedError)))
    };

    static async updateUsers(req: Request<{}, {}, { users: IUser[] }>, res: Response, next: NextFunction) {
        console.log(req)
        if (!req.body.users) return next(ErrorResponse.createBadRequestError('No users has been received'))
        UsersController.#initFields(req, res, next);
        const updatedUsers = await UsersController.#updateUsersRecords(req.body.users);
        res.status(HTTP_STATUS.OK_200).json(UsersController.#formatUsers(updatedUsers));
    }

    static async deleteUsers(req: Request<{}, {}, { users: IUser[] }>, res: Response, next: NextFunction) {
        UsersController.#initFields(req, res, next);
        await UsersController.#requestDbDelete(req.body.users)
            .then(() => res.status(HTTP_STATUS.NO_CONTENT_204).send())
            .catch(unextectedError => UsersController.next(ErrorResponse.createInternalError(unextectedError)));
    }

    static async #requestDbDelete(users: IUser[]) {
        const requestsPromises = users.map(async ({ id }) => Users.destroy({ where: { id } }));
        return Promise.all(requestsPromises)
    }

    static async #updateUsersRecords(users: IUser[]) {
        let updatedUsers: IUser[] = []
        await UsersController.#requestDbUpdate(users)
            .then(response => response.forEach(([_, updatedUser]) => updatedUsers.push(updatedUser[0].dataValues)))
            .catch(unextectedError => UsersController.next(ErrorResponse.createInternalError(unextectedError)));
        return updatedUsers
    }

    static #requestDbUpdate(users: IUser[]) {
        const requestsPromises = users.map(async u => Users.update({ ...u }, { where: { id: u.id }, returning: true }));
        return Promise.all(requestsPromises)
    }

    static #formatUsers(users: IUser[]) {
        return users.map(u => ({
            id: u.id,
            email: u.email,
            status: u.status,
            last_login_time: u.last_login_time,
            name: u.name,
            registration_time: u.registration_time
        }))
    }

    static #initFields(req: Request, res: Response, next: NextFunction) {
        UsersController.req = req;
        UsersController.res = res;
        UsersController.next = next;
    }
}

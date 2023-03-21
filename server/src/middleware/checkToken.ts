import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from '../controllers/errorController';
import jwt from "jsonwebtoken";
import { Users } from "../models/usersModel";

interface IPayload {
    id: number,
    email: string,
    status: string
}

const authError = ErrorResponse.createUnauthorizedError()

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") return next();
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET) as IPayload
        const userFound = await Users.findOne({ where: { id: decodedData.id } })
        if (!userFound) return next(ErrorResponse.createNotFoundError('This user has been deleted'));
        if (userFound.get({ plain: true }).status === 'blocked') return next(ErrorResponse.createForbiddenError('This user is blocked'));
        req.body.decodedUser = decodedData;
        next();
    } catch {
        next(authError);
    }
};

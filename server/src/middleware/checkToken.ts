import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from '../controllers/errorController';
import jwt from "jsonwebtoken";

const authError = ErrorResponse.createUnauthorizedError()

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") return next();
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.decodedUser = decoded;
        next();
    } catch {
        next(authError);
    }
};
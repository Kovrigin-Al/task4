import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../controllers/errorController";
import { HTTP_STATUS } from "../types/consts/httpStatuses";

export const errorHandler: ErrorRequestHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ErrorResponse) {
        return res.status(error.status).json({ message: error.message });
    }
    return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
        .json({ message: "Unexpected error" });
};
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "../../types/consts/httpStatuses";
import { ErrorResponse } from "../errorController";
import { IJwt } from "../../types/apiTypes";

export class AuthController {
  static setRegistrationValidation() {
    return [
      check("email").isEmail().normalizeEmail(),
      check("password").trim().escape().notEmpty(),
      check("name").trim().escape().notEmpty(),
    ];
  }

  static setLoginValidation() {
    return [
      check("email").isEmail().normalizeEmail(),
      check("password").trim().escape().notEmpty(),
    ];
  }

  static validateCredentials(req: Request, next: NextFunction) {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      const errorMessages = errors.map(e => e.msg + ' in ' + e.param).join('; ')
      next(ErrorResponse.createBadRequestError("Wrong credentials: " + errorMessages));
    };
    return true;
  }

  static sendJwtWithStatus = (res: Response, { id, email, status }: IJwt, statusCode: HTTP_STATUS) => {
    const token = jwt.sign({ id, email, status }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(statusCode).json({ token });
  };

  static async refreshToken(req: Request<{}, {}, { decodedUser: IJwt }>, res: Response) {
    const { id, email, status } = req.body.decodedUser
    AuthController.sendJwtWithStatus(res, { id, email, status }, HTTP_STATUS.OK_200)
  }
}

import { HTTP_STATUS } from "../types/consts/httpStatuses"

export class ErrorResponse extends Error {
  status: HTTP_STATUS;
  constructor(status: HTTP_STATUS, message: string) {
    super(message);
    this.message = message;
    this.status = status;
  }

  static createBadRequestError(message: string) {
    return new ErrorResponse(HTTP_STATUS.BAD_REQUEST_400, message)
  }  
  
  static createUnauthorizedError(message: string = 'Unauthorized') {
    return new ErrorResponse(HTTP_STATUS.UNAUTHORIZED_401, message)
  }

  static createForbiddenError(message: string) {
    return new ErrorResponse(HTTP_STATUS.FORBIDDEN_403, message)
  }
  
  static createNotFoundError(message: string) {
    return new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, message)
  }
  
  static createInternalError(message: string) {
    return new ErrorResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR_500, message)
  }
}


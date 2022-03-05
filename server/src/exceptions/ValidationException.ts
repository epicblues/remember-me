import { ValidationError } from "express-validator";
import { ExceptionMessage, HttpException } from "./HttpException";

export class ValidationException extends HttpException {
  validationErrors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super("입력 형식 오류", 400);
    this.validationErrors = errors;
  }

  createJsonMessage(): ExceptionMessage {
    return {
      statusCode: this.statusCode,
      message: this.validationErrors,
    };
  }
}

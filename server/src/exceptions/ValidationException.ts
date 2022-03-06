import { ValidationError } from "class-validator";
import { ExceptionMessage, HttpException } from "./HttpException";

export class ValidationException extends HttpException {
  constructor(private validationErrors: ValidationError[]) {
    super("입력 형식 오류", 400);
  }

  createJsonMessage(): ExceptionMessage {
    return {
      statusCode: this.statusCode,
      message: this.validationErrors,
    };
  }
}

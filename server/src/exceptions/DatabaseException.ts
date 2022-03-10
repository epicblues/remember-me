import { HttpException } from "./HttpException";

export class DatabaseException extends HttpException {
  private constructor(originalError: Error) {
    super("Database Error", 500, originalError);
  }
  static mapNormalErrorToException(candidate: any) {
    if (candidate instanceof Error) {
      return new DatabaseException(candidate);
    }
    return candidate;
  }
}

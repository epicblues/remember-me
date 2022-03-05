export interface ExceptionMessage {
  statusCode: number;
  message: string | object;
}

export abstract class HttpException extends Error {
  statusCode: number;
  constructor(public message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode ? statusCode : 500;
  }

  createJsonMessage(): ExceptionMessage {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

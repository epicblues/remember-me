export interface ExceptionMessage {
  statusCode: number;
  message: string | object;
}

export abstract class HttpException extends Error {
  statusCode: number;
  constructor(
    public message: string,
    statusCode?: number,
    originalError?: Error
  ) {
    super(message);
    if (originalError) {
      this.stack += `\n${originalError.stack}`;
    }
    this.statusCode = statusCode ? statusCode : 500;
  }

  createJsonMessage(): ExceptionMessage {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

import { ErrorRequestHandler, RequestHandler } from "express";
import { HttpException } from "../exceptions/HttpException";

export const noResponseHandler: RequestHandler = (_, res) => {
  res.status(404).send("404 Not Found");
};

export const errorHandler: ErrorRequestHandler = (error, _, res, __) => {
  console.error(error);
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json(error.createJsonMessage());
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

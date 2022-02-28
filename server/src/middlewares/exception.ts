import { ErrorRequestHandler, RequestHandler } from "express";

export const noResponseHandler: RequestHandler = (_, __) => {
  __.status(404).send("404 Not Found");
};

export const errorHandler: ErrorRequestHandler = (error, _, res, __) => {
  console.error(error);
  res.status(500).send(res.statusCode + " Internal Server Error");
};

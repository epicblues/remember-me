import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _, res, __) => {
  console.error(error);
  res.status(500).send(res.statusCode + " Internal Server Error");
};

import { RequestHandler } from "express";

type HandlerParams = Parameters<RequestHandler>;
type CustomSession = {
  name?: string;
  userId?: number;
};

export type CustomRequestHandler = (
  req: HandlerParams[0] & {
    session: HandlerParams[0]["session"] & CustomSession;
  },
  res: HandlerParams[1],
  next: HandlerParams[2]
) => void;

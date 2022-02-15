import { RequestHandler } from "express";

type HandlerParams = Parameters<RequestHandler>;
interface CustomSession {
  name?: string;
}

export type CustomRequestHandler = (
  req: HandlerParams[0] & {
    session: CustomSession;
  },
  res: HandlerParams[1],
  next: HandlerParams[2]
) => void;

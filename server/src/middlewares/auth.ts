import { CustomRequestHandler } from "../types";

export const authHandler: CustomRequestHandler = (req, res, next) => {
  const name = req.session.name;
  if (!name) {
    return res.status(401).send("Not Authorized");
  }
  return next();
};

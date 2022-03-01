import { CustomRequestHandler } from "../types";

export const authHandler: CustomRequestHandler = (req, res, next) => {
  const name = req.session.name;
  if (!name) {
    return res.status(401).send({ message: "Not Authorized" });
  }
  return next();
};

export const checkAlreadyLogined: CustomRequestHandler = (req, res, next) => {
  if (req.session.name) {
    return res.send({ message: "이미 로그인한 상태입니다" });
  }
  return next();
};

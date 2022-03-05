import { UnauthorizedException } from "../exceptions/UnauthorizedExcpetion";
import { CustomRequestHandler } from "../types";

export const authHandler: CustomRequestHandler = (req, _, next) => {
  const name = req.session.name;
  if (!name) {
    return next(new UnauthorizedException("로그인을 해야 합니다."));
  }
  return next();
};

export const checkAlreadyLogined: CustomRequestHandler = (req, res, next) => {
  if (req.session.name) {
    return res.send({ message: "이미 로그인 하셨습니다" });
  }
  return next();
};

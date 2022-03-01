import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

const validationErrorHandler: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  return next();
};

export const usernamePasswordValidate: RequestHandler[] = [
  body("name")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("이름은 4글자 이상 20글자 이하입니다.")
    .isAlphanumeric()
    .withMessage("이름은 알파벳과 숫자만 가능합니다."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("비밀번호는 최소 6자 이상이어야 합니다."),
  validationErrorHandler,
];

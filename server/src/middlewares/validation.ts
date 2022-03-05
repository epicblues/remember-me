import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { Memo } from "../entities/Memo";
import { ValidationException } from "../exceptions/ValidationException";

const validationErrorHandler: RequestHandler = (req, _, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationException(errors.array()));
  }

  return next();
};

export const validateUsernamePassword: RequestHandler[] = [
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

export const validateMemo: RequestHandler[] = [
  body("title")
    .trim()
    .isLength({ min: 2, max: Memo.TITLE_MAX_LENGTH })
    .withMessage(`제목은 2글자 이상 ${Memo.TITLE_MAX_LENGTH}글자 이하 입니다.`),
  body("content")
    .trim()
    .isLength({ min: 2, max: Memo.CONTENT_MAX_LENGTH })
    .withMessage(
      `내용은 2글자 이상 ${Memo.CONTENT_MAX_LENGTH}글자 이하 입니다.`
    ),
  validationErrorHandler,
];

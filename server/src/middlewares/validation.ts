import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "express";
import { MemoDto } from "../dtos/memo/MemoDto";
import { LoginDto } from "../dtos/user/LoginDto";
import { ValidationException } from "../exceptions/ValidationException";

const createValidationHandler: (
  dto: new (...args: any) => any
) => RequestHandler = (dto) => async (req, _, next) => {
  const body = req.body;
  const instance = plainToInstance(dto, body, {
    excludeExtraneousValues: true,
  });
  const errors = await validate(instance);
  if (errors.length > 0) {
    return next(new ValidationException(errors));
  }
  req.body = instance;
  return next();
};

export const validateUsernamePassword = createValidationHandler(LoginDto);
export const validateMemo = createValidationHandler(MemoDto);

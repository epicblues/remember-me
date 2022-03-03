import express from "express";
import { UserController } from "../controllers/user";

import { authHandler, checkAlreadyLogined } from "../middlewares/auth";
import { userExceptionHandler } from "../middlewares/exception";
import { usernamePasswordValidate } from "../middlewares/validation";

const userController = UserController.getInstance();
const userRouter = express.Router();

userRouter.post(
  "/",
  checkAlreadyLogined,
  usernamePasswordValidate,
  userController.register
);
userRouter.post(
  "/login",
  checkAlreadyLogined,
  usernamePasswordValidate,
  userController.login
);
userRouter.get("/logout", authHandler, userController.logout);
userRouter.use(userExceptionHandler);

export default userRouter;

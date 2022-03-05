import express from "express";
import { UserController } from "../controllers/user";

import { authHandler, checkAlreadyLogined } from "../middlewares/auth";
import { validateUsernamePassword } from "../middlewares/validation";

const userController = UserController.getInstance();
const userRouter = express.Router();

userRouter.post(
  "/",
  checkAlreadyLogined,
  validateUsernamePassword,
  userController.register
);
userRouter.post(
  "/login",
  checkAlreadyLogined,
  validateUsernamePassword,
  userController.login
);
userRouter.get("/logout", authHandler, userController.logout);

export default userRouter;

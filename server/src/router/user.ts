import express from "express";
import { login, logout, register } from "../controllers/user";
import { authHandler, checkAlreadyLogined } from "../middlewares/auth";
import { userExceptionHandler } from "../middlewares/exception";
import { usernamePasswordValidate } from "../middlewares/validation";

const userRouter = express.Router();

userRouter.post("/", checkAlreadyLogined, usernamePasswordValidate, register);
userRouter.post("/login", checkAlreadyLogined, usernamePasswordValidate, login);
userRouter.get("/logout", authHandler, logout);
userRouter.use(userExceptionHandler);

export default userRouter;

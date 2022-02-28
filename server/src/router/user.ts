import express from "express";
import { login, logout, register } from "../controllers/user";
import { usernamePasswordValidate } from "../middlewares/validation";

const userRouter = express.Router();

userRouter.post("/", usernamePasswordValidate, register);
userRouter.post("/login", usernamePasswordValidate, login);
userRouter.get("/logout", logout);

export default userRouter;

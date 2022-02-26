import express from "express";
import { login, register, logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;

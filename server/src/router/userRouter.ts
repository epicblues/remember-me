import express from "express";
import { registerUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/", registerUser);

export default userRouter;

import express from "express";
import { registerUser } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/", registerUser);

export default userRouter;

import express from "express";
import { createMemo } from "../controllers/memoController";

const memoRouter = express.Router();

memoRouter.post("/", createMemo);

export default memoRouter;

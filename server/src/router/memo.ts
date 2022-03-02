import express from "express";
import { createMemo, showMemos } from "../controllers/memo";
import { memoValidate } from "../middlewares/validation";

const memoRouter = express.Router();

memoRouter.post("/", memoValidate, createMemo);
memoRouter.get("/", showMemos);

export default memoRouter;

import express from "express";
import { createMemo, showMemos } from "../controllers/memoController";

const memoRouter = express.Router();

memoRouter.post("/", createMemo);
memoRouter.get("/", showMemos);

export default memoRouter;

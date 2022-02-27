import express from "express";
import { createMemo, showMemos } from "../controllers/memo";

const memoRouter = express.Router();

memoRouter.post("/", createMemo);
memoRouter.get("/", showMemos);

export default memoRouter;

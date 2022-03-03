import express from "express";
import { MemoController } from "../controllers/memo";

import { validateMemo } from "../middlewares/validation";

const memoRouter = express.Router();

const memoController = MemoController.getInstance();

memoRouter.post("/", validateMemo, memoController.createMemo);
memoRouter.get("/", memoController.showMemos);
// memoRouter.put("/:id", updateMemo);
// memoRouter.delete("/:id", deleteMemo);

export default memoRouter;

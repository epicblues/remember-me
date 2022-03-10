import express from "express";
import { MemoController } from "../controllers/memo";
import { authHandler } from "../middlewares/auth";

import { validateMemo } from "../middlewares/validation";

const memoRouter = express.Router();

const memoController = MemoController.getInstance();

// 기본적으로 메모는 다른 사람들이 볼 수 없다.

memoRouter.post("/", validateMemo, memoController.createMemo);
memoRouter.get("/", authHandler, memoController.showMyMemos);
memoRouter.get("/random", authHandler, memoController.getRandomMemo);
memoRouter.get("/:id", authHandler, memoController.showMemo);

memoRouter.put("/:id", validateMemo, memoController.updateMemo);
memoRouter.delete("/:id", memoController.deleteMemo);

export default memoRouter;

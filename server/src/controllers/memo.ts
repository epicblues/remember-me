import { MemoService } from "../services/MemoService";
import { CustomRequestHandler } from "../types";

export const createMemo: CustomRequestHandler = async (req, res, next) => {
  const authorId = req.session.userId!;
  const { title, content } = req.body;
  try {
    const memo = await MemoService.createMemo(authorId, title, content);
    res.json({ memo });
  } catch (e) {
    next(e);
  }
};

export const showMemos: CustomRequestHandler = (req, res) => {
  const name = req.session.name;

  res.json({ message: `${name}님의 메모` });
};

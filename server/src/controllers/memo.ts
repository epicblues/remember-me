import { CustomRequestHandler } from "../types";

export const createMemo: CustomRequestHandler = (_, __) => {};

export const showMemos: CustomRequestHandler = (req, res) => {
  const name = req.session.name;

  res.json({ message: `${name}님의 메모` });
};

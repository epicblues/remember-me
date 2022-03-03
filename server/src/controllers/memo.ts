import { MemoService } from "../services/MemoService";
import { CustomRequestHandler } from "../types";

export class MemoController {
  private memoService: MemoService;
  private static memoController: MemoController;

  static getInstance() {
    return this.memoController ? this.memoController : new this();
  }

  private constructor() {
    this.memoService = MemoService.getInstance();
  }
  createMemo: CustomRequestHandler = async (req, res, next) => {
    const authorId = req.session.userId!;
    const { title, content } = req.body;
    try {
      const memo = await this.memoService.createMemo(authorId, title, content);
      res.json({ memo });
    } catch (e) {
      next(e);
    }
  };

  showMemos: CustomRequestHandler = (req, res) => {
    const name = req.session.name;

    res.json({ message: `${name}님의 메모` });
  };
}
